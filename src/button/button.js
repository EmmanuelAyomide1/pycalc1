import { Component } from 'react';
import './button.css';
import NotificationService, { movePlayed } from '../services/notification-service';

const ns = new NotificationService();
class Button extends Component {

    constructor(props) {
        super(props);

        this.state = { clicked: false, status: '' }
    }

    handlePlay = () => {
        this.setState({ clicked: true, status: this.props.status });
        this.props.handlePlay();
        ns.postNotification(movePlayed, { position: this.props.type[1], value: this.props.status })
    }

    render() {
        return (
            <div className="Button">
                <button disabled={
                    this.state.clicked
                } className={this.props.type} onClick={() => this.handlePlay()}>{this.state.clicked ? this.state.status : ''}</button>
            </div>
        );
    }
}
export default Button;
