import BoardActions from '../Actions/Actions';
import BoardStore from '../Stores/BoardStore';
import GameStore from '../Stores/GameStore';
import BoardPiece from './BoardPiece';
import Utilities from '../Utils';

let GameBoard = React.createClass({

    getInitialState() {
        return {
            board: BoardStore.getBoard()
        };
    },

    componentDidMount() {
        this.unsubscribe = BoardStore.listen(this.onBoardChange);
    },

    componentWillUnmount() {
        this.unsubscribe();
    },

    shouldComponentUpdate: function(nextProps,nextState){
        return nextState.board !== this.state.board;
    },

    onBoardChange(board) {
        this.setState({
            board : board
        });
    },

    render() {
        return (
            <div>
                {
                    Utilities
                        .createBoardTwoDimensional(this.state.board,GameStore.cols)
                        .toJS()
                        .map(function(a){
                            return (
                                <div>
                                    {
                                        a.map(function(piece){
                                            return <BoardPiece id={piece.id} isMine={piece.isMine} isRevealed={piece.isRevealed} minesAround={piece.minesAround} isFlag={piece.isFlag} />;
                                        })
                                    }
                                </div>
                            );
                        })
                }
            </div>
        );
    }
});

export default GameBoard;