import React from 'react';
import Input from './components/Input';
import Select from './components/Select';
import Field from './components/Field';
import PageErrors from './components/PageErrors';

import { useStateValue } from './state/state.provider';
import { isCleanSubmit, setReadytoValidateTrue } from './state/state.helpers';

function App() {
  const [{ fields }, dispatch] = useStateValue();

  const radioOptions = [{value: "one"}, {value: "two"}, {value: "three"}];
  const selectOptions = [{value: "one", label: "one"}, {value: "two", label: "two"}, {value: "three", label:"three"}];

 if(fields){
   console.log(fields)
 }
  return (
    <div className="App">
     <h1>React Form A11y</h1>
     <PageErrors />
     <form id="a11yForm">
      <Field legend="Personal Details">
          <Input
            label="Enter Name:"
            type="text" 
            name="unique name"
            rank={0}
            errorMessage="Please enter a name mores than 5 characters."
            validate={val => val.length > 4}
          />
          <Input
            label="Enter Other Name:"
            type="text" 
            name="other name"
            rank={1}
            errorMessage="Please enter a name more than 3 characters."
            validate={val => val.length > 2}
          />
      </Field>
      {/* <RadioField 
        legend="Please select one:"
        name="radio"
        options={radioOptions}
        errorMessage="Please select one."
        validate={val => "one"}
      />   */}
      {/* <Field legend="Please select Radio Choice:">
        {radioOptions.map(({value}) => {
              return <RadioOption
                label={`Option ${value}: `}
                name="radio"
                key={value}
                id={value}
                value={value}
                validate={n => n === "one"}
              />
          })}
          {/* move error here */}
          {/* {fields.filter(({value}) => value === "radio")[0].error && <Error>{fields.filter(({value}) => value === "radio")[0].errorMessage}</Error>} */}
      {/* </Field>  */}
      
      <Field legend="Please select one: ">
        <Select
          label="Please select:"
          name="select"
          rank={2}
          errorMessage="Please select an option."
          validate={v => v !== "unselected"}
          defaultValue={"unselected"}
          options={selectOptions}
        />
      </Field>
      <button 
        style={{margin:"auto", display: 'block'}}
        onClick={e => {
          e.preventDefault();
          // var x = document.getElementById("a11yForm").elements;
          isCleanSubmit({ fields });
          console.log(isCleanSubmit({ fields }));
          // if clean submit -> submit
          if(isCleanSubmit({fields})){
            console.log("success!!!!")
          } else{
            setReadytoValidateTrue({fields, dispatch});
            // otherwise, set all fields to ready for validate and run validations
          }
      }
    }>Submit</button>
    </form>
    <pre> 
            {
              JSON.stringify(fields, null, 2)
            }
    </pre>
    </div>
  );
}

export default App;
