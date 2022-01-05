import React from "react"
import Board from './Board'
import Square from "./Square";



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
        const  = cron[cron.length - 1];
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

      jumpTo(step) {
        this.setState({
          stepNumber: step,
          xIsNext: (step % 2) === 0
        });
      }

      vincita(squares) {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }
        return null;
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

