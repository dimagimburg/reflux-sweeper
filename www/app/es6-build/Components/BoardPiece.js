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
//# sourceMappingURL=BoardPiece.js.map
