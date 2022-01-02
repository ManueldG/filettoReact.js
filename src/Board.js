import React from "react" ;
import Square from './Square';
import './Board.css'




class Board extends React.Component { 

  

  render() {
    
    const cron = this.state.cron.map(
      (elem,ind)=>
        <div key={elem.toString()}>mossa {ind}</div>
    );
    
    console.log(this.vincita());
    return (
      <div>
        <div className="status">Next player:{ this.state.next? 'X' : 'O' }</div>
        <div className="status">{ this.vincita() ? 'the winner is '+this.vincita() : '' }</div>
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
        <div className="cron">
          {cron}
        </div>
      </div>
    );
  }
}



export default Board;