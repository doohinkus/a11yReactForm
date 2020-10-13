import React, {Fragment} from 'react';
import { useStateValue } from '../state/state.provider';
import { handleBlur } from  '../state/state.helpers';
import { updateFieldValue } from '../state/form.duck';
import Error from './Error';

const inputStyle = {
  // display: 'inline',
  verticalAlign: "middle"
}
const labelStyle = {
  verticalAlign: "middle"
  // margin: '.25em',
  // display: 'inline'
}
export default function RadioOption({...props}){
    const [{ fields }, dispatch] = useStateValue();
    console.log(fields)
    const fieldValues = fields.filter((field) => field.name === props.name)[0];
    // const fieldValues = fieldValues(fields, props);
    const hasFieldValues = fields && fieldValues;
    const showError = hasFieldValues && fieldValues.isReadyForValidation && fieldValues.error;
   
    return (<Fragment>
        <label style={labelStyle}>{props.label}</label>
        <input 
          style={inputStyle}
          tabIndex={0}
          type="radio"
          onChange={e => dispatch(updateFieldValue(e))}
          onBlur={() => handleBlur({ 
              dispatch,
              fieldValues, 
              validate: props.validate, 
              errorMessage: props.errorMessage
            
          })}
          {...props}
        />
          <p> 
            {
              hasFieldValues && JSON.stringify(fieldValues)
            }
          </p>
          {showError && <Error>{fieldValues.errorMessage}</Error>}
    </Fragment>)
};