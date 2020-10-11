import React from 'react';
import { useStateValue } from '../state/state.provider';
import { updateFieldValue, addFieldError, clearFieldError } from '../state/form.duck';
import Error from './Error';

export default function Input({...props}){
    function handleBlur({fieldValues, validate}){
      console.log("handleblur", typeof validate, " ", fieldValues)
      if(fieldValues && fieldValues.value){
        // console.log(props.validate(fieldValues.value), "field ", fieldValues.value)
        if(props.validate(fieldValues.value)){
          // dispatch error
          return dispatch(addFieldError({id: fieldValues.id, errorMessage: "Test error"}));
        }
        // clear error
        return dispatch(clearFieldError({id: fieldValues.id}));
      }
      return
    }
    const [{ fields }, dispatch] = useStateValue();
    // console.log(fields)
    const fieldValues = fields.filter((field) => field.id === props.id)[0];
    const hasFieldValues = fields && fieldValues;
    const showError = hasFieldValues && fieldValues.isReadyForValidation && fieldValues.error;
   
    return (<div>
        <label>{props.label}</label>
        <input 
          tabIndex={0}
          onChange={e => dispatch(updateFieldValue(e))}
          onBlur={() => handleBlur({fieldValues, validate: props.validate})}
          {...props}
        />
          <p>
            {
              hasFieldValues && JSON.stringify(fieldValues)
            }
            {hasFieldValues && fieldValues.isReadyForValidation && "READY"}
            {showError && <Error>Hey man Error</Error>}
            
          </p>
    </div>)
};