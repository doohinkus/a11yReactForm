import React, { Fragment, useEffect } from 'react';
import { useStateValue } from '../state/state.provider';
import { handleBlur, addField, handleChange } from  '../state/state.helpers';
import { updateFieldValue } from '../state/form.duck';
import Error from './Error';

const inputStyle = {
  display: 'block',
}
const labelStyle = {
  margin: '.5em 0',
  display: 'block'
}
export default function Input({...props}){
    const [{ fields }, dispatch] = useStateValue();
    useEffect(() => {
      addField({...props}, dispatch);
      // return removeField({...props.name});
    }, []);
    const fieldValues = fields.filter(({name}) => name === props.name)[0];
    const hasFieldValues = fields && fieldValues;
    const showError = hasFieldValues && fieldValues.isReadyForValidation && fieldValues.error;
    
    // console.log(">>>>>", fieldValues, "<<<<<")
    return (<Fragment>
        <label style={labelStyle}>{props.label}</label>
        <input 
          style={inputStyle}
          tabIndex={0}
          // onChange={e => dispatch(updateFieldValue({
          //   isReadyForValidation: true,
          //   value: e.target.value,
          //   ...props
          // }))}
          onChange={e => handleChange({
            dispatch,
            e,
            ...props
          })}
          onBlur={e => handleBlur({ 
              dispatch,
              value: e.target.value,
              ...props
          })}
          {...props}
        />
        {showError && <Error>{props.errorMessage}</Error>}
    </Fragment>)
};