import React from "react"

export default function PersonForm(props) {

    function handleChange(event) {
        const {value} = event.target
        props.setNum(value)
    }

    function handleSubmit(event) {
        event.preventDefault()
        if (!(props.numJoining > 0 && props.numJoining < 100)) {
            alert("Please input a number between 1 and 100")
            return
        }
        props.onFormSubmit()
    }

  return (
    <div className="modal">
    <div id="startModal" className="modalContent">
     <form className="startForm whiteBackground">
     <h2>How many people are joining us today?</h2>
         <hr />
         <br /><br />
            <input
                type="number"
                name="numJoining"
                value={props.numJoining}
                onChange={handleChange}
            />
            <br /> <br /><br />
            <button onClick={handleSubmit}>Right this way <i className="fa-solid fa-arrow-right"></i></button>
        </form>
        </div></div>
  )
}