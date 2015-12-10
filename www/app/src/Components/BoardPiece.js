import BoardStore from '../Stores/BoardStore';
import BoardActions from '../Actions/Actions';
import GameStore from '../Stores/GameStore';

let BoardPiece = React.createClass({

    propTypes: {
        id: React.PropTypes.number.isRequired,
        isMine: React.PropTypes.bool.isRequired,
        isRevealed: React.PropTypes.bool.isRequired,
        minesAround: React.PropTypes.number.isRequired,
        isFlag: React.PropTypes.bool.isRequired
    },

    shouldComponentUpdate: function(nextProps,nextState){
        return this.props.piece.isRevealed !== nextProps.isRevealed
            || nextProps.isFlag !== this.props.piece.isFlag;
    },

    revealTile: function(){
        if(!this.props.piece.isFlag && !this.props.piece.isRevealed && !GameStore.isGameOver()){
            BoardActions.revealTile(this.props.piece.id);
        }
    },

    toggleFlag(e) {
        e.preventDefault();
        if(!this.props.piece.isRevealed && (GameStore.getFlagsCount() || this.props.piece.isFlag) && !GameStore.isGameOver()){
            BoardActions.toggleFlag(this.props.piece.id);
        }
    },

    render() {
        var classes = classNames({
            'board-piece': true,
            'revealed-mine': this.props.piece.isRevealed && this.props.piece.isMine,
            'revealed-tile': this.props.piece.isRevealed && !this.props.piece.isMine,
            'safe' : this.props.piece.isRevealed && !this.props.piece.isMine && !this.props.piece.minesAround,
            'flag' : this.props.piece.isFlag
        });

        return (
            <div className={classes} onClick={this.revealTile} onContextMenu={this.toggleFlag}>{this.props.piece.minesAround ? this.props.piece.minesAround : ''}</div>
        );
    }
});

export default BoardPiece;