'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _ActionsBoardActions = require('../Actions/BoardActions');

var _ActionsBoardActions2 = _interopRequireDefault(_ActionsBoardActions);

var _StoresBoardStore = require('../Stores/BoardStore');

var _StoresBoardStore2 = _interopRequireDefault(_StoresBoardStore);

var _ComponentsBoardPiece = require('./../Components/BoardPiece');

var _ComponentsBoardPiece2 = _interopRequireDefault(_ComponentsBoardPiece);

var _Utils = require('../Utils');

var _Utils2 = _interopRequireDefault(_Utils);

function getBoard() {
    return {
        board: _StoresBoardStore2['default'].getBoard()
    };
}

var GameBoard = React.createClass({
    displayName: 'GameBoard',

    getInitialState: function getInitialState() {
        return getBoard();
    },

    componentDidMount: function componentDidMount() {
        this.unsubscribe = _StoresBoardStore2['default'].listen(this.onBoardChange);
    },

    componentWillUnmount: function componentWillUnmount() {
        this.unsubscribe();
    },

    shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
        // vs this.props && this.state
        return nextState.board !== this.state.board;
    },

    onBoardChange: function onBoardChange(board) {
        console.log('here');
        this.setState({
            board: board
        });
    },

    render: function render() {
        console.log('render board');
        return React.createElement(
            'div',
            null,
            _Utils2['default'].createBoardTwoDimensional(this.state.board, 30).toJS().map(function (a) {
                return React.createElement(
                    'div',
                    null,
                    a.map(function (piece) {
                        return React.createElement(_ComponentsBoardPiece2['default'], { id: piece.id, isMine: piece.isMine, isRevealed: piece.isRevealed, minesAround: piece.minesAround });
                    })
                );
            })
        );
    }
});

exports['default'] = GameBoard;
module.exports = exports['default'];
//# sourceMappingURL=GameBoard.js.map
