import React from 'react';
import Input from './components/Input';
import Select from './components/Select';
import Field from './components/Field';
import RadioField from './components/RadioField';

function App() {
  const options = [{value: "one"}, {value: "two"}, {value: "three"}]
  return (
    <div className="App">
     <h1>React Form A11y</h1>
     <Field legend="Personal Details">
        <Input
          label="Enter Name:"
          type="text" 
          name="unique name"
          errorMessage="Please enter a name fewer than 5 characters."
          validate={val => val.length > 4}
        />
        <Input
          label="Enter Other Name:"
          type="text" 
          name="other name"
          errorMessage="Please enter a name fewer than 3 characters."
          validate={val => val.length > 2}
        />
     </Field>
     <RadioField 
      legend="Please select one:"
      name="radio"
      options={options}
    />  
    <Field legend="Please select one: ">
      <Select
        label="Please select:"
        name="select"
        errorMessage="Please select an option."
        validate={v => v === "unselected"}
        defaultValue={"unselected"}
      >
        <option value="unselected">please select</option>
        <option value="one">option one</option>
        <option value="two">option two</option>
        <option value="three">option three</option>
      </Select>
    </Field>
    </div>
  );
}

export default App;
