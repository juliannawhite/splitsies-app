import React from "react"
import ItemizedInfo from "./ItemizedInfo"

export default function People(props) {
    const itemizedElems = props.contributedTo.map(itemInfo => (
        <ItemizedInfo 
            key={itemInfo[0]}
            id={itemInfo[0]}
            name={itemInfo[1]}
            perPerson={itemInfo[2]}
            />
    ))
  return (
    <div className="whiteBackground">
          <div className="person">
                <h2>{props.name}</h2>
              <p className="whiteBackground">${props.price.toFixed(2)}</p>
          </div>
          <hr />
          <div className = "whiteBackground">
              {props.isItemized && itemizedElems}
         </div>
  </div>)
}