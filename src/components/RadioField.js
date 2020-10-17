import React, { Fragment, useEffect } from 'react';
import { useStateValue } from '../state/state.provider';
import RadioOption from './RadioOption';
import { addField } from  '../state/state.helpers';


const labelStyle = {
    color: 'red',
    fontWeight: 'bold'
}
const fieldStyle = {
  borderColor: 'lightgray',
  borderRadius: '.5em',
  width: '60vw',
  margin: '1em auto'
}
const legendStyle = {
  textAlign: 'left'
}
export default function RadioField({...props}){
  const [{ fields }, dispatch] = useStateValue();

  useEffect(() => {
    addField({...props}, dispatch);
  }, []);
  // console.log("STATE>>>>", fields)
  const fieldValues = fields.filter((field) => field.name === props.name)[0];
    // const fieldValues = fieldValues(fields, props);
  const hasFieldValues = fields && fieldValues;
  const showError = hasFieldValues && fieldValues.isReadyForValidation && fieldValues.error;
  return (
   <div>
        <label style={labelStyle}>{props.label}</label>
        {/* {props.children} */}
          {props.options.map(({value}) => {
            return <RadioOption
              label={`Option ${value}: `}
              name={props.name}
              key={value}
              id={value}
              value={value}
              {...props}
            />
          })}
          {/* {showError && fieldValues.value === props.value && <Error>{fieldValues.errorMessage}</Error>} */}
      </div>
  )
}