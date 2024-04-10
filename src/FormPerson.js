import React from "react"

export default function FormPerson(props) {
    return (
        <div className="whiteBackground">
    <div className="personForm"> 
        <button onClick={props.editName}>
            <i className="fa-solid fa-pencil">
            </i>
        </button>
        <span className="smallerFont">{props.name}</span>
            <br />
            </div>
            <hr className="lighter" />
            
            
    </div>)
}