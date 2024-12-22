import { Component } from 'react';
import Button from '../button/button';
import './App.css';
import NotificationService, { movePlayed } from '../services/notification-service';


const ns = new NotificationService();

class App extends Component {

  constructor(props) {
    super(props);
    this.buttons = this.buttons.bind(this);
    this.handlePlayed = this.handlePlayed.bind(this);
    this.onMovePlayed = this.onMovePlayed.bind(this);
    this.state = { status: 'X', num: 0, moves: [0, 1, 2, 3, 4, 5, 6, 7, 8] };

  }
  componentDidMount() {
    ns.addObserver(movePlayed, this, this.onMovePlayed);
  }

  componentWillUnmount() {
    ns.removeObserver(movePlayed, this);
  }

  onMovePlayed = (play) => {
    console.log("BUTTON", play);
    console.log("mvoe", this.state.moves)
    this.setState({ moves: this.state.moves[parseInt(play.position)] = play.value }, () => {
      console.log(this.state.moves);
    })

    // const lines = [
    //   [0, 1, 2],
    //   [3, 4, 5],
    //   [6, 7, 8],
    //   [0, 3, 6],
    //   [1, 4, 7],
    //   [2, 5, 8],
    //   [0, 4, 8],
    //   [2, 4, 6],
    // ];
    // for (let i = 0; i < lines.length; i++) {
    //   const [a, b, c] = lines[i];
    //   if (values[a] && values[a] === values[b] && values[a] === values[c]) {
    //     return values[a];
    //   }
    // }
    // return null;
  }

  buttons() {
    let allButtons = [];
    for (var i = 1; i < 10; i++) {
      let name = `b${i}`;
      console.log(name);
      allButtons.push(<Button type={name} key={i}
        num={this.state.num} status={this.state.status} handlePlay={this.handlePlayed}>
      </Button >
      );
    }
    return (allButtons);
  }

  handlePlayed() {
    var self = this;
    self.setState({ num: this.state.num + 1 }, () => {
      console.log(this.state.num)
      if (this.state.num % 2 === 0) {
        self.setState({ status: 'X' }, () => {
          console.log(this.state.num);
        });
      }
      else {
        self.setState({ status: 'O' }, () => {
          console.log(this.state.num);
        }
        );
      }
      console.log(this.state)
    }
    );
  }

  render() {

    return (
      <div className="App">
        <div className='board'>
          {this.buttons()}
        </div>
      </div>
    );
  }
}
export default App;
