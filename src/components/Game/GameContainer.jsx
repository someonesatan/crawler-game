import React, { Component } from 'react';
import { connect } from 'react-redux';
import Game from './Game';
import { moveTo } from '../../redux/characterReducer';
import CONSTANTS from '../../data/constants';
import { loadLevel } from '../../redux/gameReducer';

function mapStateToProps(state) {
    return {
        position: state.character.position,
    };
}

let mapDispatchToProps = {
    moveTo, loadLevel
};

class GameContainer extends Component {
    constructor(props) {
        super(props);
        this.handleKeydown = this.handleKeydown.bind(this);
        this.reservedKeys = [37, 38, 39, 40];
    }

    componentDidMount() {
        // load firs level
        this.props.loadLevel(1);
        // bad solution for architecture
        window.addEventListener('keydown', this.handleKeydown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeydown);
    }

    render() {
        return <Game />;
    }

    /**
     * @function calculatePosition
     * @param {Array} prevPosition [x,y]
     * @param {string} direction  (W,N,E,S)
     * @retruns {Array} newPosition [x,y]
     * */
    calculateNewPosition(prevPosition, direction) {
        let newPosition = [...prevPosition];
        switch (direction) {
            case 'W':
                if (prevPosition[0] > 0) {
                    newPosition[0] = prevPosition[0] - CONSTANTS.SPRITE_SIZE;
                    newPosition[1] = prevPosition[1];
                }
                return newPosition;
            case 'N':
                if (prevPosition[1] > 0) {
                    newPosition[0] = prevPosition[0];
                    newPosition[1] = prevPosition[1] - CONSTANTS.SPRITE_SIZE;

                }
                return newPosition;
            case 'E':
                if (prevPosition[0] < CONSTANTS.MAP_WIDTH - CONSTANTS.SPRITE_SIZE) {
                    newPosition[0] = prevPosition[0] + CONSTANTS.SPRITE_SIZE;
                    newPosition[1] = prevPosition[1];
                }
                return newPosition;
            case 'S': {
                if (prevPosition[1] < CONSTANTS.MAP_HEIGHT - CONSTANTS.SPRITE_SIZE) {
                    newPosition[0] = prevPosition[0];
                    newPosition[1] = prevPosition[1] + CONSTANTS.SPRITE_SIZE;
                }
                return newPosition;
            }
        }
        return newPosition;
    }

    validatePosition(position, ) {

    }
    /**
     * @param {string} direction (W,N,E,S)
     * @return {boolean} true if move was successful, false if not
     * */
    move(direction) {
        let result = true;
        let newPosition = this.calculateNewPosition(this.props.position, direction);
        if (newPosition.toString() !== this.props.position.toString()){
            this.props.moveTo(newPosition);
        } else {
            result = false;
        }
        return result;
    }

    handleKeydown(e) {
        if (this.reservedKeys.includes(e.keyCode)) {
            e.preventDefault();
            switch (e.keyCode) {
                case 37:
                    return this.move('W');
                case 38:
                    return this.move('N');
                case 39:
                    return this.move('E');
                case 40:
                    return this.move('S');
                default:
                    return console.log(e.keyCode);
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);