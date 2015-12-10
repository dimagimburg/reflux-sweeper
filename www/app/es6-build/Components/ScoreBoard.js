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
//# sourceMappingURL=ScoreBoard.js.map
