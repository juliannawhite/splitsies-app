import React from "react"

export default function TaxTip(props) {
    
    const [taxFormData, setTaxFormData] = React.useState(
        {
            tax: "", 
            tip: "", 
        }
    )
    
    const handleClose = () => {
      props.setScreen("main");
    }
    
    function handleChange(event) {
      const {name, value, type, checked} = event.target
        setTaxFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value
            }
        })
    }
    
    function handleSubmit(event) {
        event.preventDefault();
        props.onFormSubmit({
            tax: taxFormData.tax,
            tip: taxFormData.tip, 
        });
        setTaxFormData({
            tax: "",
            tip: ""
        });
        
    }
    
    return (
    <div className="modal">
    <div className="modalContent">
      <button className = "closeForms" onClick={handleClose}><i className="fa-regular fa-x"></i></button>
     <form className="itemForm">
     <h2>Tax + Tip </h2>
            Tip: $ 
         <input
                type="text"
                name="tax"
                value={taxFormData.tax}
                onChange={handleChange}
            />
            <br />
         Tax: $  
            <input
                type="text"
                name="tip"
                value={taxFormData.tip}
                onChange={handleChange}
            />
         <br />
            <button onClick={handleSubmit}>Submit</button>
        </form>
        </div>
      </div>
  )
}