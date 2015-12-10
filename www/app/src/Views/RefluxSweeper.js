import ScoreBoard from './../Components/ScoreBoard';
import GameBoard from './../Components/GameBoard';
let RefluxSweeper = React.createClass({

    render() {
        return (
            <div>
                <div>MinesSweeper Ver 0.0.1</div>
                <ScoreBoard />
                <GameBoard />
            </div>
        );
    }
});

export default RefluxSweeper;