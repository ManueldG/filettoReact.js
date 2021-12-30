import React from "react"
import './Square.css'

class Square extends React.Component {
    render() {
        return (
            <button className="square" onClick={()=>{console.log(this.props.value)}}>
                {this.props.value}
            </button>
        );
    }
}

export default Square;

