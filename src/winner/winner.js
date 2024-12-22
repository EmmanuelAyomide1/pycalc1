import { Component } from 'react';
import './winner.css'

class Winner extends Component{
    constructor(props){
        super(props);
        this.getWinningText = this.getWinningText.bind(this);
    }

    getWinningText(winner){
        return `${winner} won`
    }


    render(){
        return(
            <div className={`banner ${this.props.winner}-banner`}>
                    <div className={`win-text`}> {this.getWinningText(this.props.winner)} </div>
            </div>
        );
    }

}

export default Winner