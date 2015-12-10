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
//# sourceMappingURL=Utils.js.map
