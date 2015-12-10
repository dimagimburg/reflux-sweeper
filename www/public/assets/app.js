(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var Actions = Reflux.createActions(['revealTile', 'gameOver', 'newGame', 'toggleFlag', 'reduceFlagsCount', 'increaseFlagsCount', 'gameOn', 'increaseLevel', 'decreaseLevel', 'colsChanged', 'rowsChanged', 'winGame']);

exports['default'] = Actions;
module.exports = exports['default'];


},{}],2:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ViewsRefluxSweeper = require('./Views/RefluxSweeper');

var _ViewsRefluxSweeper2 = _interopRequireDefault(_ViewsRefluxSweeper);

ReactDOM.render(React.createElement(_ViewsRefluxSweeper2['default'], null), document.getElementById('content'));


},{"./Views/RefluxSweeper":9}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _StoresBoardStore = require('../Stores/BoardStore');

var _StoresBoardStore2 = _interopRequireDefault(_StoresBoardStore);

var _ActionsActions = require('../Actions/Actions');

var _ActionsActions2 = _interopRequireDefault(_ActionsActions);

var _StoresGameStore = require('../Stores/GameStore');

var _StoresGameStore2 = _interopRequireDefault(_StoresGameStore);

var BoardPiece = React.createClass({
    displayName: 'BoardPiece',

    // state should be controlled by the store because when reveal tile
    // it overrides the current state by the props, we can choose to manage
    // the state by the props that we get from the store or we could manage
    // it locally, or both of them which is more expensive. i tend to use
    // the store option because events and listeners make sense to me.

    propTypes: {
        id: React.PropTypes.number.isRequired,
        isMine: React.PropTypes.bool.isRequired,
        isRevealed: React.PropTypes.bool.isRequired,
        minesAround: React.PropTypes.number.isRequired,
        isFlag: React.PropTypes.bool.isRequired
    },

    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
        return this.props.isRevealed !== nextProps.isRevealed || nextProps.isFlag !== this.props.isFlag;
    },

    revealTile: function revealTile() {
        if (!this.props.isFlag && !this.props.isRevealed && !_StoresGameStore2['default'].isGameOver()) {
            _ActionsActions2['default'].revealTile(this.props.id);
        }
    },

    toggleFlag: function toggleFlag(e) {
        e.preventDefault();
        if (!this.props.isRevealed && (_StoresGameStore2['default'].getFlagsCount() || this.props.isFlag) && !_StoresGameStore2['default'].isGameOver()) {
            _ActionsActions2['default'].toggleFlag(this.props.id);
        }
    },

    render: function render() {
        var classes = classNames({
            'board-piece': true,
            'revealed-mine': this.props.isRevealed && this.props.isMine,
            'revealed-tile': this.props.isRevealed && !this.props.isMine,
            'safe': this.props.isRevealed && !this.props.isMine && !this.props.minesAround,
            'flag': this.props.isFlag
        });

        return React.createElement(
            'div',
            { className: classes, onClick: this.revealTile, onContextMenu: this.toggleFlag },
            this.props.minesAround ? this.props.minesAround : ''
        );
    }
});

exports['default'] = BoardPiece;
module.exports = exports['default'];


},{"../Actions/Actions":1,"../Stores/BoardStore":6,"../Stores/GameStore":7}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ActionsActions = require('../Actions/Actions');

var _ActionsActions2 = _interopRequireDefault(_ActionsActions);

var _StoresBoardStore = require('../Stores/BoardStore');

var _StoresBoardStore2 = _interopRequireDefault(_StoresBoardStore);

var _StoresGameStore = require('../Stores/GameStore');

var _StoresGameStore2 = _interopRequireDefault(_StoresGameStore);

var _BoardPiece = require('./BoardPiece');

var _BoardPiece2 = _interopRequireDefault(_BoardPiece);

var _Utils = require('../Utils');

var _Utils2 = _interopRequireDefault(_Utils);

var GameBoard = React.createClass({
    displayName: 'GameBoard',

    getInitialState: function getInitialState() {
        return {
            board: _StoresBoardStore2['default'].getBoard()
        };
    },

    componentDidMount: function componentDidMount() {
        this.unsubscribe = _StoresBoardStore2['default'].listen(this.onBoardChange);
    },

    componentWillUnmount: function componentWillUnmount() {
        this.unsubscribe();
    },

    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
        return nextState.board !== this.state.board;
    },

    onBoardChange: function onBoardChange(board) {
        this.setState({
            board: board
        });
    },

    render: function render() {
        return React.createElement(
            'div',
            null,
            _Utils2['default'].createBoardTwoDimensional(this.state.board, _StoresGameStore2['default'].cols).toJS().map(function (a) {
                return React.createElement(
                    'div',
                    null,
                    a.map(function (piece) {
                        return React.createElement(_BoardPiece2['default'], { id: piece.id, isMine: piece.isMine, isRevealed: piece.isRevealed, minesAround: piece.minesAround, isFlag: piece.isFlag });
                    })
                );
            })
        );
    }
});

exports['default'] = GameBoard;
module.exports = exports['default'];


},{"../Actions/Actions":1,"../Stores/BoardStore":6,"../Stores/GameStore":7,"../Utils":8,"./BoardPiece":3}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ActionsActions = require('../Actions/Actions');

var _ActionsActions2 = _interopRequireDefault(_ActionsActions);

var _StoresGameStore = require('../Stores/GameStore');

var _StoresGameStore2 = _interopRequireDefault(_StoresGameStore);

var ScoreBoard = React.createClass({
    displayName: 'ScoreBoard',

    getInitialState: function getInitialState() {
        return _StoresGameStore2['default'].getGame();
    },

    componentDidMount: function componentDidMount() {
        this.unsubscribe = _StoresGameStore2['default'].listen(this.onChange);
    },

    componentWillUnmount: function componentWillUnmount() {
        this.unsubscibe();
    },

    onChange: function onChange(game) {
        this.setState(game);
    },

    newGame: function newGame() {
        _ActionsActions2['default'].newGame();
    },

    increaseLevel: function increaseLevel() {
        _ActionsActions2['default'].increaseLevel();
    },

    decreaseLevel: function decreaseLevel() {
        _ActionsActions2['default'].decreaseLevel();
    },

    colsChanged: function colsChanged(e) {
        _ActionsActions2['default'].colsChanged(e.target.value);
    },

    rowsChanged: function rowsChanged(e) {
        _ActionsActions2['default'].rowsChanged(e.target.value);
    },

    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                null,
                'Hi ',
                _StoresGameStore2['default'].username,
                ', ',
                this.state.gameOver && this.state.win ? 'You are TIGGER!!' : this.state.gameOver && !this.state.win ? 'LOSER!!' : 'GOOD LUCK!'
            ),
            React.createElement(
                'div',
                null,
                'Number of columns: ',
                React.createElement('input', { id: 'cols', type: 'number', value: this.state.cols, onChange: this.colsChanged }),
                ' ',
                React.createElement('br', null),
                'Number of rows: ',
                React.createElement('input', { id: 'rows', type: 'number', value: this.state.rows, onChange: this.rowsChanged }),
                ' ',
                React.createElement('br', null),
                'Number tiles: ',
                this.state.cols * this.state.rows,
                ' ',
                React.createElement('br', null),
                'Game Level: ',
                React.createElement('img', { className: 'level-img', src: '/images/level-' + this.state.level + '.png' }),
                ' ',
                !this.state.gameOn ? React.createElement(
                    'span',
                    null,
                    React.createElement(
                        'button',
                        { onClick: this.increaseLevel },
                        '+'
                    ),
                    React.createElement(
                        'button',
                        { onClick: this.decreaseLevel },
                        '-'
                    )
                ) : '',
                ',',
                React.createElement('br', null),
                'Number of mines: ',
                this.state.mines,
                ',',
                React.createElement('br', null),
                'Number of Flags remained: ',
                this.state.flags
            ),
            React.createElement(
                'div',
                null,
                React.createElement(
                    'button',
                    { onClick: this.newGame },
                    'New Game'
                )
            )
        );
    }
});

