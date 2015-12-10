'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _StoresBoardStore = require('../Stores/BoardStore');

var _StoresBoardStore2 = _interopRequireDefault(_StoresBoardStore);

var _ScoreBoard = require('./ScoreBoard');

var _ScoreBoard2 = _interopRequireDefault(_ScoreBoard);

var _ViewsGameBoard = require('./../Views/GameBoard');

var _ViewsGameBoard2 = _interopRequireDefault(_ViewsGameBoard);

var BattleShips = React.createClass({
    displayName: 'BattleShips',

    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'div',
                null,
                'MinesSweeper Ver 0.0.1'
            ),
            React.createElement(_ScoreBoard2['default'], null),
            React.createElement(_ViewsGameBoard2['default'], null)
        );
    }
});

exports['default'] = BattleShips;
module.exports = exports['default'];
//# sourceMappingURL=RefluxSweeper.js.map
