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
//# sourceMappingURL=GameBoard.js.map