exports['default'] = ScoreBoard;
module.exports = exports['default'];


},{"../Actions/Actions":1,"../Stores/GameStore":7}],6:[function(require,module,exports){
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


},{"./../Actions/Actions":1,"./../Utils":8,"./GameStore":7}],7:[function(require,module,exports){
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


},{"./../Actions/Actions":1}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var Utilities = (function () {
    return {

        createBoardTwoDimensional: function createBoardTwoDimensional(tiles, numberOfRows) {
            var length = tiles.size || tiles.length;
            var result = [];
            for (var i = 0; i < length; i += numberOfRows) {
                result.push(tiles.slice(i, i + numberOfRows));
            }
            return Immutable.fromJS(result);
        },

        getDefaultBoard: function getDefaultBoard(rows, cols, mines) {
            return this.initBoard(rows, cols, mines);
        },

        initBoard: function initBoard(rows, cols, numberOfMines) {
            var mines = this.createMines(numberOfMines);
            var tiles = this.createTiles(rows, cols, numberOfMines);
            var shuffled = _.shuffle(mines.concat(tiles).toJS());
            return Immutable.fromJS(shuffled).map(function (tile, idx) {
                return tile.set('id', idx);
            });
        },

        createMines: function createMines(numberOfMines) {
            var mines = [];
            while (numberOfMines--) {
                mines.push(Immutable.Map({ isMine: true, isRevealed: false, minesAround: 0, isFlag: false }));
            }
            return Immutable.List(mines);
        },

        createTiles: function createTiles(rows, cols, numberOfMines) {
            var numberOfTiles = rows * cols - numberOfMines;
            var tiles = [];
            while (numberOfTiles--) {
                tiles.push(Immutable.Map({ isMine: false, isRevealed: false, minesAround: 0, isFlag: false }));
            }
            return Immutable.List(tiles);
        },

        getDirections: function getDirections() {
            return ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'];
        }

    };
})();

exports['default'] = Utilities;
module.exports = exports['default'];


},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ComponentsScoreBoard = require('./../Components/ScoreBoard');

var _ComponentsScoreBoard2 = _interopRequireDefault(_ComponentsScoreBoard);

var _ComponentsGameBoard = require('./../Components/GameBoard');

var _ComponentsGameBoard2 = _interopRequireDefault(_ComponentsGameBoard);

var RefluxSweeper = React.createClass({
    displayName: 'RefluxSweeper',

    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                null,
                'MinesSweeper Ver 0.0.1'
            ),
            React.createElement(_ComponentsScoreBoard2['default'], null),
            React.createElement(_ComponentsGameBoard2['default'], null)
        );
    }
});

