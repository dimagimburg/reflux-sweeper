import Actions from '../Actions/Actions';
import GameStore from '../Stores/GameStore';

let ScoreBoard = React.createClass({

    getInitialState(){
        return GameStore.getGame();
    },

    componentDidMount() {
        this.unsubscribe = GameStore.listen(this.onChange);
    },

    componentWillUnmount() {
        this.unsubscibe();
    },

    onChange(game){
        this.setState(game);
    },

    newGame(){
        Actions.newGame();
    },

    increaseLevel() {
        Actions.increaseLevel();
    },

    decreaseLevel() {
        Actions.decreaseLevel();
    },

    colsChanged(e) {
        Actions.colsChanged(e.target.value);
    },

    rowsChanged(e) {
        Actions.rowsChanged(e.target.value);
    },

    render() {
        return (
            <div>
                <div>Hi {GameStore.username}, {this.state.gameOver &&  this.state.win ? 'You are TIGGER!!' : (this.state.gameOver &&  !this.state.win ? 'LOSER!!' : 'GOOD LUCK!')}</div>
                <div>
                    Number of columns: <input id="cols" type="number" value={this.state.cols} onChange={this.colsChanged} /> <br/>
                    Number of rows: <input id="rows" type="number" value={this.state.rows} onChange={this.rowsChanged} /> <br/>
                    Number tiles: {this.state.cols * this.state.rows} <br/>
                    Game Level: <img className="level-img" src={'/images/level-' + this.state.level + '.png'}/> {!this.state.gameOn ? <span><button onClick={this.increaseLevel}>+</button><button onClick={this.decreaseLevel}>-</button></span> : ''},<br />
                    Number of mines: {this.state.mines},<br />
                    Number of Flags remained: {this.state.flags}
                </div>
                <div>
                    <button onClick={this.newGame}>New Game</button>
                </div>
            </div>
        );
    }
});

export default ScoreBoard;