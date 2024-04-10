import React from "react"

export default function Footer(props) {
    
      const handleTaxButton = () => {
          props.setScreen("taxTipForm");
      }
    return (
        
        <div>
            {!props.done && props.subtotal > 0 && <div className="rightContainer"><button id = "taxTipButton" onClick={handleTaxButton}><i className="fa-solid fa-arrow-right"></i> Tax + Tip</button></div>}
            {props.done && <h1 id="thankyou" className="splitsies">thank you!</h1>}
        </div>
    )
}