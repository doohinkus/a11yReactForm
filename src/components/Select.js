import React, { Fragment } from 'react';
import { useStateValue } from '../state/state.provider';
import { handleBlur } from  '../state/state.helpers';
import { updateFieldValue } from '../state/form.duck';
import Error from './Error';

export default function Select({...props}){
    const [{ fields }, dispatch] = useStateValue();
    console.log(fields)
    const fieldValues = fields.filter((field) => field.name === props.name)[0];
    const hasFieldValues = fields && fieldValues;
    const showError = hasFieldValues && fieldValues.isReadyForValidation && fieldValues.error;
   
    return (<Fragment>
        <label>{props.label}</label>
        <select 
          tabIndex={0}
          onChange={e => dispatch(updateFieldValue(e))}
          onBlur={() => handleBlur({ 
              dispatch,
              fieldValues, 
              validate: props.validate, 
              errorMessage: props.errorMessage
            
          })}
          {...props}
        >
            {props.children}
        </select>
          <p> 
            {
              hasFieldValues && JSON.stringify(fieldValues)
            }
          </p>
          {showError && <Error>{fieldValues.errorMessage}</Error>}
    </Fragment>)
};