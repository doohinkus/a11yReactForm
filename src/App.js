import React from 'react';
import './App.css';
import Input from './components/Input';
import Select from './components/Select';
function App() {

  return (
    <div className="App">
     <h1>React Form A11y</h1>
     <Input
      label="Enter Name:"
      type="text" 
      id="unique name"
      errorMessage="Please enter a name fewer than 5 characters."
      validate={val => val.length > 4}
    />
     <Input
      label="Enter Other Name:"
      type="text" 
      id="other name"
      errorMessage="Please enter a name fewer than 3 characters."
      validate={val => val.length > 2}
    />
    <div>
    <p>Radio</p>
    <Input
      label="Enter Other Name:"
      type="radio" 
      id="radio"
      name="radio"
      errorMessage="Please make a selection--yo."
    />
    <Input
      label="Enter Other Name:"
      type="radio" 
      id="radio"
      name="radio"
      errorMessage="Please make a selection--yo."
    />
    </div>
    <Select
     label="Please select:"
     id="select"
     errorMessage="Please select an option."
     validate={v => v === "unselected"}
     defaultValue={"unselected"}
     >
      <option value="unselected">please select</option>
      <option value="one">option one</option>
      <option value="two">option two</option>
      <option value="three">option three</option>
    </Select>
    </div>
  );
}

export default App;
