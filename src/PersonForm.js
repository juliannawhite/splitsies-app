import React from "react"

export default function PersonForm(props) {

    const [formData, setFormData] = React.useState(
        {personName: "", 
        personPrice: 0}
    )

    function handleChange(event) {
        const {name, value, type, checked} = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.onFormSubmit({
            name: formData.personName,
            price: 0, 
            contributedTo: [], 
            displayPrice: 0
        });
        setFormData({
            personName: "",
            personPrice: ""
        });
    }
    
    const handleClose = () => {
      props.setScreen("main");
    }
    
    const handleBack = () => {
      props.setScreen("editForm");
    }

  return (
    <div className="modal">
    <div className="modalContent">
        <div className="personContainer whiteBackground">
        <button className="backToEditForm" onClick={handleBack}><i className="fa-solid fa-arrow-left"></i></button>
          <button className = "closeForms" onClick={handleClose}><i className="fa-regular fa-x"></i></button>
        </div>
     <form className="itemForm">
     <h2>New Person</h2>
         <hr />
         <br /><br />
            <input
                type="text"
                placeholder="Person Name"
                name="personName"
                value={formData.personName}
                onChange={handleChange}
            />
            <br /> <br /><br />
            <button onClick={handleSubmit}>Add Person</button>
        </form>
        </div></div>
  )
}