Array.createTwoDimentionalArray = function(numberOfRows,numberOfCols){
    var i,j;

    var array = new Array(numberOfCols);

    for(i = 0; i < numberOfRows; i++) {
        array[i] = new Array(numberOfRows);
    }

    return array;
};