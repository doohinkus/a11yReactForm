import React from 'react';
import './App.css';
import TextInput from './components/TextInput';
import { useStateValue } from './state/state.provider';
import { ACTIONS } from './state/form.duck';
function App() {
  const [{ fields }, dispatch] = useStateValue();

  return (
    <div className="App">
     <h1>React Form A11y</h1>
     <TextInput
      label="Enter Name:"
      type="text" 
      id="unique name"
    
      onBlur={e => console.log("blurred ", e.target.value)}
    />
    </div>
  );
}

export default App;
