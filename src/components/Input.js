import React from 'react';
import { useStateValue } from '../state/state.provider';
import { updateFieldValue } from '../state/form.duck';



export default function Input({...props}){
    const [{ fields }, dispatch] = useStateValue();
    const fieldValues = fields.filter((field) => field.id === props.id)[0];
   
    return (<div>
        <label>{props.label}</label>
        <input 
          onChange={e => dispatch(updateFieldValue(e))}
          onBlur={e => {
            //encapsulate
            console.log(typeof props.validationFunction, " ", fieldValues)
            if(fieldValues && fieldValues.value){
              console.log(props.validate(fieldValues.value), "field ", fieldValues.value)
              // dispatch error
            }
  
          }}
          {...props}
        />
          <p>
            {
              JSON.stringify(fieldValues)
            }
            {fieldValues && fieldValues.isReadyForValidation || "no value"}
          </p>
    </div>)
};