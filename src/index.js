import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './Board.css';
import './Square.css';




function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}


class Board extends React.Component { 

  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {   
    
    return (
      <div>
        
        <div className="board">
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
        
      </div>
    );
  }
}

/**
 * Game
 */
class Game extends React.Component {

  constructor(props) {
      super(props);
  
      this.state = {

        cron:[
                {
                  squares: Array(9).fill(null) //scacchiera 
                }
              ], // cronologia mosse
        
        next: true, // prossimo giocatore X?    
        stepNumber: 0      
        
      }
      console.log("constructor",this.state);
    }

    
    handleClick(i){
      console.log("click",this.state);
      const cron = this.state.cron.slice(0,this.state.stepNumber + 1);
      const current = cron[cron.length - 1];
      const squares = current.squares.slice(); // copia dati in squares
      console.log("click2",this.state);
      if (squares[i] || vincita(squares))
        return;
    
      squares[i] = this.state.next ? 'X' : 'O';

      this.setState({
        cron : cron.concat([
          {
            squares:squares
          }
      ]),
        next : !this.state.next,
        stepNumber: cron.length,
        
      });
      

  }

  jumpTo(step) {
    console.log(this.state);
    this.setState({
      stepNumber: step,
      next: (step % 2) === 0
    });
  }   
  
  render() {      
      
      const cron = this.state.cron;
      const current = cron[this.state.stepNumber];
      const winner = vincita(current.squares);   
      console.log("render",this.state);
      let status;

      if (winner) {     
          status = 'Winner: ' + winner;
      } else {      
          status = 'Next player: ' + (this.state.next ? 'X' : 'O');    
        }       

      const moves = cron.map((val,index)=>{
        const txt = val ? 'ritorna alla mossa '+ index : 'ricomincia';
        return (
          <li key={index}>
              <button onClick={() => this.jumpTo(index)}>{txt}</button>
          </li>
          )
        }

      )

      return(
      <div className="game">
          <div className="game-board">
            {status}
              <Board 
              squares={current.squares} 
              onClick={(i) => this.handleClick(i)}
              />
          </div>
          <div className="game-info">
            
              <div>

              </div>
              <ol>
                {moves}
              </ol>
          </div>
      </div>
      )
  }
}



ReactDOM.render(  

    <Game />
  ,
  document.getElementById('root')
)

function vincita(squares){
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


