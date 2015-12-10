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
//# sourceMappingURL=BoardPiece.js.map
