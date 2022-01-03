import React from "react"
import Board from './Board'
import Square from "./Square";


class Game extends React.Component {
  

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

/******************************** */

class Game extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {

          cron:[
            {
            squares: Array(9).fill(null)//scacchiera 
          }
        ], // cronologia mosse
          
          next: true, // prossimo giocatore X?    
          stepNumber: 0      
          
        }
      }

      handleClick(i){

        const squares = this.state.squares.slice(); // copia dati in squares
        const current = cron[cron.length - 1];
        const cron = this.state.cron.slice(0,this.state.stepNumber + 1);
         
        if (squares[i] || this.vincita(squares))
          return;
      
        squares[i] = this.state.next ? 'X' : 'O';

        this.setState({
          cron : cron.concat([{
            squares:squares
          }
        ]),
          next : !this.state.next,
          stepNumber: cron.length,
          
        });
        console.log(this.state);

    }
      renderSquare(i) {
    
        return (
        <Square value={this.props.squares[i]} onClick={()=>{this.props.onClick(i)}}/>
        );
    
      }
    
    render() {
        console.log(this.state.cron);
        const cron = this.state.cron;
        const current = cron[cron.length - 1];
        const winner = this.vincita(current.squares);   
        let status;
        if (winner) {     
            status = 'Winner: ' + winner;
        } else {      
            status = 'Next player: ' + (this.state.next ? 'X' : 'O');    }

        return(
        <div className="game">
            <div className="game-board">
                <Board 
                squares={current.squares} 
                onClick={(i) => this.handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div>

                </div>
                <ol>

                </ol>
            </div>
        </div>
        )
    }
}

export default Game

