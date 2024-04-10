import React from "react"

export default function ItemForm(props) {
    const [selectedPeople, setSelectedPeople] = React.useState([]);
    const [itemFormData, setItemFormData] = React.useState(
        {
            itemName: "", 
            itemCost: "", 
            people: selectedPeople
        }
    )
    const [isCheckedAll, setIsCheckedAll] = React.useState(false);

    function handleChange(event) {
        const {name, value, type, checked} = event.target
        setItemFormData(prevItemFormData => {
            return {
                ...prevItemFormData,
                [name]: type === "checkbox" ? checked : value
                }
        })
        if (type === "checkbox" && name!="selectAll") {
            const personId = name
            if (checked) {
                setSelectedPeople(prevSelectedPeople => [...prevSelectedPeople, personId]);
            } else {
                setSelectedPeople(prevSelectedPeople => prevSelectedPeople.filter(id => id !== personId));
            }
        }             
    }
    
    const handleClose = () => {
      props.setScreen("main");
    }
    
    const handleBack = () => {
      props.setScreen("editForm");
    }

    function handleSubmit(event) {
        event.preventDefault();
        props.onItemFormSubmit({
            name: itemFormData.itemName,
            price: itemFormData.itemCost, 
            people: selectedPeople
        });
        setItemFormData({
            itemName: "",
            itemCost: ""
        });
        setSelectedPeople([]);
        const checkboxes = document.querySelectorAll('.itemForm input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        }
    
    const formPeople = Object.values(props.allPeople).map(person => (          
        <div className="whiteBackground" key={person.id}>
        <input 
                type="checkbox" 
                id={person.id}
                onChange={handleChange}
                name={person.id}
            />
            <label htmlFor="isSelected">{person.name}</label>
        </div>
    ))


  return (
    <div className="modal">
    <div className="modalContent"> <br />
        <div className="personContainer whiteBackground">
            {props.displayBack && <button className="backToEditForm" onClick={handleBack}><i className="fa-solid fa-arrow-left"></i></button>}
          <button className = "closeForms" onClick={handleClose}><i className="fa-regular fa-x"></i></button>
            </div>
     <form className="itemForm">
     <h2>New Item</h2>
         <hr />
         <br /><br />
         
            <input
                type="text"
                placeholder="Item Name"
                name="itemName"
                value={itemFormData.itemName}
                onChange={handleChange}
            />
            <br />
            <input
                type="number"
                placeholder="Item Cost"
                name="itemCost"
                value={itemFormData.itemCost}
                onChange={handleChange}
            />
         <h3>Select Users:</h3>
            {formPeople}
         <br />
            <button onClick={handleSubmit}>Submit</button>
         
           
        </form>
        </div>
      </div>
  )
}