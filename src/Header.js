import React from "react"

export default function Header(props) {
    
  const handleRefresh = () => {
    window.location.reload();
  };
    
  const handleAddItemClick = () => {
      props.setScreen("itemFormfromHeader");
  }
  
  const handleEditFormClick = () => {
      props.setScreen("editForm");
  }
  
  const toggleItemized = () => {
      props.setItemized(!props.isItemized)
  }
  
  return (
      <div>
      <div className="header">
          {!props.isDone && <button id = "addItemButton" onClick={handleAddItemClick}><i className="fa-solid fa-plus" title="Add Item"></i><span className="hideText">add item</span></button>}
          {props.numItems !== 0 && <button id = "itemToggleButton" onClick={toggleItemized}><i className={`fa-solid fa-toggle-${props.isItemized ? "on":"off"}`}title="Add Item"></i><span className="hideText">itemized</span></button>}
          {!props.isDone && <button id = "editButton" onClick={handleEditFormClick}><i className='fas fa-pencil-alt' ></i><span className="hideText">edit</span></button>}
          <button id = "refreshButton" onClick={handleRefresh}><i className="fa-solid fa-rotate-right"></i><span className="hideText">restart</span></button>
      </div>
            </div>)
}
