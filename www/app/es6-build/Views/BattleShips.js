'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _StoresBoardStore = require('../Stores/BoardStore');

var _StoresBoardStore2 = _interopRequireDefault(_StoresBoardStore);

var _ComponentsScoreBoard = require('./../Components/ScoreBoard');

var _ComponentsScoreBoard2 = _interopRequireDefault(_ComponentsScoreBoard);

var _ComponentsGameBoard = require('./../Components/GameBoard');

var _ComponentsGameBoard2 = _interopRequireDefault(_ComponentsGameBoard);

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
            React.createElement(_ComponentsScoreBoard2['default'], null),
            React.createElement(_ComponentsGameBoard2['default'], null)
        );
    }
});

exports['default'] = BattleShips;
module.exports = exports['default'];
//# sourceMappingURL=BattleShips.js.map