exports['default'] = RefluxSweeper;
module.exports = exports['default'];


},{"./../Components/GameBoard":4,"./../Components/ScoreBoard":5}]},{},[2])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ3d3cvYXBwL2VzNi1idWlsZC9BY3Rpb25zL0FjdGlvbnMuanMiLCJ3d3cvYXBwL2VzNi1idWlsZC9BcHAuanMiLCJ3d3cvYXBwL2VzNi1idWlsZC9Db21wb25lbnRzL0JvYXJkUGllY2UuanMiLCJ3d3cvYXBwL2VzNi1idWlsZC9Db21wb25lbnRzL0dhbWVCb2FyZC5qcyIsInd3dy9hcHAvZXM2LWJ1aWxkL0NvbXBvbmVudHMvU2NvcmVCb2FyZC5qcyIsInd3dy9hcHAvZXM2LWJ1aWxkL1N0b3Jlcy9Cb2FyZFN0b3JlLmpzIiwid3d3L2FwcC9lczYtYnVpbGQvU3RvcmVzL0dhbWVTdG9yZS5qcyIsInd3dy9hcHAvZXM2LWJ1aWxkL1V0aWxzLmpzIiwid3d3L2FwcC9lczYtYnVpbGQvVmlld3MvUmVmbHV4U3dlZXBlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbnZhciBBY3Rpb25zID0gUmVmbHV4LmNyZWF0ZUFjdGlvbnMoWydyZXZlYWxUaWxlJywgJ2dhbWVPdmVyJywgJ25ld0dhbWUnLCAndG9nZ2xlRmxhZycsICdyZWR1Y2VGbGFnc0NvdW50JywgJ2luY3JlYXNlRmxhZ3NDb3VudCcsICdnYW1lT24nLCAnaW5jcmVhc2VMZXZlbCcsICdkZWNyZWFzZUxldmVsJywgJ2NvbHNDaGFuZ2VkJywgJ3Jvd3NDaGFuZ2VkJywgJ3dpbkdhbWUnXSk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IEFjdGlvbnM7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFjdGlvbnMuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIF9WaWV3c1JlZmx1eFN3ZWVwZXIgPSByZXF1aXJlKCcuL1ZpZXdzL1JlZmx1eFN3ZWVwZXInKTtcblxudmFyIF9WaWV3c1JlZmx1eFN3ZWVwZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVmlld3NSZWZsdXhTd2VlcGVyKTtcblxuUmVhY3RET00ucmVuZGVyKFJlYWN0LmNyZWF0ZUVsZW1lbnQoX1ZpZXdzUmVmbHV4U3dlZXBlcjJbJ2RlZmF1bHQnXSwgbnVsbCksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50JykpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QXBwLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfU3RvcmVzQm9hcmRTdG9yZSA9IHJlcXVpcmUoJy4uL1N0b3Jlcy9Cb2FyZFN0b3JlJyk7XG5cbnZhciBfU3RvcmVzQm9hcmRTdG9yZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9TdG9yZXNCb2FyZFN0b3JlKTtcblxudmFyIF9BY3Rpb25zQWN0aW9ucyA9IHJlcXVpcmUoJy4uL0FjdGlvbnMvQWN0aW9ucycpO1xuXG52YXIgX0FjdGlvbnNBY3Rpb25zMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0FjdGlvbnNBY3Rpb25zKTtcblxudmFyIF9TdG9yZXNHYW1lU3RvcmUgPSByZXF1aXJlKCcuLi9TdG9yZXMvR2FtZVN0b3JlJyk7XG5cbnZhciBfU3RvcmVzR2FtZVN0b3JlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1N0b3Jlc0dhbWVTdG9yZSk7XG5cbnZhciBCb2FyZFBpZWNlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGRpc3BsYXlOYW1lOiAnQm9hcmRQaWVjZScsXG5cbiAgICAvLyBzdGF0ZSBzaG91bGQgYmUgY29udHJvbGxlZCBieSB0aGUgc3RvcmUgYmVjYXVzZSB3aGVuIHJldmVhbCB0aWxlXG4gICAgLy8gaXQgb3ZlcnJpZGVzIHRoZSBjdXJyZW50IHN0YXRlIGJ5IHRoZSBwcm9wcywgd2UgY2FuIGNob29zZSB0byBtYW5hZ2VcbiAgICAvLyB0aGUgc3RhdGUgYnkgdGhlIHByb3BzIHRoYXQgd2UgZ2V0IGZyb20gdGhlIHN0b3JlIG9yIHdlIGNvdWxkIG1hbmFnZVxuICAgIC8vIGl0IGxvY2FsbHksIG9yIGJvdGggb2YgdGhlbSB3aGljaCBpcyBtb3JlIGV4cGVuc2l2ZS4gaSB0ZW5kIHRvIHVzZVxuICAgIC8vIHRoZSBzdG9yZSBvcHRpb24gYmVjYXVzZSBldmVudHMgYW5kIGxpc3RlbmVycyBtYWtlIHNlbnNlIHRvIG1lLlxuXG4gICAgcHJvcFR5cGVzOiB7XG4gICAgICAgIGlkOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgIGlzTWluZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgaXNSZXZlYWxlZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wuaXNSZXF1aXJlZCxcbiAgICAgICAgbWluZXNBcm91bmQ6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgaXNGbGFnOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkXG4gICAgfSxcblxuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZTogZnVuY3Rpb24gc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmlzUmV2ZWFsZWQgIT09IG5leHRQcm9wcy5pc1JldmVhbGVkIHx8IG5leHRQcm9wcy5pc0ZsYWcgIT09IHRoaXMucHJvcHMuaXNGbGFnO1xuICAgIH0sXG5cbiAgICByZXZlYWxUaWxlOiBmdW5jdGlvbiByZXZlYWxUaWxlKCkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuaXNGbGFnICYmICF0aGlzLnByb3BzLmlzUmV2ZWFsZWQgJiYgIV9TdG9yZXNHYW1lU3RvcmUyWydkZWZhdWx0J10uaXNHYW1lT3ZlcigpKSB7XG4gICAgICAgICAgICBfQWN0aW9uc0FjdGlvbnMyWydkZWZhdWx0J10ucmV2ZWFsVGlsZSh0aGlzLnByb3BzLmlkKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB0b2dnbGVGbGFnOiBmdW5jdGlvbiB0b2dnbGVGbGFnKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuaXNSZXZlYWxlZCAmJiAoX1N0b3Jlc0dhbWVTdG9yZTJbJ2RlZmF1bHQnXS5nZXRGbGFnc0NvdW50KCkgfHwgdGhpcy5wcm9wcy5pc0ZsYWcpICYmICFfU3RvcmVzR2FtZVN0b3JlMlsnZGVmYXVsdCddLmlzR2FtZU92ZXIoKSkge1xuICAgICAgICAgICAgX0FjdGlvbnNBY3Rpb25zMlsnZGVmYXVsdCddLnRvZ2dsZUZsYWcodGhpcy5wcm9wcy5pZCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgIHZhciBjbGFzc2VzID0gY2xhc3NOYW1lcyh7XG4gICAgICAgICAgICAnYm9hcmQtcGllY2UnOiB0cnVlLFxuICAgICAgICAgICAgJ3JldmVhbGVkLW1pbmUnOiB0aGlzLnByb3BzLmlzUmV2ZWFsZWQgJiYgdGhpcy5wcm9wcy5pc01pbmUsXG4gICAgICAgICAgICAncmV2ZWFsZWQtdGlsZSc6IHRoaXMucHJvcHMuaXNSZXZlYWxlZCAmJiAhdGhpcy5wcm9wcy5pc01pbmUsXG4gICAgICAgICAgICAnc2FmZSc6IHRoaXMucHJvcHMuaXNSZXZlYWxlZCAmJiAhdGhpcy5wcm9wcy5pc01pbmUgJiYgIXRoaXMucHJvcHMubWluZXNBcm91bmQsXG4gICAgICAgICAgICAnZmxhZyc6IHRoaXMucHJvcHMuaXNGbGFnXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICB7IGNsYXNzTmFtZTogY2xhc3Nlcywgb25DbGljazogdGhpcy5yZXZlYWxUaWxlLCBvbkNvbnRleHRNZW51OiB0aGlzLnRvZ2dsZUZsYWcgfSxcbiAgICAgICAgICAgIHRoaXMucHJvcHMubWluZXNBcm91bmQgPyB0aGlzLnByb3BzLm1pbmVzQXJvdW5kIDogJydcbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gQm9hcmRQaWVjZTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Qm9hcmRQaWVjZS5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX0FjdGlvbnNBY3Rpb25zID0gcmVxdWlyZSgnLi4vQWN0aW9ucy9BY3Rpb25zJyk7XG5cbnZhciBfQWN0aW9uc0FjdGlvbnMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQWN0aW9uc0FjdGlvbnMpO1xuXG52YXIgX1N0b3Jlc0JvYXJkU3RvcmUgPSByZXF1aXJlKCcuLi9TdG9yZXMvQm9hcmRTdG9yZScpO1xuXG52YXIgX1N0b3Jlc0JvYXJkU3RvcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU3RvcmVzQm9hcmRTdG9yZSk7XG5cbnZhciBfU3RvcmVzR2FtZVN0b3JlID0gcmVxdWlyZSgnLi4vU3RvcmVzL0dhbWVTdG9yZScpO1xuXG52YXIgX1N0b3Jlc0dhbWVTdG9yZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9TdG9yZXNHYW1lU3RvcmUpO1xuXG52YXIgX0JvYXJkUGllY2UgPSByZXF1aXJlKCcuL0JvYXJkUGllY2UnKTtcblxudmFyIF9Cb2FyZFBpZWNlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0JvYXJkUGllY2UpO1xuXG52YXIgX1V0aWxzID0gcmVxdWlyZSgnLi4vVXRpbHMnKTtcblxudmFyIF9VdGlsczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9VdGlscyk7XG5cbnZhciBHYW1lQm9hcmQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZGlzcGxheU5hbWU6ICdHYW1lQm9hcmQnLFxuXG4gICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBib2FyZDogX1N0b3Jlc0JvYXJkU3RvcmUyWydkZWZhdWx0J10uZ2V0Qm9hcmQoKVxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmUgPSBfU3RvcmVzQm9hcmRTdG9yZTJbJ2RlZmF1bHQnXS5saXN0ZW4odGhpcy5vbkJvYXJkQ2hhbmdlKTtcbiAgICB9LFxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB0aGlzLnVuc3Vic2NyaWJlKCk7XG4gICAgfSxcblxuICAgIHNob3VsZENvbXBvbmVudFVwZGF0ZTogZnVuY3Rpb24gc2hvdWxkQ29tcG9uZW50VXBkYXRlKG5leHRQcm9wcywgbmV4dFN0YXRlKSB7XG4gICAgICAgIHJldHVybiBuZXh0U3RhdGUuYm9hcmQgIT09IHRoaXMuc3RhdGUuYm9hcmQ7XG4gICAgfSxcblxuICAgIG9uQm9hcmRDaGFuZ2U6IGZ1bmN0aW9uIG9uQm9hcmRDaGFuZ2UoYm9hcmQpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBib2FyZDogYm9hcmRcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgIF9VdGlsczJbJ2RlZmF1bHQnXS5jcmVhdGVCb2FyZFR3b0RpbWVuc2lvbmFsKHRoaXMuc3RhdGUuYm9hcmQsIF9TdG9yZXNHYW1lU3RvcmUyWydkZWZhdWx0J10uY29scykudG9KUygpLm1hcChmdW5jdGlvbiAoYSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgYS5tYXAoZnVuY3Rpb24gKHBpZWNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChfQm9hcmRQaWVjZTJbJ2RlZmF1bHQnXSwgeyBpZDogcGllY2UuaWQsIGlzTWluZTogcGllY2UuaXNNaW5lLCBpc1JldmVhbGVkOiBwaWVjZS5pc1JldmVhbGVkLCBtaW5lc0Fyb3VuZDogcGllY2UubWluZXNBcm91bmQsIGlzRmxhZzogcGllY2UuaXNGbGFnIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cbn0pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBHYW1lQm9hcmQ7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUdhbWVCb2FyZC5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX0FjdGlvbnNBY3Rpb25zID0gcmVxdWlyZSgnLi4vQWN0aW9ucy9BY3Rpb25zJyk7XG5cbnZhciBfQWN0aW9uc0FjdGlvbnMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQWN0aW9uc0FjdGlvbnMpO1xuXG52YXIgX1N0b3Jlc0dhbWVTdG9yZSA9IHJlcXVpcmUoJy4uL1N0b3Jlcy9HYW1lU3RvcmUnKTtcblxudmFyIF9TdG9yZXNHYW1lU3RvcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU3RvcmVzR2FtZVN0b3JlKTtcblxudmFyIFNjb3JlQm9hcmQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZGlzcGxheU5hbWU6ICdTY29yZUJvYXJkJyxcblxuICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgICAgICByZXR1cm4gX1N0b3Jlc0dhbWVTdG9yZTJbJ2RlZmF1bHQnXS5nZXRHYW1lKCk7XG4gICAgfSxcblxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZSA9IF9TdG9yZXNHYW1lU3RvcmUyWydkZWZhdWx0J10ubGlzdGVuKHRoaXMub25DaGFuZ2UpO1xuICAgIH0sXG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHRoaXMudW5zdWJzY2liZSgpO1xuICAgIH0sXG5cbiAgICBvbkNoYW5nZTogZnVuY3Rpb24gb25DaGFuZ2UoZ2FtZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKGdhbWUpO1xuICAgIH0sXG5cbiAgICBuZXdHYW1lOiBmdW5jdGlvbiBuZXdHYW1lKCkge1xuICAgICAgICBfQWN0aW9uc0FjdGlvbnMyWydkZWZhdWx0J10ubmV3R2FtZSgpO1xuICAgIH0sXG5cbiAgICBpbmNyZWFzZUxldmVsOiBmdW5jdGlvbiBpbmNyZWFzZUxldmVsKCkge1xuICAgICAgICBfQWN0aW9uc0FjdGlvbnMyWydkZWZhdWx0J10uaW5jcmVhc2VMZXZlbCgpO1xuICAgIH0sXG5cbiAgICBkZWNyZWFzZUxldmVsOiBmdW5jdGlvbiBkZWNyZWFzZUxldmVsKCkge1xuICAgICAgICBfQWN0aW9uc0FjdGlvbnMyWydkZWZhdWx0J10uZGVjcmVhc2VMZXZlbCgpO1xuICAgIH0sXG5cbiAgICBjb2xzQ2hhbmdlZDogZnVuY3Rpb24gY29sc0NoYW5nZWQoZSkge1xuICAgICAgICBfQWN0aW9uc0FjdGlvbnMyWydkZWZhdWx0J10uY29sc0NoYW5nZWQoZS50YXJnZXQudmFsdWUpO1xuICAgIH0sXG5cbiAgICByb3dzQ2hhbmdlZDogZnVuY3Rpb24gcm93c0NoYW5nZWQoZSkge1xuICAgICAgICBfQWN0aW9uc0FjdGlvbnMyWydkZWZhdWx0J10ucm93c0NoYW5nZWQoZS50YXJnZXQudmFsdWUpO1xuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgJ0hpICcsXG4gICAgICAgICAgICAgICAgX1N0b3Jlc0dhbWVTdG9yZTJbJ2RlZmF1bHQnXS51c2VybmFtZSxcbiAgICAgICAgICAgICAgICAnLCAnLFxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuZ2FtZU92ZXIgJiYgdGhpcy5zdGF0ZS53aW4gPyAnWW91IGFyZSBUSUdHRVIhIScgOiB0aGlzLnN0YXRlLmdhbWVPdmVyICYmICF0aGlzLnN0YXRlLndpbiA/ICdMT1NFUiEhJyA6ICdHT09EIExVQ0shJ1xuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAnTnVtYmVyIG9mIGNvbHVtbnM6ICcsXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7IGlkOiAnY29scycsIHR5cGU6ICdudW1iZXInLCB2YWx1ZTogdGhpcy5zdGF0ZS5jb2xzLCBvbkNoYW5nZTogdGhpcy5jb2xzQ2hhbmdlZCB9KSxcbiAgICAgICAgICAgICAgICAnICcsXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnYnInLCBudWxsKSxcbiAgICAgICAgICAgICAgICAnTnVtYmVyIG9mIHJvd3M6ICcsXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnaW5wdXQnLCB7IGlkOiAncm93cycsIHR5cGU6ICdudW1iZXInLCB2YWx1ZTogdGhpcy5zdGF0ZS5yb3dzLCBvbkNoYW5nZTogdGhpcy5yb3dzQ2hhbmdlZCB9KSxcbiAgICAgICAgICAgICAgICAnICcsXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnYnInLCBudWxsKSxcbiAgICAgICAgICAgICAgICAnTnVtYmVyIHRpbGVzOiAnLFxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuY29scyAqIHRoaXMuc3RhdGUucm93cyxcbiAgICAgICAgICAgICAgICAnICcsXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnYnInLCBudWxsKSxcbiAgICAgICAgICAgICAgICAnR2FtZSBMZXZlbDogJyxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdpbWcnLCB7IGNsYXNzTmFtZTogJ2xldmVsLWltZycsIHNyYzogJy9pbWFnZXMvbGV2ZWwtJyArIHRoaXMuc3RhdGUubGV2ZWwgKyAnLnBuZycgfSksXG4gICAgICAgICAgICAgICAgJyAnLFxuICAgICAgICAgICAgICAgICF0aGlzLnN0YXRlLmdhbWVPbiA/IFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICdzcGFuJyxcbiAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICdidXR0b24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBvbkNsaWNrOiB0aGlzLmluY3JlYXNlTGV2ZWwgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICcrJ1xuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2J1dHRvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IG9uQ2xpY2s6IHRoaXMuZGVjcmVhc2VMZXZlbCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgJy0nXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApIDogJycsXG4gICAgICAgICAgICAgICAgJywnLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2JyJywgbnVsbCksXG4gICAgICAgICAgICAgICAgJ051bWJlciBvZiBtaW5lczogJyxcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLm1pbmVzLFxuICAgICAgICAgICAgICAgICcsJyxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdicicsIG51bGwpLFxuICAgICAgICAgICAgICAgICdOdW1iZXIgb2YgRmxhZ3MgcmVtYWluZWQ6ICcsXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5mbGFnc1xuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAnYnV0dG9uJyxcbiAgICAgICAgICAgICAgICAgICAgeyBvbkNsaWNrOiB0aGlzLm5ld0dhbWUgfSxcbiAgICAgICAgICAgICAgICAgICAgJ05ldyBHYW1lJ1xuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gU2NvcmVCb2FyZDtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9U2NvcmVCb2FyZC5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX1V0aWxzID0gcmVxdWlyZSgnLi8uLi9VdGlscycpO1xuXG52YXIgX1V0aWxzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1V0aWxzKTtcblxudmFyIF9BY3Rpb25zQWN0aW9ucyA9IHJlcXVpcmUoJy4vLi4vQWN0aW9ucy9BY3Rpb25zJyk7XG5cbnZhciBfQWN0aW9uc0FjdGlvbnMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQWN0aW9uc0FjdGlvbnMpO1xuXG52YXIgX0dhbWVTdG9yZSA9IHJlcXVpcmUoJy4vR2FtZVN0b3JlJyk7XG5cbnZhciBfR2FtZVN0b3JlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0dhbWVTdG9yZSk7XG5cbnZhciBnZXRUaWxlQnlEaXJlY3Rpb24gPSBmdW5jdGlvbiBnZXRUaWxlQnlEaXJlY3Rpb24oZGlyZWN0aW9uLCBib2FyZCwgaWQpIHtcblxuICAgIHZhciBpc0VkZ2VFYXN0ID0gZnVuY3Rpb24gaXNFZGdlRWFzdChpZCkge1xuICAgICAgICByZXR1cm4gaWQgJSBfR2FtZVN0b3JlMlsnZGVmYXVsdCddLmNvbHMgPT0gX0dhbWVTdG9yZTJbJ2RlZmF1bHQnXS5jb2xzIC0gMTtcbiAgICB9O1xuXG4gICAgdmFyIGlzRWRnZVdlc3QgPSBmdW5jdGlvbiBpc0VkZ2VXZXN0KGlkKSB7XG4gICAgICAgIHJldHVybiBpZCAlIF9HYW1lU3RvcmUyWydkZWZhdWx0J10uY29scyA9PSAwO1xuICAgIH07XG5cbiAgICB2YXIgdGlsZUJ5RGlyZWN0aW9ucyA9IHtcblxuICAgICAgICBuOiBmdW5jdGlvbiBuKGJvYXJkLCBpZCkge1xuICAgICAgICAgICAgcmV0dXJuIGlkIC0gX0dhbWVTdG9yZTJbJ2RlZmF1bHQnXS5jb2xzIDwgMCA/IG51bGwgOiBib2FyZC5nZXQoaWQgLSBfR2FtZVN0b3JlMlsnZGVmYXVsdCddLmNvbHMpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHM6IGZ1bmN0aW9uIHMoYm9hcmQsIGlkKSB7XG4gICAgICAgICAgICByZXR1cm4gaWQgKyBfR2FtZVN0b3JlMlsnZGVmYXVsdCddLmNvbHMgPiBfR2FtZVN0b3JlMlsnZGVmYXVsdCddLmNvbHMgKiBfR2FtZVN0b3JlMlsnZGVmYXVsdCddLnJvd3MgLSAxID8gbnVsbCA6IGJvYXJkLmdldChpZCArIF9HYW1lU3RvcmUyWydkZWZhdWx0J10uY29scyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZTogZnVuY3Rpb24gZShib2FyZCwgaWQpIHtcbiAgICAgICAgICAgIHJldHVybiBpc0VkZ2VFYXN0KGlkKSA/IG51bGwgOiBib2FyZC5nZXQoaWQgKyAxKTtcbiAgICAgICAgfSxcblxuICAgICAgICB3OiBmdW5jdGlvbiB3KGJvYXJkLCBpZCkge1xuICAgICAgICAgICAgcmV0dXJuIGlzRWRnZVdlc3QoaWQpID8gbnVsbCA6IGJvYXJkLmdldChpZCAtIDEpO1xuICAgICAgICB9LFxuXG4gICAgICAgIG5lOiBmdW5jdGlvbiBuZShib2FyZCwgaWQpIHtcbiAgICAgICAgICAgIHJldHVybiBpc0VkZ2VFYXN0KGlkKSB8fCBpZCAtIF9HYW1lU3RvcmUyWydkZWZhdWx0J10uY29scyArIDEgPCAwID8gbnVsbCA6IGJvYXJkLmdldChpZCAtIF9HYW1lU3RvcmUyWydkZWZhdWx0J10uY29scyArIDEpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHNlOiBmdW5jdGlvbiBzZShib2FyZCwgaWQpIHtcbiAgICAgICAgICAgIHJldHVybiBpc0VkZ2VFYXN0KGlkKSB8fCBpZCArIF9HYW1lU3RvcmUyWydkZWZhdWx0J10uY29scyArIDEgPiBfR2FtZVN0b3JlMlsnZGVmYXVsdCddLmNvbHMgKiBfR2FtZVN0b3JlMlsnZGVmYXVsdCddLnJvd3MgLSAxID8gbnVsbCA6IGJvYXJkLmdldChpZCArIF9HYW1lU3RvcmUyWydkZWZhdWx0J10uY29scyArIDEpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHN3OiBmdW5jdGlvbiBzdyhib2FyZCwgaWQpIHtcbiAgICAgICAgICAgIHJldHVybiBpc0VkZ2VXZXN0KGlkKSB8fCBpZCArIF9HYW1lU3RvcmUyWydkZWZhdWx0J10uY29scyAtIDEgPiBfR2FtZVN0b3JlMlsnZGVmYXVsdCddLmNvbHMgKiBfR2FtZVN0b3JlMlsnZGVmYXVsdCddLnJvd3MgLSAxID8gbnVsbCA6IGJvYXJkLmdldChpZCArIF9HYW1lU3RvcmUyWydkZWZhdWx0J10uY29scyAtIDEpO1xuICAgICAgICB9LFxuXG4gICAgICAgIG53OiBmdW5jdGlvbiBudyhib2FyZCwgaWQpIHtcbiAgICAgICAgICAgIHJldHVybiBpc0VkZ2VXZXN0KGlkKSB8fCBpZCAtIF9HYW1lU3RvcmUyWydkZWZhdWx0J10uY29scyAtIDEgPCAwID8gbnVsbCA6IGJvYXJkLmdldChpZCAtIF9HYW1lU3RvcmUyWydkZWZhdWx0J10uY29scyAtIDEpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiB0aWxlQnlEaXJlY3Rpb25zW2RpcmVjdGlvbl0oYm9hcmQsIGlkKTtcbn07XG5cbnZhciBTdG9yZSA9IFJlZmx1eC5jcmVhdGVTdG9yZSh7XG5cbiAgICBsaXN0ZW5hYmxlczogW19BY3Rpb25zQWN0aW9uczJbJ2RlZmF1bHQnXV0sXG5cbiAgICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICB0aGlzLmJvYXJkID0gX1V0aWxzMlsnZGVmYXVsdCddLmdldERlZmF1bHRCb2FyZChfR2FtZVN0b3JlMlsnZGVmYXVsdCddLnJvd3MsIF9HYW1lU3RvcmUyWydkZWZhdWx0J10uY29scywgX0dhbWVTdG9yZTJbJ2RlZmF1bHQnXS5taW5lcyk7XG4gICAgfSxcblxuICAgIGdldEJvYXJkOiBmdW5jdGlvbiBnZXRCb2FyZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYm9hcmQ7XG4gICAgfSxcblxuICAgIGdldFRpbGU6IGZ1bmN0aW9uIGdldFRpbGUoaWQpIHtcbiAgICAgICAgcmV0dXJuIEltbXV0YWJsZS5mcm9tSlMoXy5maW5kKHRoaXMuYm9hcmQudG9KUygpLCBmdW5jdGlvbiAodGlsZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRpbGUuaWQgPT09IGlkO1xuICAgICAgICB9KSk7XG4gICAgfSxcblxuICAgIG9uUmV2ZWFsVGlsZTogZnVuY3Rpb24gb25SZXZlYWxUaWxlKGlkKSB7XG4gICAgICAgIF9BY3Rpb25zQWN0aW9uczJbJ2RlZmF1bHQnXS5nYW1lT24oKTtcbiAgICAgICAgdmFyIG9sZFRpbGUgPSB0aGlzLmJvYXJkLmdldChpZCk7XG4gICAgICAgIHZhciB0aWxlUHJvcHMgPSB0aGlzLmdldFRpbGVQcm9wcyhpZCk7XG4gICAgICAgIHZhciBuZXdUaWxlID0gb2xkVGlsZS5zZXQoJ2lzUmV2ZWFsZWQnLCB0cnVlKTtcbiAgICAgICAgaWYgKCFuZXdUaWxlLmdldCgnaXNNaW5lJykpIG5ld1RpbGUgPSBuZXdUaWxlLnNldCgnbWluZXNBcm91bmQnLCB0aWxlUHJvcHMubWluZXNBcm91bmQpO1xuICAgICAgICB0aGlzLmJvYXJkID0gdGhpcy5ib2FyZC5zZXRJbihbaWRdLCBuZXdUaWxlKTtcbiAgICAgICAgaWYgKG5ld1RpbGUuZ2V0KCdpc01pbmUnKSkge1xuICAgICAgICAgICAgdGhpcy5lbmRHYW1lKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRyeVRvV2luKGlkKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzV2lubmVyKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndpbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy51cGRhdGVCb2FyZCh0aGlzLmJvYXJkKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBpc1dpbm5lcjogZnVuY3Rpb24gaXNXaW5uZXIoKSB7XG4gICAgICAgIHZhciB3aW5uZXIgPSB0cnVlO1xuICAgICAgICB0aGlzLmJvYXJkLm1hcChmdW5jdGlvbiAodGlsZSkge1xuICAgICAgICAgICAgaWYgKCF0aWxlLmdldCgnaXNSZXZlYWxlZCcpICYmICF0aWxlLmdldCgnaXNNaW5lJykpIHtcbiAgICAgICAgICAgICAgICB3aW5uZXIgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB3aW5uZXI7XG4gICAgfSxcblxuICAgIHdpbjogZnVuY3Rpb24gd2luKCkge1xuICAgICAgICBfQWN0aW9uc0FjdGlvbnMyWydkZWZhdWx0J10ud2luR2FtZSgpO1xuICAgIH0sXG5cbiAgICB0cnlUb1dpbjogZnVuY3Rpb24gdHJ5VG9XaW4oaWQpIHtcbiAgICAgICAgX1V0aWxzMlsnZGVmYXVsdCddLmdldERpcmVjdGlvbnMoKS5tYXAoKGZ1bmN0aW9uIChkaXIpIHtcbiAgICAgICAgICAgIHZhciBjdXJyZW50VGlsZSA9IGdldFRpbGVCeURpcmVjdGlvbihkaXIsIHRoaXMuYm9hcmQsIGlkKTtcbiAgICAgICAgICAgIHZhciB0aWxlUHJvcHMgPSBjdXJyZW50VGlsZSA/IHRoaXMuZ2V0VGlsZVByb3BzKGN1cnJlbnRUaWxlLmdldCgnaWQnKSkgOiBudWxsO1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRUaWxlICYmICFjdXJyZW50VGlsZS5nZXQoJ2lzTWluZScpICYmICFjdXJyZW50VGlsZS5nZXQoJ2lzUmV2ZWFsZWQnKSAmJiAhY3VycmVudFRpbGUuZ2V0KCdpc0ZsYWcnKSkge1xuICAgICAgICAgICAgICAgIGlmICh0aWxlUHJvcHMuaXNTYWZlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYm9hcmQgPSB0aGlzLmJvYXJkLnNldEluKFtjdXJyZW50VGlsZS5nZXQoJ2lkJyldLCBjdXJyZW50VGlsZS5zZXQoJ2lzUmV2ZWFsZWQnLCB0cnVlKSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHJ5VG9XaW4oY3VycmVudFRpbGUuZ2V0KCdpZCcpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvYXJkID0gdGhpcy5ib2FyZC5zZXRJbihbY3VycmVudFRpbGUuZ2V0KCdpZCcpXSwgY3VycmVudFRpbGUuc2V0KCdpc1JldmVhbGVkJywgdHJ1ZSkuc2V0KCdtaW5lc0Fyb3VuZCcsIHRpbGVQcm9wcy5taW5lc0Fyb3VuZCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuYmluZCh0aGlzKSk7XG4gICAgfSxcblxuICAgIGdldFRpbGVQcm9wczogZnVuY3Rpb24gZ2V0VGlsZVByb3BzKGlkKSB7XG4gICAgICAgIHZhciBzYWZlID0gdHJ1ZTtcbiAgICAgICAgdmFyIG1pbmVzQXJvdW5kID0gMDtcbiAgICAgICAgX1V0aWxzMlsnZGVmYXVsdCddLmdldERpcmVjdGlvbnMoKS5tYXAoKGZ1bmN0aW9uIChkaXIpIHtcbiAgICAgICAgICAgIGlmIChnZXRUaWxlQnlEaXJlY3Rpb24oZGlyLCB0aGlzLmJvYXJkLCBpZCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZ2V0VGlsZUJ5RGlyZWN0aW9uKGRpciwgdGhpcy5ib2FyZCwgaWQpLmdldCgnaXNNaW5lJykpIHtcbiAgICAgICAgICAgICAgICAgICAgbWluZXNBcm91bmQrKztcbiAgICAgICAgICAgICAgICAgICAgc2FmZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICdpc1NhZmUnOiBzYWZlLFxuICAgICAgICAgICAgJ21pbmVzQXJvdW5kJzogbWluZXNBcm91bmRcbiAgICAgICAgfTtcbiAgICB9LFxuXG4gICAgZW5kR2FtZTogZnVuY3Rpb24gZW5kR2FtZSgpIHtcbiAgICAgICAgX0FjdGlvbnNBY3Rpb25zMlsnZGVmYXVsdCddLmdhbWVPdmVyKCk7XG4gICAgICAgIHZhciBuZXdCb2FyZCA9IHRoaXMuYm9hcmQubWFwKGZ1bmN0aW9uICh0aWxlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGlsZS5nZXQoJ2lzTWluZScpID8gdGlsZS5zZXQoJ2lzUmV2ZWFsZWQnLCB0cnVlKS5zZXQoJ2lzRmxhZycsIGZhbHNlKSA6IHRpbGU7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnVwZGF0ZUJvYXJkKG5ld0JvYXJkKTtcbiAgICB9LFxuXG4gICAgb25OZXdHYW1lOiBmdW5jdGlvbiBvbk5ld0dhbWUoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlQm9hcmQoX1V0aWxzMlsnZGVmYXVsdCddLmdldERlZmF1bHRCb2FyZChfR2FtZVN0b3JlMlsnZGVmYXVsdCddLnJvd3MsIF9HYW1lU3RvcmUyWydkZWZhdWx0J10uY29scywgX0dhbWVTdG9yZTJbJ2RlZmF1bHQnXS5taW5lcykpO1xuICAgIH0sXG5cbiAgICBvblRvZ2dsZUZsYWc6IGZ1bmN0aW9uIG9uVG9nZ2xlRmxhZyhpZCkge1xuICAgICAgICB2YXIgbmV3VGlsZSA9IHRoaXMuYm9hcmQuZ2V0KGlkKS5zZXQoJ2lzRmxhZycsICF0aGlzLmJvYXJkLmdldChpZCkuZ2V0KCdpc0ZsYWcnKSk7XG4gICAgICAgIG5ld1RpbGUuZ2V0KCdpc0ZsYWcnKSA/IF9BY3Rpb25zQWN0aW9uczJbJ2RlZmF1bHQnXS5yZWR1Y2VGbGFnc0NvdW50KCkgOiBfQWN0aW9uc0FjdGlvbnMyWydkZWZhdWx0J10uaW5jcmVhc2VGbGFnc0NvdW50KCk7XG4gICAgICAgIHZhciBuZXdCb2FyZCA9IHRoaXMuYm9hcmQuc2V0SW4oW2lkXSwgbmV3VGlsZSk7XG4gICAgICAgIHRoaXMudXBkYXRlQm9hcmQobmV3Qm9hcmQpO1xuICAgIH0sXG5cbiAgICB1cGRhdGVCb2FyZDogZnVuY3Rpb24gdXBkYXRlQm9hcmQoYm9hcmQpIHtcbiAgICAgICAgdGhpcy5ib2FyZCA9IGJvYXJkO1xuICAgICAgICB0aGlzLnRyaWdnZXIoYm9hcmQpOyAvLyBzZW5kcyB0aGUgdXBkYXRlZCBib2FyZCB0byBhbGwgbGlzdGVuaW5nIGNvbXBvbmVudHMgKEdhbWVCb2FyZClcbiAgICB9XG5cbn0pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBTdG9yZTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Qm9hcmRTdG9yZS5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgX0FjdGlvbnNBY3Rpb25zID0gcmVxdWlyZSgnLi8uLi9BY3Rpb25zL0FjdGlvbnMnKTtcblxudmFyIF9BY3Rpb25zQWN0aW9uczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9BY3Rpb25zQWN0aW9ucyk7XG5cbnZhciBTdG9yZSA9IFJlZmx1eC5jcmVhdGVTdG9yZSh7XG5cbiAgICBsaXN0ZW5hYmxlczogX0FjdGlvbnNBY3Rpb25zMlsnZGVmYXVsdCddLFxuXG4gICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgdGhpcy51c2VybmFtZSA9ICdkaW1hZ2ltYnVyZyc7XG4gICAgICAgIHRoaXMucm93cyA9IDIwO1xuICAgICAgICB0aGlzLmNvbHMgPSAyMDtcbiAgICAgICAgdGhpcy5nYW1lT3ZlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLmxldmVsID0gMTtcbiAgICAgICAgdGhpcy5taW5lcyA9IHBhcnNlSW50KHRoaXMucm93cyAqIHRoaXMuY29scyAqICgxIC8gKDYgLSB0aGlzLmxldmVsKSkpO1xuICAgICAgICB0aGlzLmZsYWdzID0gdGhpcy5taW5lcztcbiAgICAgICAgdGhpcy5nYW1lT24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy53aW4gPSBmYWxzZTtcbiAgICB9LFxuXG4gICAgdXBkYXRlTWluZXM6IGZ1bmN0aW9uIHVwZGF0ZU1pbmVzKCkge1xuICAgICAgICB0aGlzLm1pbmVzID0gcGFyc2VJbnQodGhpcy5yb3dzICogdGhpcy5jb2xzICogKDEgLyAoNiAtIHRoaXMubGV2ZWwpKSk7XG4gICAgfSxcblxuICAgIGdldEdhbWU6IGZ1bmN0aW9uIGdldEdhbWUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBnYW1lT3ZlcjogdGhpcy5nYW1lT3ZlcixcbiAgICAgICAgICAgIGdhbWVPbjogdGhpcy5nYW1lT24sXG4gICAgICAgICAgICBmbGFnczogdGhpcy5mbGFncyxcbiAgICAgICAgICAgIG1pbmVzOiB0aGlzLm1pbmVzLFxuICAgICAgICAgICAgbGV2ZWw6IHRoaXMubGV2ZWwsXG4gICAgICAgICAgICBjb2xzOiB0aGlzLmNvbHMsXG4gICAgICAgICAgICByb3dzOiB0aGlzLnJvd3MsXG4gICAgICAgICAgICB3aW46IHRoaXMud2luXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIGdldEZsYWdzQ291bnQ6IGZ1bmN0aW9uIGdldEZsYWdzQ291bnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZsYWdzO1xuICAgIH0sXG5cbiAgICBpc0dhbWVPdmVyOiBmdW5jdGlvbiBpc0dhbWVPdmVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nYW1lT3ZlcjtcbiAgICB9LFxuXG4gICAgb25HYW1lT3ZlcjogZnVuY3Rpb24gb25HYW1lT3ZlcigpIHtcbiAgICAgICAgdGhpcy5nYW1lT3ZlciA9IHRydWU7XG4gICAgICAgIHRoaXMudXBkYXRlR2FtZSgpO1xuICAgIH0sXG5cbiAgICBvbk5ld0dhbWU6IGZ1bmN0aW9uIG9uTmV3R2FtZSgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVNaW5lcygpO1xuICAgICAgICB0aGlzLmdhbWVPdmVyID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZ2FtZU9uID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZmxhZ3MgPSB0aGlzLm1pbmVzO1xuICAgICAgICB0aGlzLnVwZGF0ZUdhbWUoKTtcbiAgICB9LFxuXG4gICAgb25SZWR1Y2VGbGFnc0NvdW50OiBmdW5jdGlvbiBvblJlZHVjZUZsYWdzQ291bnQoKSB7XG4gICAgICAgIHRoaXMuZmxhZ3MtLTtcbiAgICAgICAgdGhpcy51cGRhdGVHYW1lKCk7XG4gICAgfSxcblxuICAgIG9uSW5jcmVhc2VGbGFnc0NvdW50OiBmdW5jdGlvbiBvbkluY3JlYXNlRmxhZ3NDb3VudCgpIHtcbiAgICAgICAgdGhpcy5mbGFncysrO1xuICAgICAgICB0aGlzLnVwZGF0ZUdhbWUoKTtcbiAgICB9LFxuXG4gICAgb25HYW1lT246IGZ1bmN0aW9uIG9uR2FtZU9uKCkge1xuICAgICAgICBpZiAoIXRoaXMuZ2FtZU9uKSB7XG4gICAgICAgICAgICB0aGlzLmdhbWVPbiA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUdhbWUoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkluY3JlYXNlTGV2ZWw6IGZ1bmN0aW9uIG9uSW5jcmVhc2VMZXZlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMubGV2ZWwgPCA0KSB7XG4gICAgICAgICAgICB0aGlzLmxldmVsKys7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1pbmVzKCk7XG4gICAgICAgICAgICBfQWN0aW9uc0FjdGlvbnMyWydkZWZhdWx0J10ubmV3R2FtZSgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uRGVjcmVhc2VMZXZlbDogZnVuY3Rpb24gb25EZWNyZWFzZUxldmVsKCkge1xuICAgICAgICBpZiAodGhpcy5sZXZlbCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMubGV2ZWwtLTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlTWluZXMoKTtcbiAgICAgICAgICAgIF9BY3Rpb25zQWN0aW9uczJbJ2RlZmF1bHQnXS5uZXdHYW1lKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25Db2xzQ2hhbmdlZDogZnVuY3Rpb24gb25Db2xzQ2hhbmdlZChjb2xzKSB7XG4gICAgICAgIHRoaXMuY29scyA9IE51bWJlcihjb2xzKTtcbiAgICAgICAgX0FjdGlvbnNBY3Rpb25zMlsnZGVmYXVsdCddLm5ld0dhbWUoKTtcbiAgICB9LFxuXG4gICAgb25Sb3dzQ2hhbmdlZDogZnVuY3Rpb24gb25Sb3dzQ2hhbmdlZChyb3dzKSB7XG4gICAgICAgIHRoaXMucm93cyA9IE51bWJlcihyb3dzKTtcbiAgICAgICAgX0FjdGlvbnNBY3Rpb25zMlsnZGVmYXVsdCddLm5ld0dhbWUoKTtcbiAgICB9LFxuXG4gICAgb25XaW5HYW1lOiBmdW5jdGlvbiBvbldpbkdhbWUoKSB7XG4gICAgICAgIHRoaXMud2luID0gdHJ1ZTtcbiAgICAgICAgX0FjdGlvbnNBY3Rpb25zMlsnZGVmYXVsdCddLmdhbWVPdmVyKCk7XG4gICAgfSxcblxuICAgIHVwZGF0ZUdhbWU6IGZ1bmN0aW9uIHVwZGF0ZUdhbWUoKSB7XG4gICAgICAgIHRoaXMudHJpZ2dlcih0aGlzLmdldEdhbWUoKSk7XG4gICAgfVxuXG59KTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gU3RvcmU7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUdhbWVTdG9yZS5qcy5tYXBcbiIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbnZhciBVdGlsaXRpZXMgPSAoZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG5cbiAgICAgICAgY3JlYXRlQm9hcmRUd29EaW1lbnNpb25hbDogZnVuY3Rpb24gY3JlYXRlQm9hcmRUd29EaW1lbnNpb25hbCh0aWxlcywgbnVtYmVyT2ZSb3dzKSB7XG4gICAgICAgICAgICB2YXIgbGVuZ3RoID0gdGlsZXMuc2l6ZSB8fCB0aWxlcy5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSBudW1iZXJPZlJvd3MpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh0aWxlcy5zbGljZShpLCBpICsgbnVtYmVyT2ZSb3dzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gSW1tdXRhYmxlLmZyb21KUyhyZXN1bHQpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldERlZmF1bHRCb2FyZDogZnVuY3Rpb24gZ2V0RGVmYXVsdEJvYXJkKHJvd3MsIGNvbHMsIG1pbmVzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pbml0Qm9hcmQocm93cywgY29scywgbWluZXMpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGluaXRCb2FyZDogZnVuY3Rpb24gaW5pdEJvYXJkKHJvd3MsIGNvbHMsIG51bWJlck9mTWluZXMpIHtcbiAgICAgICAgICAgIHZhciBtaW5lcyA9IHRoaXMuY3JlYXRlTWluZXMobnVtYmVyT2ZNaW5lcyk7XG4gICAgICAgICAgICB2YXIgdGlsZXMgPSB0aGlzLmNyZWF0ZVRpbGVzKHJvd3MsIGNvbHMsIG51bWJlck9mTWluZXMpO1xuICAgICAgICAgICAgdmFyIHNodWZmbGVkID0gXy5zaHVmZmxlKG1pbmVzLmNvbmNhdCh0aWxlcykudG9KUygpKTtcbiAgICAgICAgICAgIHJldHVybiBJbW11dGFibGUuZnJvbUpTKHNodWZmbGVkKS5tYXAoZnVuY3Rpb24gKHRpbGUsIGlkeCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aWxlLnNldCgnaWQnLCBpZHgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgY3JlYXRlTWluZXM6IGZ1bmN0aW9uIGNyZWF0ZU1pbmVzKG51bWJlck9mTWluZXMpIHtcbiAgICAgICAgICAgIHZhciBtaW5lcyA9IFtdO1xuICAgICAgICAgICAgd2hpbGUgKG51bWJlck9mTWluZXMtLSkge1xuICAgICAgICAgICAgICAgIG1pbmVzLnB1c2goSW1tdXRhYmxlLk1hcCh7IGlzTWluZTogdHJ1ZSwgaXNSZXZlYWxlZDogZmFsc2UsIG1pbmVzQXJvdW5kOiAwLCBpc0ZsYWc6IGZhbHNlIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBJbW11dGFibGUuTGlzdChtaW5lcyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgY3JlYXRlVGlsZXM6IGZ1bmN0aW9uIGNyZWF0ZVRpbGVzKHJvd3MsIGNvbHMsIG51bWJlck9mTWluZXMpIHtcbiAgICAgICAgICAgIHZhciBudW1iZXJPZlRpbGVzID0gcm93cyAqIGNvbHMgLSBudW1iZXJPZk1pbmVzO1xuICAgICAgICAgICAgdmFyIHRpbGVzID0gW107XG4gICAgICAgICAgICB3aGlsZSAobnVtYmVyT2ZUaWxlcy0tKSB7XG4gICAgICAgICAgICAgICAgdGlsZXMucHVzaChJbW11dGFibGUuTWFwKHsgaXNNaW5lOiBmYWxzZSwgaXNSZXZlYWxlZDogZmFsc2UsIG1pbmVzQXJvdW5kOiAwLCBpc0ZsYWc6IGZhbHNlIH0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBJbW11dGFibGUuTGlzdCh0aWxlcyk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgZ2V0RGlyZWN0aW9uczogZnVuY3Rpb24gZ2V0RGlyZWN0aW9ucygpIHtcbiAgICAgICAgICAgIHJldHVybiBbJ24nLCAncycsICdlJywgJ3cnLCAnbmUnLCAnbncnLCAnc2UnLCAnc3cnXTtcbiAgICAgICAgfVxuXG4gICAgfTtcbn0pKCk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IFV0aWxpdGllcztcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VXRpbHMuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIF9Db21wb25lbnRzU2NvcmVCb2FyZCA9IHJlcXVpcmUoJy4vLi4vQ29tcG9uZW50cy9TY29yZUJvYXJkJyk7XG5cbnZhciBfQ29tcG9uZW50c1Njb3JlQm9hcmQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQ29tcG9uZW50c1Njb3JlQm9hcmQpO1xuXG52YXIgX0NvbXBvbmVudHNHYW1lQm9hcmQgPSByZXF1aXJlKCcuLy4uL0NvbXBvbmVudHMvR2FtZUJvYXJkJyk7XG5cbnZhciBfQ29tcG9uZW50c0dhbWVCb2FyZDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Db21wb25lbnRzR2FtZUJvYXJkKTtcblxudmFyIFJlZmx1eFN3ZWVwZXIgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgZGlzcGxheU5hbWU6ICdSZWZsdXhTd2VlcGVyJyxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAnTWluZXNTd2VlcGVyIFZlciAwLjAuMSdcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KF9Db21wb25lbnRzU2NvcmVCb2FyZDJbJ2RlZmF1bHQnXSwgbnVsbCksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KF9Db21wb25lbnRzR2FtZUJvYXJkMlsnZGVmYXVsdCddLCBudWxsKVxuICAgICAgICApO1xuICAgIH1cbn0pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBSZWZsdXhTd2VlcGVyO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG4vLyMgc291cmNlTWFwcGluZ1VSTD1SZWZsdXhTd2VlcGVyLmpzLm1hcFxuIl19
