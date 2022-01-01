import React from "react" ;
import Square from './Square'




class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      next: true,
    }
  }

 handleClick(i){
  const squares = this.state.squares.slice();
  squares[i] = this.state.next ? 'X' : 'O';
  this.setState({
    squares : squares,
    next : !this.state.next,
  });
 }

  renderSquare(i) {
    return (
    <Square value={this.state.squares[i]} onClick={()=>{this.handleClick(i)}}/>
    );
  }

  render() {
    
    

    return (
      <div>
        <div className="status">Next player:{ this.state.next? 'X' : 'O' }</div>
        <div className="board">
          <div className="board-row">
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            {this.renderSquare(3)}
          </div>
          <div className="board-row">
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            {this.renderSquare(6)}
          </div>
          <div className="board-row">
            {this.renderSquare(7)}
            {this.renderSquare(8)}
            {this.renderSquare(9)}
          </div>
        </div>
        
      </div>
    );
  }
}



export default Board;