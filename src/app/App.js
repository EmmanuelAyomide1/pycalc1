import { Component } from 'react';
import Button from '../button/button';
import './App.css';
import NotificationService, { movePlayed, winMove } from '../services/notification-service';
import Winner from '../winner/winner';


const ns = new NotificationService();

class App extends Component {

  constructor(props) {
    super(props);
    this.buttons = this.buttons.bind(this);
    this.handlePlayed = this.handlePlayed.bind(this);
    this.onMovePlayed = this.onMovePlayed.bind(this);
    this.checkResult = this.checkResult.bind(this);
    this.winner = this.winner.bind(this);
    this.state = { status: 'X', num: 0, moves: [0, 1, 2, 3, 4, 5, 6, 7, 8] , winner: ''};

  }
  componentDidMount() {
    ns.addObserver(movePlayed, this, this.onMovePlayed);
  }

  componentWillUnmount() {
    ns.removeObserver(movePlayed, this);
  }

  checkResult = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    var moves = this.state.moves;
    console.log(moves[a])
    if (moves[a] && moves[a] === moves[b] && moves[a] === moves[c]) {
      console.log("win",moves[a])
      this.setState({winner: moves[a]});
      ns.postNotification(winMove,this.state.winner)
    }
  }
  return null;
  }

  onMovePlayed = (play) => {
    var curMove = [...this.state.moves]
    curMove[parseInt(play.position-1)] = play.value;
    this.setState({ moves: curMove }, () => {
      console.log(this.state.moves);
      this.checkResult();
  })
  }

  buttons() {
    let allButtons = [];
    for (var i = 1; i < 10; i++) {
      let name = `b${i}`;
      allButtons.push(<Button type={name} key={i}
        num={this.state.num} status={this.state.status} handlePlay={this.handlePlayed}>
      </Button >
      );
    }
    return (allButtons);
  }

  winner(){
    let  element ;
    if(this.state.winner){
      element = <Winner winner={this.state.winner}></Winner>;
    }
    console.log("runs");
    return (element);
  }

  handlePlayed() {
    var self = this;
    self.setState({ num: this.state.num + 1 }, () => {
      if (this.state.num % 2 === 0) {
        self.setState({ status: 'X' }, () => {
        });
      }
      else {
        self.setState({ status: 'O' }, () => {
        }
        );
      }
    }
    );
  }

  render() {

    return (
      <div className="App">
        <div className="winner">
        {this.winner()}
        </div>
        <div className='board'>
          {this.buttons()}
        </div>
      </div>
    );
  }
}
export default App;
