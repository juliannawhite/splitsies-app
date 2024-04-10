import React from "react"

export default function ItemizedInfo(props) {
    return(
    <div className="whiteBackground">
            {props.name}: ${(props.perPerson).toFixed(2)}
        <hr className="lighter"/>
    </div>)
}