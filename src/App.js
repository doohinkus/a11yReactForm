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
    </div>
  );
}

export default App;
