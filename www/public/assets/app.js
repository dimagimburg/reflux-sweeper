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

    propTypes: {
        id: React.PropTypes.number.isRequired,
        isMine: React.PropTypes.bool.isRequired,
        isRevealed: React.PropTypes.bool.isRequired,
        minesAround: React.PropTypes.number.isRequired,
        isFlag: React.PropTypes.bool.isRequired
    },

    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
        return this.props.piece.isRevealed !== nextProps.isRevealed || nextProps.isFlag !== this.props.piece.isFlag;
    },

    revealTile: function revealTile() {
        if (!this.props.piece.isFlag && !this.props.piece.isRevealed && !_StoresGameStore2['default'].isGameOver()) {
            _ActionsActions2['default'].revealTile(this.props.piece.id);
        }
    },

    toggleFlag: function toggleFlag(e) {
        e.preventDefault();
        if (!this.props.piece.isRevealed && (_StoresGameStore2['default'].getFlagsCount() || this.props.piece.isFlag) && !_StoresGameStore2['default'].isGameOver()) {
            _ActionsActions2['default'].toggleFlag(this.props.piece.id);
        }
    },

    render: function render() {
        var classes = classNames({
            'board-piece': true,
            'revealed-mine': this.props.piece.isRevealed && this.props.piece.isMine,
            'revealed-tile': this.props.piece.isRevealed && !this.props.piece.isMine,
            'safe': this.props.piece.isRevealed && !this.props.piece.isMine && !this.props.piece.minesAround,
            'flag': this.props.piece.isFlag
        });

        return React.createElement(
            'div',
            { className: classes, onClick: this.revealTile, onContextMenu: this.toggleFlag },
            this.props.piece.minesAround ? this.props.piece.minesAround : ''
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
                        return React.createElement(_BoardPiece2['default'], { piece: piece });
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJ3d3cvYXBwL2VzNi1idWlsZC9BY3Rpb25zL0FjdGlvbnMuanMiLCJ3d3cvYXBwL2VzNi1idWlsZC9BcHAuanMiLCJ3d3cvYXBwL2VzNi1idWlsZC9Db21wb25lbnRzL0JvYXJkUGllY2UuanMiLCJ3d3cvYXBwL2VzNi1idWlsZC9Db21wb25lbnRzL0dhbWVCb2FyZC5qcyIsInd3dy9hcHAvZXM2LWJ1aWxkL0NvbXBvbmVudHMvU2NvcmVCb2FyZC5qcyIsInd3dy9hcHAvZXM2LWJ1aWxkL1N0b3Jlcy9Cb2FyZFN0b3JlLmpzIiwid3d3L2FwcC9lczYtYnVpbGQvU3RvcmVzL0dhbWVTdG9yZS5qcyIsInd3dy9hcHAvZXM2LWJ1aWxkL1V0aWxzLmpzIiwid3d3L2FwcC9lczYtYnVpbGQvVmlld3MvUmVmbHV4U3dlZXBlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbnZhciBBY3Rpb25zID0gUmVmbHV4LmNyZWF0ZUFjdGlvbnMoWydyZXZlYWxUaWxlJywgJ2dhbWVPdmVyJywgJ25ld0dhbWUnLCAndG9nZ2xlRmxhZycsICdyZWR1Y2VGbGFnc0NvdW50JywgJ2luY3JlYXNlRmxhZ3NDb3VudCcsICdnYW1lT24nLCAnaW5jcmVhc2VMZXZlbCcsICdkZWNyZWFzZUxldmVsJywgJ2NvbHNDaGFuZ2VkJywgJ3Jvd3NDaGFuZ2VkJywgJ3dpbkdhbWUnXSk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IEFjdGlvbnM7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUFjdGlvbnMuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIF9WaWV3c1JlZmx1eFN3ZWVwZXIgPSByZXF1aXJlKCcuL1ZpZXdzL1JlZmx1eFN3ZWVwZXInKTtcblxudmFyIF9WaWV3c1JlZmx1eFN3ZWVwZXIyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfVmlld3NSZWZsdXhTd2VlcGVyKTtcblxuUmVhY3RET00ucmVuZGVyKFJlYWN0LmNyZWF0ZUVsZW1lbnQoX1ZpZXdzUmVmbHV4U3dlZXBlcjJbJ2RlZmF1bHQnXSwgbnVsbCksIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50JykpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QXBwLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfU3RvcmVzQm9hcmRTdG9yZSA9IHJlcXVpcmUoJy4uL1N0b3Jlcy9Cb2FyZFN0b3JlJyk7XG5cbnZhciBfU3RvcmVzQm9hcmRTdG9yZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9TdG9yZXNCb2FyZFN0b3JlKTtcblxudmFyIF9BY3Rpb25zQWN0aW9ucyA9IHJlcXVpcmUoJy4uL0FjdGlvbnMvQWN0aW9ucycpO1xuXG52YXIgX0FjdGlvbnNBY3Rpb25zMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0FjdGlvbnNBY3Rpb25zKTtcblxudmFyIF9TdG9yZXNHYW1lU3RvcmUgPSByZXF1aXJlKCcuLi9TdG9yZXMvR2FtZVN0b3JlJyk7XG5cbnZhciBfU3RvcmVzR2FtZVN0b3JlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1N0b3Jlc0dhbWVTdG9yZSk7XG5cbnZhciBCb2FyZFBpZWNlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGRpc3BsYXlOYW1lOiAnQm9hcmRQaWVjZScsXG5cbiAgICBwcm9wVHlwZXM6IHtcbiAgICAgICAgaWQ6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgaXNNaW5lOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICBpc1JldmVhbGVkOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgICAgICBtaW5lc0Fyb3VuZDogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICBpc0ZsYWc6IFJlYWN0LlByb3BUeXBlcy5ib29sLmlzUmVxdWlyZWRcbiAgICB9LFxuXG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlOiBmdW5jdGlvbiBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMucGllY2UuaXNSZXZlYWxlZCAhPT0gbmV4dFByb3BzLmlzUmV2ZWFsZWQgfHwgbmV4dFByb3BzLmlzRmxhZyAhPT0gdGhpcy5wcm9wcy5waWVjZS5pc0ZsYWc7XG4gICAgfSxcblxuICAgIHJldmVhbFRpbGU6IGZ1bmN0aW9uIHJldmVhbFRpbGUoKSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5waWVjZS5pc0ZsYWcgJiYgIXRoaXMucHJvcHMucGllY2UuaXNSZXZlYWxlZCAmJiAhX1N0b3Jlc0dhbWVTdG9yZTJbJ2RlZmF1bHQnXS5pc0dhbWVPdmVyKCkpIHtcbiAgICAgICAgICAgIF9BY3Rpb25zQWN0aW9uczJbJ2RlZmF1bHQnXS5yZXZlYWxUaWxlKHRoaXMucHJvcHMucGllY2UuaWQpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHRvZ2dsZUZsYWc6IGZ1bmN0aW9uIHRvZ2dsZUZsYWcoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5waWVjZS5pc1JldmVhbGVkICYmIChfU3RvcmVzR2FtZVN0b3JlMlsnZGVmYXVsdCddLmdldEZsYWdzQ291bnQoKSB8fCB0aGlzLnByb3BzLnBpZWNlLmlzRmxhZykgJiYgIV9TdG9yZXNHYW1lU3RvcmUyWydkZWZhdWx0J10uaXNHYW1lT3ZlcigpKSB7XG4gICAgICAgICAgICBfQWN0aW9uc0FjdGlvbnMyWydkZWZhdWx0J10udG9nZ2xlRmxhZyh0aGlzLnByb3BzLnBpZWNlLmlkKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIGNsYXNzZXMgPSBjbGFzc05hbWVzKHtcbiAgICAgICAgICAgICdib2FyZC1waWVjZSc6IHRydWUsXG4gICAgICAgICAgICAncmV2ZWFsZWQtbWluZSc6IHRoaXMucHJvcHMucGllY2UuaXNSZXZlYWxlZCAmJiB0aGlzLnByb3BzLnBpZWNlLmlzTWluZSxcbiAgICAgICAgICAgICdyZXZlYWxlZC10aWxlJzogdGhpcy5wcm9wcy5waWVjZS5pc1JldmVhbGVkICYmICF0aGlzLnByb3BzLnBpZWNlLmlzTWluZSxcbiAgICAgICAgICAgICdzYWZlJzogdGhpcy5wcm9wcy5waWVjZS5pc1JldmVhbGVkICYmICF0aGlzLnByb3BzLnBpZWNlLmlzTWluZSAmJiAhdGhpcy5wcm9wcy5waWVjZS5taW5lc0Fyb3VuZCxcbiAgICAgICAgICAgICdmbGFnJzogdGhpcy5wcm9wcy5waWVjZS5pc0ZsYWdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgIHsgY2xhc3NOYW1lOiBjbGFzc2VzLCBvbkNsaWNrOiB0aGlzLnJldmVhbFRpbGUsIG9uQ29udGV4dE1lbnU6IHRoaXMudG9nZ2xlRmxhZyB9LFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5waWVjZS5taW5lc0Fyb3VuZCA/IHRoaXMucHJvcHMucGllY2UubWluZXNBcm91bmQgOiAnJ1xuICAgICAgICApO1xuICAgIH1cbn0pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBCb2FyZFBpZWNlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Cb2FyZFBpZWNlLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfQWN0aW9uc0FjdGlvbnMgPSByZXF1aXJlKCcuLi9BY3Rpb25zL0FjdGlvbnMnKTtcblxudmFyIF9BY3Rpb25zQWN0aW9uczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9BY3Rpb25zQWN0aW9ucyk7XG5cbnZhciBfU3RvcmVzQm9hcmRTdG9yZSA9IHJlcXVpcmUoJy4uL1N0b3Jlcy9Cb2FyZFN0b3JlJyk7XG5cbnZhciBfU3RvcmVzQm9hcmRTdG9yZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9TdG9yZXNCb2FyZFN0b3JlKTtcblxudmFyIF9TdG9yZXNHYW1lU3RvcmUgPSByZXF1aXJlKCcuLi9TdG9yZXMvR2FtZVN0b3JlJyk7XG5cbnZhciBfU3RvcmVzR2FtZVN0b3JlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1N0b3Jlc0dhbWVTdG9yZSk7XG5cbnZhciBfQm9hcmRQaWVjZSA9IHJlcXVpcmUoJy4vQm9hcmRQaWVjZScpO1xuXG52YXIgX0JvYXJkUGllY2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQm9hcmRQaWVjZSk7XG5cbnZhciBfVXRpbHMgPSByZXF1aXJlKCcuLi9VdGlscycpO1xuXG52YXIgX1V0aWxzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1V0aWxzKTtcblxudmFyIEdhbWVCb2FyZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBkaXNwbGF5TmFtZTogJ0dhbWVCb2FyZCcsXG5cbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGJvYXJkOiBfU3RvcmVzQm9hcmRTdG9yZTJbJ2RlZmF1bHQnXS5nZXRCb2FyZCgpXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbiBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICAgICAgdGhpcy51bnN1YnNjcmliZSA9IF9TdG9yZXNCb2FyZFN0b3JlMlsnZGVmYXVsdCddLmxpc3Rlbih0aGlzLm9uQm9hcmRDaGFuZ2UpO1xuICAgIH0sXG5cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudDogZnVuY3Rpb24gY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmUoKTtcbiAgICB9LFxuXG4gICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlOiBmdW5jdGlvbiBzaG91bGRDb21wb25lbnRVcGRhdGUobmV4dFByb3BzLCBuZXh0U3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIG5leHRTdGF0ZS5ib2FyZCAhPT0gdGhpcy5zdGF0ZS5ib2FyZDtcbiAgICB9LFxuXG4gICAgb25Cb2FyZENoYW5nZTogZnVuY3Rpb24gb25Cb2FyZENoYW5nZShib2FyZCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGJvYXJkOiBib2FyZFxuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgX1V0aWxzMlsnZGVmYXVsdCddLmNyZWF0ZUJvYXJkVHdvRGltZW5zaW9uYWwodGhpcy5zdGF0ZS5ib2FyZCwgX1N0b3Jlc0dhbWVTdG9yZTJbJ2RlZmF1bHQnXS5jb2xzKS50b0pTKCkubWFwKGZ1bmN0aW9uIChhKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICBhLm1hcChmdW5jdGlvbiAocGllY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KF9Cb2FyZFBpZWNlMlsnZGVmYXVsdCddLCB7IHBpZWNlOiBwaWVjZSB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gR2FtZUJvYXJkO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG4vLyMgc291cmNlTWFwcGluZ1VSTD1HYW1lQm9hcmQuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIF9BY3Rpb25zQWN0aW9ucyA9IHJlcXVpcmUoJy4uL0FjdGlvbnMvQWN0aW9ucycpO1xuXG52YXIgX0FjdGlvbnNBY3Rpb25zMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0FjdGlvbnNBY3Rpb25zKTtcblxudmFyIF9TdG9yZXNHYW1lU3RvcmUgPSByZXF1aXJlKCcuLi9TdG9yZXMvR2FtZVN0b3JlJyk7XG5cbnZhciBfU3RvcmVzR2FtZVN0b3JlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX1N0b3Jlc0dhbWVTdG9yZSk7XG5cbnZhciBTY29yZUJvYXJkID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGRpc3BsYXlOYW1lOiAnU2NvcmVCb2FyZCcsXG5cbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIF9TdG9yZXNHYW1lU3RvcmUyWydkZWZhdWx0J10uZ2V0R2FtZSgpO1xuICAgIH0sXG5cbiAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24gY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIHRoaXMudW5zdWJzY3JpYmUgPSBfU3RvcmVzR2FtZVN0b3JlMlsnZGVmYXVsdCddLmxpc3Rlbih0aGlzLm9uQ2hhbmdlKTtcbiAgICB9LFxuXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgICAgICB0aGlzLnVuc3Vic2NpYmUoKTtcbiAgICB9LFxuXG4gICAgb25DaGFuZ2U6IGZ1bmN0aW9uIG9uQ2hhbmdlKGdhbWUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShnYW1lKTtcbiAgICB9LFxuXG4gICAgbmV3R2FtZTogZnVuY3Rpb24gbmV3R2FtZSgpIHtcbiAgICAgICAgX0FjdGlvbnNBY3Rpb25zMlsnZGVmYXVsdCddLm5ld0dhbWUoKTtcbiAgICB9LFxuXG4gICAgaW5jcmVhc2VMZXZlbDogZnVuY3Rpb24gaW5jcmVhc2VMZXZlbCgpIHtcbiAgICAgICAgX0FjdGlvbnNBY3Rpb25zMlsnZGVmYXVsdCddLmluY3JlYXNlTGV2ZWwoKTtcbiAgICB9LFxuXG4gICAgZGVjcmVhc2VMZXZlbDogZnVuY3Rpb24gZGVjcmVhc2VMZXZlbCgpIHtcbiAgICAgICAgX0FjdGlvbnNBY3Rpb25zMlsnZGVmYXVsdCddLmRlY3JlYXNlTGV2ZWwoKTtcbiAgICB9LFxuXG4gICAgY29sc0NoYW5nZWQ6IGZ1bmN0aW9uIGNvbHNDaGFuZ2VkKGUpIHtcbiAgICAgICAgX0FjdGlvbnNBY3Rpb25zMlsnZGVmYXVsdCddLmNvbHNDaGFuZ2VkKGUudGFyZ2V0LnZhbHVlKTtcbiAgICB9LFxuXG4gICAgcm93c0NoYW5nZWQ6IGZ1bmN0aW9uIHJvd3NDaGFuZ2VkKGUpIHtcbiAgICAgICAgX0FjdGlvbnNBY3Rpb25zMlsnZGVmYXVsdCddLnJvd3NDaGFuZ2VkKGUudGFyZ2V0LnZhbHVlKTtcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICdIaSAnLFxuICAgICAgICAgICAgICAgIF9TdG9yZXNHYW1lU3RvcmUyWydkZWZhdWx0J10udXNlcm5hbWUsXG4gICAgICAgICAgICAgICAgJywgJyxcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmdhbWVPdmVyICYmIHRoaXMuc3RhdGUud2luID8gJ1lvdSBhcmUgVElHR0VSISEnIDogdGhpcy5zdGF0ZS5nYW1lT3ZlciAmJiAhdGhpcy5zdGF0ZS53aW4gPyAnTE9TRVIhIScgOiAnR09PRCBMVUNLISdcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgJ051bWJlciBvZiBjb2x1bW5zOiAnLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JywgeyBpZDogJ2NvbHMnLCB0eXBlOiAnbnVtYmVyJywgdmFsdWU6IHRoaXMuc3RhdGUuY29scywgb25DaGFuZ2U6IHRoaXMuY29sc0NoYW5nZWQgfSksXG4gICAgICAgICAgICAgICAgJyAnLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2JyJywgbnVsbCksXG4gICAgICAgICAgICAgICAgJ051bWJlciBvZiByb3dzOiAnLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JywgeyBpZDogJ3Jvd3MnLCB0eXBlOiAnbnVtYmVyJywgdmFsdWU6IHRoaXMuc3RhdGUucm93cywgb25DaGFuZ2U6IHRoaXMucm93c0NoYW5nZWQgfSksXG4gICAgICAgICAgICAgICAgJyAnLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2JyJywgbnVsbCksXG4gICAgICAgICAgICAgICAgJ051bWJlciB0aWxlczogJyxcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmNvbHMgKiB0aGlzLnN0YXRlLnJvd3MsXG4gICAgICAgICAgICAgICAgJyAnLFxuICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoJ2JyJywgbnVsbCksXG4gICAgICAgICAgICAgICAgJ0dhbWUgTGV2ZWw6ICcsXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnaW1nJywgeyBjbGFzc05hbWU6ICdsZXZlbC1pbWcnLCBzcmM6ICcvaW1hZ2VzL2xldmVsLScgKyB0aGlzLnN0YXRlLmxldmVsICsgJy5wbmcnIH0pLFxuICAgICAgICAgICAgICAgICcgJyxcbiAgICAgICAgICAgICAgICAhdGhpcy5zdGF0ZS5nYW1lT24gPyBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICAgICAnc3BhbicsXG4gICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAgICAgICAgICAgICAnYnV0dG9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgb25DbGljazogdGhpcy5pbmNyZWFzZUxldmVsIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAnKydcbiAgICAgICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICdidXR0b24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBvbkNsaWNrOiB0aGlzLmRlY3JlYXNlTGV2ZWwgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICctJ1xuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgKSA6ICcnLFxuICAgICAgICAgICAgICAgICcsJyxcbiAgICAgICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KCdicicsIG51bGwpLFxuICAgICAgICAgICAgICAgICdOdW1iZXIgb2YgbWluZXM6ICcsXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5taW5lcyxcbiAgICAgICAgICAgICAgICAnLCcsXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudCgnYnInLCBudWxsKSxcbiAgICAgICAgICAgICAgICAnTnVtYmVyIG9mIEZsYWdzIHJlbWFpbmVkOiAnLFxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuZmxhZ3NcbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChcbiAgICAgICAgICAgICAgICAgICAgJ2J1dHRvbicsXG4gICAgICAgICAgICAgICAgICAgIHsgb25DbGljazogdGhpcy5uZXdHYW1lIH0sXG4gICAgICAgICAgICAgICAgICAgICdOZXcgR2FtZSdcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfVxufSk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IFNjb3JlQm9hcmQ7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVNjb3JlQm9hcmQuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIF9VdGlscyA9IHJlcXVpcmUoJy4vLi4vVXRpbHMnKTtcblxudmFyIF9VdGlsczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9VdGlscyk7XG5cbnZhciBfQWN0aW9uc0FjdGlvbnMgPSByZXF1aXJlKCcuLy4uL0FjdGlvbnMvQWN0aW9ucycpO1xuXG52YXIgX0FjdGlvbnNBY3Rpb25zMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0FjdGlvbnNBY3Rpb25zKTtcblxudmFyIF9HYW1lU3RvcmUgPSByZXF1aXJlKCcuL0dhbWVTdG9yZScpO1xuXG52YXIgX0dhbWVTdG9yZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9HYW1lU3RvcmUpO1xuXG52YXIgZ2V0VGlsZUJ5RGlyZWN0aW9uID0gZnVuY3Rpb24gZ2V0VGlsZUJ5RGlyZWN0aW9uKGRpcmVjdGlvbiwgYm9hcmQsIGlkKSB7XG5cbiAgICB2YXIgaXNFZGdlRWFzdCA9IGZ1bmN0aW9uIGlzRWRnZUVhc3QoaWQpIHtcbiAgICAgICAgcmV0dXJuIGlkICUgX0dhbWVTdG9yZTJbJ2RlZmF1bHQnXS5jb2xzID09IF9HYW1lU3RvcmUyWydkZWZhdWx0J10uY29scyAtIDE7XG4gICAgfTtcblxuICAgIHZhciBpc0VkZ2VXZXN0ID0gZnVuY3Rpb24gaXNFZGdlV2VzdChpZCkge1xuICAgICAgICByZXR1cm4gaWQgJSBfR2FtZVN0b3JlMlsnZGVmYXVsdCddLmNvbHMgPT0gMDtcbiAgICB9O1xuXG4gICAgdmFyIHRpbGVCeURpcmVjdGlvbnMgPSB7XG5cbiAgICAgICAgbjogZnVuY3Rpb24gbihib2FyZCwgaWQpIHtcbiAgICAgICAgICAgIHJldHVybiBpZCAtIF9HYW1lU3RvcmUyWydkZWZhdWx0J10uY29scyA8IDAgPyBudWxsIDogYm9hcmQuZ2V0KGlkIC0gX0dhbWVTdG9yZTJbJ2RlZmF1bHQnXS5jb2xzKTtcbiAgICAgICAgfSxcblxuICAgICAgICBzOiBmdW5jdGlvbiBzKGJvYXJkLCBpZCkge1xuICAgICAgICAgICAgcmV0dXJuIGlkICsgX0dhbWVTdG9yZTJbJ2RlZmF1bHQnXS5jb2xzID4gX0dhbWVTdG9yZTJbJ2RlZmF1bHQnXS5jb2xzICogX0dhbWVTdG9yZTJbJ2RlZmF1bHQnXS5yb3dzIC0gMSA/IG51bGwgOiBib2FyZC5nZXQoaWQgKyBfR2FtZVN0b3JlMlsnZGVmYXVsdCddLmNvbHMpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGU6IGZ1bmN0aW9uIGUoYm9hcmQsIGlkKSB7XG4gICAgICAgICAgICByZXR1cm4gaXNFZGdlRWFzdChpZCkgPyBudWxsIDogYm9hcmQuZ2V0KGlkICsgMSk7XG4gICAgICAgIH0sXG5cbiAgICAgICAgdzogZnVuY3Rpb24gdyhib2FyZCwgaWQpIHtcbiAgICAgICAgICAgIHJldHVybiBpc0VkZ2VXZXN0KGlkKSA/IG51bGwgOiBib2FyZC5nZXQoaWQgLSAxKTtcbiAgICAgICAgfSxcblxuICAgICAgICBuZTogZnVuY3Rpb24gbmUoYm9hcmQsIGlkKSB7XG4gICAgICAgICAgICByZXR1cm4gaXNFZGdlRWFzdChpZCkgfHwgaWQgLSBfR2FtZVN0b3JlMlsnZGVmYXVsdCddLmNvbHMgKyAxIDwgMCA/IG51bGwgOiBib2FyZC5nZXQoaWQgLSBfR2FtZVN0b3JlMlsnZGVmYXVsdCddLmNvbHMgKyAxKTtcbiAgICAgICAgfSxcblxuICAgICAgICBzZTogZnVuY3Rpb24gc2UoYm9hcmQsIGlkKSB7XG4gICAgICAgICAgICByZXR1cm4gaXNFZGdlRWFzdChpZCkgfHwgaWQgKyBfR2FtZVN0b3JlMlsnZGVmYXVsdCddLmNvbHMgKyAxID4gX0dhbWVTdG9yZTJbJ2RlZmF1bHQnXS5jb2xzICogX0dhbWVTdG9yZTJbJ2RlZmF1bHQnXS5yb3dzIC0gMSA/IG51bGwgOiBib2FyZC5nZXQoaWQgKyBfR2FtZVN0b3JlMlsnZGVmYXVsdCddLmNvbHMgKyAxKTtcbiAgICAgICAgfSxcblxuICAgICAgICBzdzogZnVuY3Rpb24gc3coYm9hcmQsIGlkKSB7XG4gICAgICAgICAgICByZXR1cm4gaXNFZGdlV2VzdChpZCkgfHwgaWQgKyBfR2FtZVN0b3JlMlsnZGVmYXVsdCddLmNvbHMgLSAxID4gX0dhbWVTdG9yZTJbJ2RlZmF1bHQnXS5jb2xzICogX0dhbWVTdG9yZTJbJ2RlZmF1bHQnXS5yb3dzIC0gMSA/IG51bGwgOiBib2FyZC5nZXQoaWQgKyBfR2FtZVN0b3JlMlsnZGVmYXVsdCddLmNvbHMgLSAxKTtcbiAgICAgICAgfSxcblxuICAgICAgICBudzogZnVuY3Rpb24gbncoYm9hcmQsIGlkKSB7XG4gICAgICAgICAgICByZXR1cm4gaXNFZGdlV2VzdChpZCkgfHwgaWQgLSBfR2FtZVN0b3JlMlsnZGVmYXVsdCddLmNvbHMgLSAxIDwgMCA/IG51bGwgOiBib2FyZC5nZXQoaWQgLSBfR2FtZVN0b3JlMlsnZGVmYXVsdCddLmNvbHMgLSAxKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gdGlsZUJ5RGlyZWN0aW9uc1tkaXJlY3Rpb25dKGJvYXJkLCBpZCk7XG59O1xuXG52YXIgU3RvcmUgPSBSZWZsdXguY3JlYXRlU3RvcmUoe1xuXG4gICAgbGlzdGVuYWJsZXM6IFtfQWN0aW9uc0FjdGlvbnMyWydkZWZhdWx0J11dLFxuXG4gICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgdGhpcy5ib2FyZCA9IF9VdGlsczJbJ2RlZmF1bHQnXS5nZXREZWZhdWx0Qm9hcmQoX0dhbWVTdG9yZTJbJ2RlZmF1bHQnXS5yb3dzLCBfR2FtZVN0b3JlMlsnZGVmYXVsdCddLmNvbHMsIF9HYW1lU3RvcmUyWydkZWZhdWx0J10ubWluZXMpO1xuICAgIH0sXG5cbiAgICBnZXRCb2FyZDogZnVuY3Rpb24gZ2V0Qm9hcmQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmJvYXJkO1xuICAgIH0sXG5cbiAgICBnZXRUaWxlOiBmdW5jdGlvbiBnZXRUaWxlKGlkKSB7XG4gICAgICAgIHJldHVybiBJbW11dGFibGUuZnJvbUpTKF8uZmluZCh0aGlzLmJvYXJkLnRvSlMoKSwgZnVuY3Rpb24gKHRpbGUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aWxlLmlkID09PSBpZDtcbiAgICAgICAgfSkpO1xuICAgIH0sXG5cbiAgICBvblJldmVhbFRpbGU6IGZ1bmN0aW9uIG9uUmV2ZWFsVGlsZShpZCkge1xuICAgICAgICBfQWN0aW9uc0FjdGlvbnMyWydkZWZhdWx0J10uZ2FtZU9uKCk7XG4gICAgICAgIHZhciBvbGRUaWxlID0gdGhpcy5ib2FyZC5nZXQoaWQpO1xuICAgICAgICB2YXIgdGlsZVByb3BzID0gdGhpcy5nZXRUaWxlUHJvcHMoaWQpO1xuICAgICAgICB2YXIgbmV3VGlsZSA9IG9sZFRpbGUuc2V0KCdpc1JldmVhbGVkJywgdHJ1ZSk7XG4gICAgICAgIGlmICghbmV3VGlsZS5nZXQoJ2lzTWluZScpKSBuZXdUaWxlID0gbmV3VGlsZS5zZXQoJ21pbmVzQXJvdW5kJywgdGlsZVByb3BzLm1pbmVzQXJvdW5kKTtcbiAgICAgICAgdGhpcy5ib2FyZCA9IHRoaXMuYm9hcmQuc2V0SW4oW2lkXSwgbmV3VGlsZSk7XG4gICAgICAgIGlmIChuZXdUaWxlLmdldCgnaXNNaW5lJykpIHtcbiAgICAgICAgICAgIHRoaXMuZW5kR2FtZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50cnlUb1dpbihpZCk7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1dpbm5lcigpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53aW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudXBkYXRlQm9hcmQodGhpcy5ib2FyZCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaXNXaW5uZXI6IGZ1bmN0aW9uIGlzV2lubmVyKCkge1xuICAgICAgICB2YXIgd2lubmVyID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5ib2FyZC5tYXAoZnVuY3Rpb24gKHRpbGUpIHtcbiAgICAgICAgICAgIGlmICghdGlsZS5nZXQoJ2lzUmV2ZWFsZWQnKSAmJiAhdGlsZS5nZXQoJ2lzTWluZScpKSB7XG4gICAgICAgICAgICAgICAgd2lubmVyID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gd2lubmVyO1xuICAgIH0sXG5cbiAgICB3aW46IGZ1bmN0aW9uIHdpbigpIHtcbiAgICAgICAgX0FjdGlvbnNBY3Rpb25zMlsnZGVmYXVsdCddLndpbkdhbWUoKTtcbiAgICB9LFxuXG4gICAgdHJ5VG9XaW46IGZ1bmN0aW9uIHRyeVRvV2luKGlkKSB7XG4gICAgICAgIF9VdGlsczJbJ2RlZmF1bHQnXS5nZXREaXJlY3Rpb25zKCkubWFwKChmdW5jdGlvbiAoZGlyKSB7XG4gICAgICAgICAgICB2YXIgY3VycmVudFRpbGUgPSBnZXRUaWxlQnlEaXJlY3Rpb24oZGlyLCB0aGlzLmJvYXJkLCBpZCk7XG4gICAgICAgICAgICB2YXIgdGlsZVByb3BzID0gY3VycmVudFRpbGUgPyB0aGlzLmdldFRpbGVQcm9wcyhjdXJyZW50VGlsZS5nZXQoJ2lkJykpIDogbnVsbDtcbiAgICAgICAgICAgIGlmIChjdXJyZW50VGlsZSAmJiAhY3VycmVudFRpbGUuZ2V0KCdpc01pbmUnKSAmJiAhY3VycmVudFRpbGUuZ2V0KCdpc1JldmVhbGVkJykgJiYgIWN1cnJlbnRUaWxlLmdldCgnaXNGbGFnJykpIHtcbiAgICAgICAgICAgICAgICBpZiAodGlsZVByb3BzLmlzU2FmZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvYXJkID0gdGhpcy5ib2FyZC5zZXRJbihbY3VycmVudFRpbGUuZ2V0KCdpZCcpXSwgY3VycmVudFRpbGUuc2V0KCdpc1JldmVhbGVkJywgdHJ1ZSkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyeVRvV2luKGN1cnJlbnRUaWxlLmdldCgnaWQnKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5ib2FyZCA9IHRoaXMuYm9hcmQuc2V0SW4oW2N1cnJlbnRUaWxlLmdldCgnaWQnKV0sIGN1cnJlbnRUaWxlLnNldCgnaXNSZXZlYWxlZCcsIHRydWUpLnNldCgnbWluZXNBcm91bmQnLCB0aWxlUHJvcHMubWluZXNBcm91bmQpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLmJpbmQodGhpcykpO1xuICAgIH0sXG5cbiAgICBnZXRUaWxlUHJvcHM6IGZ1bmN0aW9uIGdldFRpbGVQcm9wcyhpZCkge1xuICAgICAgICB2YXIgc2FmZSA9IHRydWU7XG4gICAgICAgIHZhciBtaW5lc0Fyb3VuZCA9IDA7XG4gICAgICAgIF9VdGlsczJbJ2RlZmF1bHQnXS5nZXREaXJlY3Rpb25zKCkubWFwKChmdW5jdGlvbiAoZGlyKSB7XG4gICAgICAgICAgICBpZiAoZ2V0VGlsZUJ5RGlyZWN0aW9uKGRpciwgdGhpcy5ib2FyZCwgaWQpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGdldFRpbGVCeURpcmVjdGlvbihkaXIsIHRoaXMuYm9hcmQsIGlkKS5nZXQoJ2lzTWluZScpKSB7XG4gICAgICAgICAgICAgICAgICAgIG1pbmVzQXJvdW5kKys7XG4gICAgICAgICAgICAgICAgICAgIHNhZmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLmJpbmQodGhpcykpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAnaXNTYWZlJzogc2FmZSxcbiAgICAgICAgICAgICdtaW5lc0Fyb3VuZCc6IG1pbmVzQXJvdW5kXG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIGVuZEdhbWU6IGZ1bmN0aW9uIGVuZEdhbWUoKSB7XG4gICAgICAgIF9BY3Rpb25zQWN0aW9uczJbJ2RlZmF1bHQnXS5nYW1lT3ZlcigpO1xuICAgICAgICB2YXIgbmV3Qm9hcmQgPSB0aGlzLmJvYXJkLm1hcChmdW5jdGlvbiAodGlsZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRpbGUuZ2V0KCdpc01pbmUnKSA/IHRpbGUuc2V0KCdpc1JldmVhbGVkJywgdHJ1ZSkuc2V0KCdpc0ZsYWcnLCBmYWxzZSkgOiB0aWxlO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy51cGRhdGVCb2FyZChuZXdCb2FyZCk7XG4gICAgfSxcblxuICAgIG9uTmV3R2FtZTogZnVuY3Rpb24gb25OZXdHYW1lKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUJvYXJkKF9VdGlsczJbJ2RlZmF1bHQnXS5nZXREZWZhdWx0Qm9hcmQoX0dhbWVTdG9yZTJbJ2RlZmF1bHQnXS5yb3dzLCBfR2FtZVN0b3JlMlsnZGVmYXVsdCddLmNvbHMsIF9HYW1lU3RvcmUyWydkZWZhdWx0J10ubWluZXMpKTtcbiAgICB9LFxuXG4gICAgb25Ub2dnbGVGbGFnOiBmdW5jdGlvbiBvblRvZ2dsZUZsYWcoaWQpIHtcbiAgICAgICAgdmFyIG5ld1RpbGUgPSB0aGlzLmJvYXJkLmdldChpZCkuc2V0KCdpc0ZsYWcnLCAhdGhpcy5ib2FyZC5nZXQoaWQpLmdldCgnaXNGbGFnJykpO1xuICAgICAgICBuZXdUaWxlLmdldCgnaXNGbGFnJykgPyBfQWN0aW9uc0FjdGlvbnMyWydkZWZhdWx0J10ucmVkdWNlRmxhZ3NDb3VudCgpIDogX0FjdGlvbnNBY3Rpb25zMlsnZGVmYXVsdCddLmluY3JlYXNlRmxhZ3NDb3VudCgpO1xuICAgICAgICB2YXIgbmV3Qm9hcmQgPSB0aGlzLmJvYXJkLnNldEluKFtpZF0sIG5ld1RpbGUpO1xuICAgICAgICB0aGlzLnVwZGF0ZUJvYXJkKG5ld0JvYXJkKTtcbiAgICB9LFxuXG4gICAgdXBkYXRlQm9hcmQ6IGZ1bmN0aW9uIHVwZGF0ZUJvYXJkKGJvYXJkKSB7XG4gICAgICAgIHRoaXMuYm9hcmQgPSBib2FyZDtcbiAgICAgICAgdGhpcy50cmlnZ2VyKGJvYXJkKTsgLy8gc2VuZHMgdGhlIHVwZGF0ZWQgYm9hcmQgdG8gYWxsIGxpc3RlbmluZyBjb21wb25lbnRzIChHYW1lQm9hcmQpXG4gICAgfVxuXG59KTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gU3RvcmU7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUJvYXJkU3RvcmUuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxudmFyIF9BY3Rpb25zQWN0aW9ucyA9IHJlcXVpcmUoJy4vLi4vQWN0aW9ucy9BY3Rpb25zJyk7XG5cbnZhciBfQWN0aW9uc0FjdGlvbnMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQWN0aW9uc0FjdGlvbnMpO1xuXG52YXIgU3RvcmUgPSBSZWZsdXguY3JlYXRlU3RvcmUoe1xuXG4gICAgbGlzdGVuYWJsZXM6IF9BY3Rpb25zQWN0aW9uczJbJ2RlZmF1bHQnXSxcblxuICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIHRoaXMudXNlcm5hbWUgPSAnZGltYWdpbWJ1cmcnO1xuICAgICAgICB0aGlzLnJvd3MgPSAyMDtcbiAgICAgICAgdGhpcy5jb2xzID0gMjA7XG4gICAgICAgIHRoaXMuZ2FtZU92ZXIgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5sZXZlbCA9IDE7XG4gICAgICAgIHRoaXMubWluZXMgPSBwYXJzZUludCh0aGlzLnJvd3MgKiB0aGlzLmNvbHMgKiAoMSAvICg2IC0gdGhpcy5sZXZlbCkpKTtcbiAgICAgICAgdGhpcy5mbGFncyA9IHRoaXMubWluZXM7XG4gICAgICAgIHRoaXMuZ2FtZU9uID0gZmFsc2U7XG4gICAgICAgIHRoaXMud2luID0gZmFsc2U7XG4gICAgfSxcblxuICAgIHVwZGF0ZU1pbmVzOiBmdW5jdGlvbiB1cGRhdGVNaW5lcygpIHtcbiAgICAgICAgdGhpcy5taW5lcyA9IHBhcnNlSW50KHRoaXMucm93cyAqIHRoaXMuY29scyAqICgxIC8gKDYgLSB0aGlzLmxldmVsKSkpO1xuICAgIH0sXG5cbiAgICBnZXRHYW1lOiBmdW5jdGlvbiBnZXRHYW1lKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2FtZU92ZXI6IHRoaXMuZ2FtZU92ZXIsXG4gICAgICAgICAgICBnYW1lT246IHRoaXMuZ2FtZU9uLFxuICAgICAgICAgICAgZmxhZ3M6IHRoaXMuZmxhZ3MsXG4gICAgICAgICAgICBtaW5lczogdGhpcy5taW5lcyxcbiAgICAgICAgICAgIGxldmVsOiB0aGlzLmxldmVsLFxuICAgICAgICAgICAgY29sczogdGhpcy5jb2xzLFxuICAgICAgICAgICAgcm93czogdGhpcy5yb3dzLFxuICAgICAgICAgICAgd2luOiB0aGlzLndpblxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBnZXRGbGFnc0NvdW50OiBmdW5jdGlvbiBnZXRGbGFnc0NvdW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5mbGFncztcbiAgICB9LFxuXG4gICAgaXNHYW1lT3ZlcjogZnVuY3Rpb24gaXNHYW1lT3ZlcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2FtZU92ZXI7XG4gICAgfSxcblxuICAgIG9uR2FtZU92ZXI6IGZ1bmN0aW9uIG9uR2FtZU92ZXIoKSB7XG4gICAgICAgIHRoaXMuZ2FtZU92ZXIgPSB0cnVlO1xuICAgICAgICB0aGlzLnVwZGF0ZUdhbWUoKTtcbiAgICB9LFxuXG4gICAgb25OZXdHYW1lOiBmdW5jdGlvbiBvbk5ld0dhbWUoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlTWluZXMoKTtcbiAgICAgICAgdGhpcy5nYW1lT3ZlciA9IGZhbHNlO1xuICAgICAgICB0aGlzLmdhbWVPbiA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZsYWdzID0gdGhpcy5taW5lcztcbiAgICAgICAgdGhpcy51cGRhdGVHYW1lKCk7XG4gICAgfSxcblxuICAgIG9uUmVkdWNlRmxhZ3NDb3VudDogZnVuY3Rpb24gb25SZWR1Y2VGbGFnc0NvdW50KCkge1xuICAgICAgICB0aGlzLmZsYWdzLS07XG4gICAgICAgIHRoaXMudXBkYXRlR2FtZSgpO1xuICAgIH0sXG5cbiAgICBvbkluY3JlYXNlRmxhZ3NDb3VudDogZnVuY3Rpb24gb25JbmNyZWFzZUZsYWdzQ291bnQoKSB7XG4gICAgICAgIHRoaXMuZmxhZ3MrKztcbiAgICAgICAgdGhpcy51cGRhdGVHYW1lKCk7XG4gICAgfSxcblxuICAgIG9uR2FtZU9uOiBmdW5jdGlvbiBvbkdhbWVPbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmdhbWVPbikge1xuICAgICAgICAgICAgdGhpcy5nYW1lT24gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVHYW1lKCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgb25JbmNyZWFzZUxldmVsOiBmdW5jdGlvbiBvbkluY3JlYXNlTGV2ZWwoKSB7XG4gICAgICAgIGlmICh0aGlzLmxldmVsIDwgNCkge1xuICAgICAgICAgICAgdGhpcy5sZXZlbCsrO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVNaW5lcygpO1xuICAgICAgICAgICAgX0FjdGlvbnNBY3Rpb25zMlsnZGVmYXVsdCddLm5ld0dhbWUoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvbkRlY3JlYXNlTGV2ZWw6IGZ1bmN0aW9uIG9uRGVjcmVhc2VMZXZlbCgpIHtcbiAgICAgICAgaWYgKHRoaXMubGV2ZWwgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLmxldmVsLS07XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZU1pbmVzKCk7XG4gICAgICAgICAgICBfQWN0aW9uc0FjdGlvbnMyWydkZWZhdWx0J10ubmV3R2FtZSgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uQ29sc0NoYW5nZWQ6IGZ1bmN0aW9uIG9uQ29sc0NoYW5nZWQoY29scykge1xuICAgICAgICB0aGlzLmNvbHMgPSBOdW1iZXIoY29scyk7XG4gICAgICAgIF9BY3Rpb25zQWN0aW9uczJbJ2RlZmF1bHQnXS5uZXdHYW1lKCk7XG4gICAgfSxcblxuICAgIG9uUm93c0NoYW5nZWQ6IGZ1bmN0aW9uIG9uUm93c0NoYW5nZWQocm93cykge1xuICAgICAgICB0aGlzLnJvd3MgPSBOdW1iZXIocm93cyk7XG4gICAgICAgIF9BY3Rpb25zQWN0aW9uczJbJ2RlZmF1bHQnXS5uZXdHYW1lKCk7XG4gICAgfSxcblxuICAgIG9uV2luR2FtZTogZnVuY3Rpb24gb25XaW5HYW1lKCkge1xuICAgICAgICB0aGlzLndpbiA9IHRydWU7XG4gICAgICAgIF9BY3Rpb25zQWN0aW9uczJbJ2RlZmF1bHQnXS5nYW1lT3ZlcigpO1xuICAgIH0sXG5cbiAgICB1cGRhdGVHYW1lOiBmdW5jdGlvbiB1cGRhdGVHYW1lKCkge1xuICAgICAgICB0aGlzLnRyaWdnZXIodGhpcy5nZXRHYW1lKCkpO1xuICAgIH1cblxufSk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IFN0b3JlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG4vLyMgc291cmNlTWFwcGluZ1VSTD1HYW1lU3RvcmUuanMubWFwXG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgVXRpbGl0aWVzID0gKGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuXG4gICAgICAgIGNyZWF0ZUJvYXJkVHdvRGltZW5zaW9uYWw6IGZ1bmN0aW9uIGNyZWF0ZUJvYXJkVHdvRGltZW5zaW9uYWwodGlsZXMsIG51bWJlck9mUm93cykge1xuICAgICAgICAgICAgdmFyIGxlbmd0aCA9IHRpbGVzLnNpemUgfHwgdGlsZXMubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gbnVtYmVyT2ZSb3dzKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godGlsZXMuc2xpY2UoaSwgaSArIG51bWJlck9mUm93cykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIEltbXV0YWJsZS5mcm9tSlMocmVzdWx0KTtcbiAgICAgICAgfSxcblxuICAgICAgICBnZXREZWZhdWx0Qm9hcmQ6IGZ1bmN0aW9uIGdldERlZmF1bHRCb2FyZChyb3dzLCBjb2xzLCBtaW5lcykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5pdEJvYXJkKHJvd3MsIGNvbHMsIG1pbmVzKTtcbiAgICAgICAgfSxcblxuICAgICAgICBpbml0Qm9hcmQ6IGZ1bmN0aW9uIGluaXRCb2FyZChyb3dzLCBjb2xzLCBudW1iZXJPZk1pbmVzKSB7XG4gICAgICAgICAgICB2YXIgbWluZXMgPSB0aGlzLmNyZWF0ZU1pbmVzKG51bWJlck9mTWluZXMpO1xuICAgICAgICAgICAgdmFyIHRpbGVzID0gdGhpcy5jcmVhdGVUaWxlcyhyb3dzLCBjb2xzLCBudW1iZXJPZk1pbmVzKTtcbiAgICAgICAgICAgIHZhciBzaHVmZmxlZCA9IF8uc2h1ZmZsZShtaW5lcy5jb25jYXQodGlsZXMpLnRvSlMoKSk7XG4gICAgICAgICAgICByZXR1cm4gSW1tdXRhYmxlLmZyb21KUyhzaHVmZmxlZCkubWFwKGZ1bmN0aW9uICh0aWxlLCBpZHgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGlsZS5zZXQoJ2lkJywgaWR4KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZU1pbmVzOiBmdW5jdGlvbiBjcmVhdGVNaW5lcyhudW1iZXJPZk1pbmVzKSB7XG4gICAgICAgICAgICB2YXIgbWluZXMgPSBbXTtcbiAgICAgICAgICAgIHdoaWxlIChudW1iZXJPZk1pbmVzLS0pIHtcbiAgICAgICAgICAgICAgICBtaW5lcy5wdXNoKEltbXV0YWJsZS5NYXAoeyBpc01pbmU6IHRydWUsIGlzUmV2ZWFsZWQ6IGZhbHNlLCBtaW5lc0Fyb3VuZDogMCwgaXNGbGFnOiBmYWxzZSB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gSW1tdXRhYmxlLkxpc3QobWluZXMpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGNyZWF0ZVRpbGVzOiBmdW5jdGlvbiBjcmVhdGVUaWxlcyhyb3dzLCBjb2xzLCBudW1iZXJPZk1pbmVzKSB7XG4gICAgICAgICAgICB2YXIgbnVtYmVyT2ZUaWxlcyA9IHJvd3MgKiBjb2xzIC0gbnVtYmVyT2ZNaW5lcztcbiAgICAgICAgICAgIHZhciB0aWxlcyA9IFtdO1xuICAgICAgICAgICAgd2hpbGUgKG51bWJlck9mVGlsZXMtLSkge1xuICAgICAgICAgICAgICAgIHRpbGVzLnB1c2goSW1tdXRhYmxlLk1hcCh7IGlzTWluZTogZmFsc2UsIGlzUmV2ZWFsZWQ6IGZhbHNlLCBtaW5lc0Fyb3VuZDogMCwgaXNGbGFnOiBmYWxzZSB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gSW1tdXRhYmxlLkxpc3QodGlsZXMpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldERpcmVjdGlvbnM6IGZ1bmN0aW9uIGdldERpcmVjdGlvbnMoKSB7XG4gICAgICAgICAgICByZXR1cm4gWyduJywgJ3MnLCAnZScsICd3JywgJ25lJywgJ253JywgJ3NlJywgJ3N3J107XG4gICAgICAgIH1cblxuICAgIH07XG59KSgpO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBVdGlsaXRpZXM7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVV0aWxzLmpzLm1hcFxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciBfQ29tcG9uZW50c1Njb3JlQm9hcmQgPSByZXF1aXJlKCcuLy4uL0NvbXBvbmVudHMvU2NvcmVCb2FyZCcpO1xuXG52YXIgX0NvbXBvbmVudHNTY29yZUJvYXJkMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0NvbXBvbmVudHNTY29yZUJvYXJkKTtcblxudmFyIF9Db21wb25lbnRzR2FtZUJvYXJkID0gcmVxdWlyZSgnLi8uLi9Db21wb25lbnRzL0dhbWVCb2FyZCcpO1xuXG52YXIgX0NvbXBvbmVudHNHYW1lQm9hcmQyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfQ29tcG9uZW50c0dhbWVCb2FyZCk7XG5cbnZhciBSZWZsdXhTd2VlcGVyID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIGRpc3BsYXlOYW1lOiAnUmVmbHV4U3dlZXBlcicsXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoXG4gICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KFxuICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgJ01pbmVzU3dlZXBlciBWZXIgMC4wLjEnXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChfQ29tcG9uZW50c1Njb3JlQm9hcmQyWydkZWZhdWx0J10sIG51bGwpLFxuICAgICAgICAgICAgUmVhY3QuY3JlYXRlRWxlbWVudChfQ29tcG9uZW50c0dhbWVCb2FyZDJbJ2RlZmF1bHQnXSwgbnVsbClcbiAgICAgICAgKTtcbiAgICB9XG59KTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gUmVmbHV4U3dlZXBlcjtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UmVmbHV4U3dlZXBlci5qcy5tYXBcbiJdfQ==
