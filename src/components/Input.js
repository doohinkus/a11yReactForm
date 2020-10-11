import React from 'react';
import { useStateValue } from '../state/state.provider';
import { updateFieldValue, addFieldError, clearFieldError } from '../state/form.duck';
import Error from './Error';

export default function Input({...props}){
    function handleBlur({fieldValues, validate, errorMessage}){
      console.log("handleblur", typeof validate, " ", fieldValues, errorMessage)
      if(fieldValues && fieldValues.value){
        // console.log(props.validate(fieldValues.value), "field ", fieldValues.value)
        if(props.validate(fieldValues.value)){
          // dispatch error
          return dispatch(addFieldError(
              {
                id: fieldValues.id, 
                errorMessage: errorMessage || "default error message"
              })
            );
        }
        // clear error
        return dispatch(clearFieldError({id: fieldValues.id}));
      }
      return
    }
    const [{ fields }, dispatch] = useStateValue();
    console.log(fields)
    const fieldValues = fields.filter((field) => field.id === props.id)[0];
    const hasFieldValues = fields && fieldValues;
    const showError = hasFieldValues && fieldValues.isReadyForValidation && fieldValues.error;
   
    return (<div>
        <label>{props.label}</label>
        <input 
          tabIndex={0}
          onChange={e => dispatch(updateFieldValue(e))}
          onBlur={() => handleBlur({fieldValues, validate: props.validate, errorMessage: props.errorMessage})}
          {...props}
        />
          <p> 
            {
              hasFieldValues && JSON.stringify(fieldValues)
            }
          </p>
          {showError && <Error>{fieldValues.errorMessage}</Error>}
    </div>)
};