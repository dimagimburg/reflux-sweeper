import Utilities from './../Utils';
import Actions from './../Actions/Actions';
import GameStore from './GameStore';

var getTileByDirection = function(direction,board,id){

    var isEdgeEast = function(id){
        return id % GameStore.cols == GameStore.cols - 1;
    };

    var isEdgeWest = function(id) {
        return id % GameStore.cols == 0;
    };

    var tileByDirections = {

        n(board,id) {
            return (id - GameStore.cols < 0) ? null : board.get(id - GameStore.cols);
        },

        s(board,id) {
            return (id + GameStore.cols > GameStore.cols * GameStore.rows - 1) ? null : board.get(id + GameStore.cols);
        },

        e(board,id) {
            return isEdgeEast(id) ? null : board.get(id + 1);
        },

        w(board,id) {
            return isEdgeWest(id) ? null : board.get(id - 1);
        },

        ne(board,id) {
            return (isEdgeEast(id) || id - GameStore.cols + 1 < 0) ? null : board.get(id - GameStore.cols + 1);
        },

        se(board,id) {
            return (isEdgeEast(id) || id + GameStore.cols + 1 > GameStore.cols * GameStore.rows - 1) ? null : board.get(id + GameStore.cols + 1);
        },

        sw(board,id) {
            return (isEdgeWest(id) || id + GameStore.cols - 1 > GameStore.cols * GameStore.rows - 1) ? null : board.get(id + GameStore.cols - 1);
        },

        nw(board,id) {
            return (isEdgeWest(id) || id - GameStore.cols - 1 < 0) ? null : board.get(id - GameStore.cols - 1);
        }
    };

    return tileByDirections[direction](board,id);

};

let Store = Reflux.createStore({

    listenables: [Actions],

    init() {
        this.board = Utilities.getDefaultBoard(GameStore.rows,GameStore.cols,GameStore.mines);
    },

    getBoard() {
        return this.board;
    },

    getTile(id) {
       return Immutable.fromJS(_.find(this.board.toJS(), function(tile){ return tile.id === id; }));
    },

    onRevealTile(id) {
        Actions.gameOn();
        var oldTile = this.board.get(id);
        var tileProps = this.getTileProps(id);
        var newTile = oldTile.set('isRevealed',true);
        if(!newTile.get('isMine')) newTile = newTile.set('minesAround',tileProps.minesAround);
        this.board = this.board.setIn([id],newTile);
        if(newTile.get('isMine')){
            this.endGame();
        } else {
            this.tryToWin(id);
            if(this.isWinner()){
                this.win();
            }
            this.updateBoard(this.board);
        }
    },

    isWinner(){
        var winner = true;
        this.board.map(function(tile){
            if(!tile.get('isRevealed') && !tile.get('isMine')){
                winner = false;
            }
        });
        return winner;
    },

    win(){
        Actions.winGame();
    },

    tryToWin(id) {
        Utilities.getDirections().map(function(dir){
            var currentTile = getTileByDirection(dir,this.board,id);
            var tileProps = currentTile ? this.getTileProps(currentTile.get('id')) : null;
            if (currentTile && !currentTile.get('isMine') && !currentTile.get('isRevealed') && !currentTile.get('isFlag')){
                if(tileProps.isSafe){
                    this.board = this.board.setIn([currentTile.get('id')],currentTile.set('isRevealed',true));
                    this.tryToWin(currentTile.get('id'));
                } else {
                    this.board = this.board.setIn([currentTile.get('id')],currentTile.set('isRevealed',true).set('minesAround',tileProps.minesAround));
                }
            }
        }.bind(this));
    },

    getTileProps(id) {
        var safe = true;
        var minesAround = 0;
        Utilities.getDirections().map(function(dir){
            if(getTileByDirection(dir,this.board,id)){
                if(getTileByDirection(dir,this.board,id).get('isMine')){
                    minesAround++;
                    safe = false;
                }
            }
        }.bind(this));

        return {
            'isSafe':safe,
            'minesAround':minesAround
        };
    },

    endGame() {
        Actions.gameOver();
        var newBoard = this.board.map(function(tile){
            return tile.get('isMine') ? tile.set('isRevealed',true).set('isFlag',false) : tile;
        });
        this.updateBoard(newBoard);
    },

    onNewGame() {
        this.updateBoard(Utilities.getDefaultBoard(GameStore.rows,GameStore.cols,GameStore.mines));
    },

    onToggleFlag(id) {
        var newTile = this.board.get(id).set('isFlag',!this.board.get(id).get('isFlag'));
        newTile.get('isFlag') ? Actions.reduceFlagsCount() : Actions.increaseFlagsCount();
        var newBoard = this.board.setIn([id],newTile);
        this.updateBoard(newBoard);
    },

    updateBoard(board) {
        this.board = board;
        this.trigger(board); // sends the updated board to all listening components (GameBoard)
    }

});

export default Store;