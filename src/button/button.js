import { Component } from 'react';
import './button.css';
import NotificationService, { movePlayed, winMove } from '../services/notification-service';

const ns = new NotificationService();
class Button extends Component {

    constructor(props) {
        super(props);

        this.state = { clicked: false, status: '' }
        this.onWinMove = this.onWinMove.bind(this);
        this.decideClass = this.decideClass.bind(this);
    }

    componentDidMount() {
        ns.addObserver(winMove, this, this.onWinMove);
      }
    
    componentWillUnmount() {
        ns.removeObserver(winMove, this);
      }

    onWinMove = (data) => {
        this.setState({clicked: true});
    }
    

    handlePlay = () => {
        this.setState({ clicked: true, status: this.props.status });
        this.props.handlePlay();
        ns.postNotification(movePlayed, { position: this.props.type[1], value: this.props.status })
    }

    decideClass(){
        return `${this.props.type} ${this.state.status}`
    }

    render() {
        return (
            <div className="Button">
                <button disabled={
                    this.state.clicked
                } className={this.decideClass() } onClick={() => this.handlePlay()}>{this.state.clicked ? this.state.status : ''}</button>
            </div>
        );
    }
}
export default Button;
