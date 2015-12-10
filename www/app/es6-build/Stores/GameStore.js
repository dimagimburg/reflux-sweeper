'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ActionsActions = require('./../Actions/Actions');

var _ActionsActions2 = _interopRequireDefault(_ActionsActions);

var Store = Reflux.createStore({

    listenables: _ActionsActions2['default'],

    init: function init() {
        this.username = 'dimagimburg';
        this.rows = 20;
        this.cols = 20;
        this.gameOver = false;
        this.level = 1;
        this.mines = parseInt(this.rows * this.cols * (1 / (6 - this.level)));
        this.flags = this.mines;
        this.gameOn = false;
        this.win = false;
    },

    updateMines: function updateMines() {
        this.mines = parseInt(this.rows * this.cols * (1 / (6 - this.level)));
    },

    getGame: function getGame() {
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

    getFlagsCount: function getFlagsCount() {
        return this.flags;
    },

    isGameOver: function isGameOver() {
        return this.gameOver;
    },

    onGameOver: function onGameOver() {
        this.gameOver = true;
        this.updateGame();
    },

    onNewGame: function onNewGame() {
        this.updateMines();
        this.gameOver = false;
        this.gameOn = false;
        this.flags = this.mines;
        this.updateGame();
    },

    onReduceFlagsCount: function onReduceFlagsCount() {
        this.flags--;
        this.updateGame();
    },

    onIncreaseFlagsCount: function onIncreaseFlagsCount() {
        this.flags++;
        this.updateGame();
    },

    onGameOn: function onGameOn() {
        if (!this.gameOn) {
            this.gameOn = true;
            this.updateGame();
        }
    },

    onIncreaseLevel: function onIncreaseLevel() {
        if (this.level < 4) {
            this.level++;
            this.updateMines();
            _ActionsActions2['default'].newGame();
        }
    },

    onDecreaseLevel: function onDecreaseLevel() {
        if (this.level > 0) {
            this.level--;
            this.updateMines();
            _ActionsActions2['default'].newGame();
        }
    },

    onColsChanged: function onColsChanged(cols) {
        this.cols = Number(cols);
        _ActionsActions2['default'].newGame();
    },

    onRowsChanged: function onRowsChanged(rows) {
        this.rows = Number(rows);
        _ActionsActions2['default'].newGame();
    },

    onWinGame: function onWinGame() {
        this.win = true;
        _ActionsActions2['default'].gameOver();
    },

    updateGame: function updateGame() {
        this.trigger(this.getGame());
    }

});

exports['default'] = Store;
module.exports = exports['default'];
//# sourceMappingURL=GameStore.js.map
