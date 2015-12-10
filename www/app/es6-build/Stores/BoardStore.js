'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Utils = require('./../Utils');

var _Utils2 = _interopRequireDefault(_Utils);

var _ActionsActions = require('./../Actions/Actions');

var _ActionsActions2 = _interopRequireDefault(_ActionsActions);

var _GameStore = require('./GameStore');

var _GameStore2 = _interopRequireDefault(_GameStore);

var getTileByDirection = function getTileByDirection(direction, board, id) {

    var isEdgeEast = function isEdgeEast(id) {
        return id % _GameStore2['default'].cols == _GameStore2['default'].cols - 1;
    };

    var isEdgeWest = function isEdgeWest(id) {
        return id % _GameStore2['default'].cols == 0;
    };

    var tileByDirections = {

        n: function n(board, id) {
            return id - _GameStore2['default'].cols < 0 ? null : board.get(id - _GameStore2['default'].cols);
        },

        s: function s(board, id) {
            return id + _GameStore2['default'].cols > _GameStore2['default'].cols * _GameStore2['default'].rows - 1 ? null : board.get(id + _GameStore2['default'].cols);
        },

        e: function e(board, id) {
            return isEdgeEast(id) ? null : board.get(id + 1);
        },

        w: function w(board, id) {
            return isEdgeWest(id) ? null : board.get(id - 1);
        },

        ne: function ne(board, id) {
            return isEdgeEast(id) || id - _GameStore2['default'].cols + 1 < 0 ? null : board.get(id - _GameStore2['default'].cols + 1);
        },

        se: function se(board, id) {
            return isEdgeEast(id) || id + _GameStore2['default'].cols + 1 > _GameStore2['default'].cols * _GameStore2['default'].rows - 1 ? null : board.get(id + _GameStore2['default'].cols + 1);
        },

        sw: function sw(board, id) {
            return isEdgeWest(id) || id + _GameStore2['default'].cols - 1 > _GameStore2['default'].cols * _GameStore2['default'].rows - 1 ? null : board.get(id + _GameStore2['default'].cols - 1);
        },

        nw: function nw(board, id) {
            return isEdgeWest(id) || id - _GameStore2['default'].cols - 1 < 0 ? null : board.get(id - _GameStore2['default'].cols - 1);
        }
    };

    return tileByDirections[direction](board, id);
};

var Store = Reflux.createStore({

    listenables: [_ActionsActions2['default']],

    init: function init() {
        this.board = _Utils2['default'].getDefaultBoard(_GameStore2['default'].rows, _GameStore2['default'].cols, _GameStore2['default'].mines);
    },

    getBoard: function getBoard() {
        return this.board;
    },

    getTile: function getTile(id) {
        return Immutable.fromJS(_.find(this.board.toJS(), function (tile) {
            return tile.id === id;
        }));
    },

    onRevealTile: function onRevealTile(id) {
        _ActionsActions2['default'].gameOn();
        var oldTile = this.board.get(id);
        var tileProps = this.getTileProps(id);
        var newTile = oldTile.set('isRevealed', true);
        if (!newTile.get('isMine')) newTile = newTile.set('minesAround', tileProps.minesAround);
        this.board = this.board.setIn([id], newTile);
        if (newTile.get('isMine')) {
            this.endGame();
        } else {
            this.tryToWin(id);
            if (this.isWinner()) {
                this.win();
            }
            this.updateBoard(this.board);
        }
    },

    isWinner: function isWinner() {
        var winner = true;
        this.board.map(function (tile) {
            if (!tile.get('isRevealed') && !tile.get('isMine')) {
                winner = false;
            }
        });
        return winner;
    },

    win: function win() {
        _ActionsActions2['default'].winGame();
    },

    tryToWin: function tryToWin(id) {
        _Utils2['default'].getDirections().map((function (dir) {
            var currentTile = getTileByDirection(dir, this.board, id);
            var tileProps = currentTile ? this.getTileProps(currentTile.get('id')) : null;
            if (currentTile && !currentTile.get('isMine') && !currentTile.get('isRevealed') && !currentTile.get('isFlag')) {
                if (tileProps.isSafe) {
                    this.board = this.board.setIn([currentTile.get('id')], currentTile.set('isRevealed', true));
                    this.tryToWin(currentTile.get('id'));
                } else {
                    this.board = this.board.setIn([currentTile.get('id')], currentTile.set('isRevealed', true).set('minesAround', tileProps.minesAround));
                }
            }
        }).bind(this));
    },

    getTileProps: function getTileProps(id) {
        var safe = true;
        var minesAround = 0;
        _Utils2['default'].getDirections().map((function (dir) {
            if (getTileByDirection(dir, this.board, id)) {
                if (getTileByDirection(dir, this.board, id).get('isMine')) {
                    minesAround++;
                    safe = false;
                }
            }
        }).bind(this));

        return {
            'isSafe': safe,
            'minesAround': minesAround
        };
    },

    endGame: function endGame() {
        _ActionsActions2['default'].gameOver();
        var newBoard = this.board.map(function (tile) {
            return tile.get('isMine') ? tile.set('isRevealed', true).set('isFlag', false) : tile;
        });
        this.updateBoard(newBoard);
    },

    onNewGame: function onNewGame() {
        this.updateBoard(_Utils2['default'].getDefaultBoard(_GameStore2['default'].rows, _GameStore2['default'].cols, _GameStore2['default'].mines));
    },

    onToggleFlag: function onToggleFlag(id) {
        var newTile = this.board.get(id).set('isFlag', !this.board.get(id).get('isFlag'));
        newTile.get('isFlag') ? _ActionsActions2['default'].reduceFlagsCount() : _ActionsActions2['default'].increaseFlagsCount();
        var newBoard = this.board.setIn([id], newTile);
        this.updateBoard(newBoard);
    },

    updateBoard: function updateBoard(board) {
        this.board = board;
        this.trigger(board); // sends the updated board to all listening components (GameBoard)
    }

});

exports['default'] = Store;
module.exports = exports['default'];
//# sourceMappingURL=BoardStore.js.map
