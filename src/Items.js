import React from "react"

export default function Items(props) {
  return (
      <div className="whiteBackground">
  <div className="item smallerFont">
    <span>{props.name} ${parseFloat(props.price).toFixed(2)}</span> 
    <button className="trash" onClick={props.trash}> <i className="fa-solid fa-trash"></i></button>
        </div>
          <hr className="lighter" />
  </div>)
}