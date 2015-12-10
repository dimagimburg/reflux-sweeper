var Utilities = (function(){
    return {

        createBoardTwoDimensional: function(tiles,numberOfRows){
            var length = tiles.size || tiles.length;
            var result = [];
            for(var i = 0; i < length; i+=numberOfRows){
                result.push(tiles.slice(i, i + numberOfRows));
            }
            return Immutable.fromJS(result);
        },

        getDefaultBoard: function(rows, cols, mines) {
            return this.initBoard(rows, cols, mines);
        },

        initBoard: function(rows, cols, numberOfMines){
            let mines = this.createMines(numberOfMines);
            let tiles = this.createTiles(rows,cols,numberOfMines);
            let shuffled = _.shuffle(mines.concat(tiles).toJS());
            return Immutable.fromJS(shuffled).map(function(tile, idx){
                return tile.set('id',idx);
            });
        },

        createMines: function(numberOfMines){
            let mines = [];
            while(numberOfMines--){
                mines.push(Immutable.Map({isMine: true, isRevealed: false, minesAround: 0, isFlag: false}));
            }
            return Immutable.List(mines);
        },

        createTiles: function(rows,cols,numberOfMines){
            let numberOfTiles = (rows * cols) - numberOfMines;
            let tiles = [];
            while(numberOfTiles--){
                tiles.push(Immutable.Map({isMine: false, isRevealed: false, minesAround: 0, isFlag: false}));
            }
            return Immutable.List(tiles);
        },

        getDirections: function(){
            return ['n','s','e','w','ne','nw','se','sw'];
        }

    };
})();

export default Utilities;