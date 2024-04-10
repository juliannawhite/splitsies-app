import React from "react"
import Title from "./Title"
import Header from "./Header"
import People from "./People"
import Subtotal from "./Subtotal"
import PersonForm from "./PersonForm"
import ItemForm from "./ItemForm"
import EditForm from "./EditForm"
import TaxTip from "./TaxTip"
import Footer from "./Footer"
import Start from "./Start"

var items = [{
        name: "Sushi",
        id:0,
        price:100,
        people: [0], 
    }];


var people = {
    0: {
        id:0,
        name: "Julianna",
        price: 100, 
        contributedTo: [[0, "Sushi", 100]], 
    },
    
    1: {
        id:1, 
        name: "Laura",
        price: 0, 
        contributedTo: [],
    }
}

export default function App() { 
  var [allItems, setItems] = React.useState(items)
  var [subtotal, setSubtotal] = React.useState(100)
  var [tax, setTax] = React.useState(0)
  var [tip, setTip] = React.useState(0)
  var [total, setTotal] = React.useState(100);
    

  
  var [allPeople, setPeople] = React.useState(people)
  var [isDone, setDone] = React.useState(false)
  var [currScreen, setScreen] = React.useState("start")
  var [isItemized, setItemized] = React.useState(true)
  const [chosen, setChosen] = React.useState("People")
  const [numJoining, setNum] = React.useState("")
  
  const peopleElements = Object.values(allPeople).map(person => (
        <People 
            key={person.id} 
            name={person.name}
            price={person.price}
            id={person.id} 
            contributedTo={person.contributedTo}
            isItemized={isItemized}
        />
    ))
  
function addPerson(person) {
    const newPersonId = Object.keys(allPeople).length;
    person.id = newPersonId;
    person.contributedTo = []
    setPeople(prevPeople => ({
        ...prevPeople,
        [newPersonId]: person 
    }));
    setScreen("main")
}
    
React.useEffect(() => {
    const newTotal = parseFloat(subtotal) + parseFloat(tax) + parseFloat(tip);
    setTotal(newTotal);
  }, [subtotal, tax, tip]);
    
function taxTip(item) {
    setTax(item.tax)
    setTip(item.tip)
    
    const newTotal = parseFloat(subtotal) + parseFloat(item.tax) + parseFloat(item.tip);
    setTotal(newTotal);
    
    for (const personId in allPeople) {
        const person = allPeople[personId];
        const ratio = person.price / subtotal;
        const newPrice = ratio * newTotal;
            
        setPeople(prevPeople => ({
            ...prevPeople,
            [personId]: {
                ...prevPeople[personId],
                price: newPrice
            }
        }));
    }
    setDone(true)
    setScreen("main")
}

function addItem(item) {
    if (!item.name || !item.price || isNaN(item.price) || item.people.length === 0) {
        console.log("invalid")
        return
    }
    let relPeople = item.people
    let costPerPerson = item.price / relPeople.length
    setScreen("main")
    item.id=allItems.length
    setItems(prevItems => [...prevItems, item])
    relPeople.map(personId => {
        return setPeople(prevPeople => ({
            ...prevPeople, 
            [personId]: {
                ...prevPeople[personId], 
                price: parseFloat(prevPeople[personId]["price"]) + costPerPerson,
                
                contributedTo:
                    [...prevPeople[personId].contributedTo,
                    [item.id, item.name, costPerPerson]
                ]
        }
        }))
        
    });
    setSubtotal(parseFloat(subtotal)+parseFloat(item.price))
}
    
    function startParty() {
        var peopleDict = {}
        for (var id = 0; id < numJoining; id++) {
            peopleDict[id] = {
                id:id, 
                name: "Person "+id,
                price: 0, 
                contributedTo: []
            }
        }
        setPeople(peopleDict)
        setScreen("main")
        setSubtotal(0)
        setItems([]) 
    }
    
  return (
    <div>
          {currScreen === 'start' && <Start 
              numJoining={numJoining}
              setNum={setNum}
              onFormSubmit={startParty}/>}
          {currScreen === 'taxTipForm' &&
              <TaxTip 
              onFormSubmit={taxTip}
              setScreen={setScreen}/>
          }
        <Title />
          {currScreen === 'editForm' && <EditForm 
              allItems={allItems}
              allPeople={allPeople}s
              setScreen={setScreen}
              setPeople={setPeople}
              setItems={setItems}
              subtotal={subtotal}
              setSubtotal={setSubtotal}
              chosen = {chosen}
              setChosen={setChosen}/>}
        
          {currScreen !== 'start' &&  <div className = "main">
            <Header 
                setScreen={setScreen}
                setItemized={setItemized}
                isItemized={isItemized}
                isDone = {isDone}
                numItems = {allItems.length}/>
            {peopleElements}
              <Subtotal 
              subtotal={subtotal}
                  tax={tax}
                  tip={tip}
                  total={total}
                  isDone = {isDone}/>
          <Footer
              setScreen={setScreen}
              done = {isDone}
              subtotal={subtotal}/>
          
          </div>}
          {currScreen === 'personForm' && 
          <PersonForm 
              onFormSubmit={addPerson}
              setScreen={setScreen}
          />}

          {(currScreen === 'itemFormfromHeader' || currScreen === 'itemFormfromEdit')&& 
              <ItemForm             
                  onItemFormSubmit={addItem} 
                  allPeople = {allPeople}
                  setScreen={setScreen}
                  displayBack={currScreen==='itemFormfromEdit'}
          />}          
    </div>
  );
}
