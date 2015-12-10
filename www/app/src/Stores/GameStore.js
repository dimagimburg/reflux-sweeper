import Actions from './../Actions/Actions';

let Store = Reflux.createStore({

    listenables: Actions,

    init() {
        this.username = 'dimagimburg';
        this.rows = 20;
        this.cols = 20;
        this.gameOver = false;
        this.level = 1;
        this.mines = parseInt(this.rows * this.cols * (1/(6 - this.level)));
        this.flags = this.mines;
        this.gameOn = false;
        this.win = false;
    },

    updateMines(){
        this.mines = parseInt(this.rows * this.cols * (1/(6 - this.level)));
    },

    getGame() {
        return {
            gameOver: this.gameOver,
            gameOn: this.gameOn,
            flags: this.flags,
            mines: this.mines,
            level: this.level,
            cols: this.cols,
            rows: this.rows,
            win: this.win
        };
    },

    getFlagsCount() {
        return this.flags;
    },

    isGameOver() {
        return this.gameOver;
    },

    onGameOver() {
        this.gameOver = true;
        this.updateGame();
    },

    onNewGame() {
        this.updateMines();
        this.gameOver = false;
        this.gameOn = false;
        this.flags = this.mines;
        this.updateGame();
    },

    onReduceFlagsCount() {
        this.flags--;
        this.updateGame();
    },

    onIncreaseFlagsCount() {
        this.flags++;
        this.updateGame();
    },

    onGameOn() {
        if(!this.gameOn){
            this.gameOn = true;
            this.updateGame();
        }
    },

    onIncreaseLevel(){
        if(this.level < 4){
            this.level++;
            this.updateMines();
            Actions.newGame();
        }
    },

    onDecreaseLevel(){
        if(this.level > 0){
            this.level--;
            this.updateMines();
            Actions.newGame();
        }
    },

    onColsChanged(cols){
        this.cols = Number(cols);
        Actions.newGame();
    },

    onRowsChanged(rows){
        this.rows = Number(rows);
        Actions.newGame();
    },

    onWinGame(){
        this.win = true;
        Actions.gameOver();
    },

    updateGame() {
        this.trigger(
            this.getGame()
        );
    }

});

export default Store;
