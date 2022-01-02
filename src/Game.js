import React from "react"
import Board from './Board'
import Square from "./Square";

class Game extends React.Component {

    constructor(props) {
        super(props);
    
        this.state = {
          squares: Array(9).fill(null),
          next: true,
          cron:[],
          
        }
      }

      handleClick(i){

        const squares = this.state.squares.slice();  
        const cron = this.state.cron.slice();
      
        cron.push(squares);
      
        console.log(cron);
        if (squares[i])
          return;
      
        squares[i] = this.state.next ? 'X' : 'O';
        this.setState({
          next : !this.state.next,
          cron : cron.concat([{squares:squares}]),
        });

    }

      vincita(){
        const matrix = this.state.squares;
        
        /*for (let i = 0; i < matrix.length; i++)
          console.log(matrix,matrix[i],i,i%4? "no" :"ok"); */
    
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
            if (matrix[a] && matrix[a] === matrix[b] && matrix[a] === matrix[c]) {
              return matrix[a];
            }
          }
          return null;
            
      }

      renderSquare(i) {
    
        return (
        <Square value={this.props.squares[i]} onClick={()=>{this.props.onClick(i)}}/>
        );
    
      }
    
    render() {

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

