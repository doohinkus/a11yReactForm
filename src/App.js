import React from 'react';
import Input from './components/Input';
import Select from './components/Select';
import Field from './components/Field';
import RadioField from './components/RadioField';
import PageErrors from './components/PageErrors';
import { useStateValue } from './state/state.provider';

function App() {
  const [{ fields }] = useStateValue();

  const radioOptions = [{value: "one"}, {value: "two"}, {value: "three"}];
  const selectOptions = [{value: "one", label: "one"}, {value: "two", label: "two"}, {value: "three", label:"three"}];
  return (
    <div className="App">
     <h1>React Form A11y</h1>
     <PageErrors />
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
      options={radioOptions}
    />  
    <Field legend="Please select one: ">
      <Select
        label="Please select:"
        name="select"
        errorMessage="Please select an option."
        validate={v => v === "unselected"}
        defaultValue={"unselected"}
        options={selectOptions}
      />
    </Field>
    <pre> 
            {
              JSON.stringify(fields, null, 2)
            }
    </pre>
    </div>
  );
}

export default App;
