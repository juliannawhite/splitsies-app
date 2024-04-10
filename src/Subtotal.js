import React from "react"

export default function Subtotal(props) {
  return (
    <div className="subtotal">
      <h1>Subtotal: ${props.subtotal.toFixed(2)} </h1>
          {props.isDone && <h1>Tax: ${parseFloat(props.tax).toFixed(2)} </h1>}
              
          {props.isDone && <h1>Tip: ${parseFloat(props.tip).toFixed(2)} </h1>}
              
          {props.isDone && <h1>Total: ${parseFloat(props.total).toFixed(2)} </h1>}
    </div>
  )
}