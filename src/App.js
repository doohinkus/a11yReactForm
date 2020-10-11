import React from 'react';
import './App.css';
import Input from './components/Input';
function App() {

  return (
    <div className="App">
     <h1>React Form A11y</h1>
     <Input
      label="Enter Name:"
      type="text" 
      id="unique name"
      validate={val => val.length > 4}
    />
     <Input
      label="Enter Other Name:"
      type="text" 
      id="other name"
      validate={val => val.length > 2}
    />
    </div>
  );
}

export default App;
