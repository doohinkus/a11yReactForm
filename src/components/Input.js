import React, { Fragment, useEffect } from 'react';
import { useStateValue, useInit } from '../state/state.provider';
import { handleBlur, addField } from  '../state/state.helpers';
import { updateFieldValue, initFieldValues } from '../state/form.duck';
import Error from './Error';

const inputStyle = {
  display: 'block',
}
const labelStyle = {
  margin: '.5em 0',
  display: 'block'
}
export default function Input({...props}){
    useEffect(() => {
      // function addField({...props}){
      //   dispatch(initFieldValues({...props}));
      // }
      // function removeField({name}){
      //   console.log("removed ")
      //   dispatch(initFieldValues({name}));
      // }
      addField({...props}, dispatch);
      // return removeField({...props.name});
    }, []);
    const [{ fields }, dispatch] = useStateValue();
    // console.log(fields)
    const fieldValues = fields.filter((field) => field.name === props.name)[0];
    const hasFieldValues = fields && fieldValues;
    const showError = hasFieldValues && fieldValues.isReadyForValidation && fieldValues.error;
   
    return (<Fragment>
        <label style={labelStyle}>{props.label}</label>
        <input 
          style={inputStyle}
          tabIndex={0}
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