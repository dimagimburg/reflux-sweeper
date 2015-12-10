import BoardStore from '../Stores/BoardStore';
import BoardActions from '../Actions/Actions';
import GameStore from '../Stores/GameStore';

let BoardPiece = React.createClass({

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

    shouldComponentUpdate: function(nextProps,nextState){
        return this.props.isRevealed !== nextProps.isRevealed
            || nextProps.isFlag !== this.props.isFlag;
    },

    revealTile: function(){
        if(!this.props.isFlag && !this.props.isRevealed && !GameStore.isGameOver()){
            BoardActions.revealTile(this.props.id);
        }
    },

    toggleFlag(e) {
        e.preventDefault();
        if(!this.props.isRevealed && (GameStore.getFlagsCount() || this.props.isFlag) && !GameStore.isGameOver()){
            BoardActions.toggleFlag(this.props.id);
        }
    },

    render() {
        var classes = classNames({
            'board-piece': true,
            'revealed-mine': this.props.isRevealed && this.props.isMine,
            'revealed-tile': this.props.isRevealed && !this.props.isMine,
            'safe' : this.props.isRevealed && !this.props.isMine && !this.props.minesAround,
            'flag' : this.props.isFlag
        });

        return (
            <div className={classes} onClick={this.revealTile} onContextMenu={this.toggleFlag}>{this.props.minesAround ? this.props.minesAround : ''}</div>
        );
    }
});

export default BoardPiece;