import React from "react"
import Items from "./Items"
import FormPerson from "./FormPerson"

export default function EditForm(props) {
    
    function trash(id, price) {
        var relPeople = props.allItems.find(item => item.id === id).people;
        var numPeople = relPeople.length;
        relPeople.forEach(function(personId) {
            props.setPeople(prevPeople => ({
                ...prevPeople,
                [personId]: {
                    ...prevPeople[personId],
                    contributedTo: prevPeople[personId].contributedTo.filter(item => item[0] !== id), 
                    price: parseFloat(prevPeople[personId].price) - (price/numPeople)
                }
            }));  
          props.setItems(props.allItems.filter(item => item.id !== id))
        });
        props.setSubtotal(props.subtotal-price)
    }
    
    function editName(id) {
        var newName = prompt(`What would you like ${props.allPeople[id].name}'s new name to be?`);
        if (newName === "" || newName === null) {
            console.log("no name")
            return;
        }
        props.setPeople(prevPeople => ({
        ...prevPeople,
        [id]: {
            ...prevPeople[id],
            name: newName
        }
    }));
    }
    
    const itemElements = props.allItems.map(item => (
        <Items
            key={item.id} 
            name={item.name}
            price={item.price}
            people={item.people}
            trash={() => trash(item.id, item.price)}
        />
    ))
    
    const peopleElements = Object.values(props.allPeople).map(person => (
        <FormPerson
            key={person.id} 
            name={person.name}
            id={person.id} 
            editName={() => editName(person.id)}
        />
    ))
    
    const handleClose = () => {
      props.setScreen("main");
    }
    
    const handleAddClick = () => {
        if (props.chosen==="People") {
            props.setScreen("personForm");
        } else {
            props.setScreen("itemFormfromEdit");
        }
    }
        
    const handleToggle = () => {
      props.setChosen(props.chosen==="People"?"Items":"People")
    }
    
    
    
    return (
        <div className="modal">
        <div className="modalContent">
            <div className="editFormButtons">
                <button id = "addButton" onClick={handleAddClick}><i className="fa-solid fa-plus" title="Add"></i> Add {props.chosen==="People"?"Person":"Item"}</button>
                <button className = "closeForms" onClick={handleClose}><i className="fa-regular fa-x"></i></button>
            </div>
            <br /><hr />
            <h2 className="peopleForms"><span className="display">People</span>
                <span><button id = "toggleMe" onClick={handleToggle}><i className={`fa-solid fa-toggle-${props.chosen==="People" ? "off":"on"}`}></i></button></span><span className="display">Items</span></h2> <hr /> <br />
            {props.chosen==="People" && <div className="people">{peopleElements}</div>}
            {props.chosen==="Items" && <div className="items"> {itemElements}</div>}
            
        </div>
            </div>)
}