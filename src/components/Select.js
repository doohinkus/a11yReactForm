import React, { Fragment, useEffect } from 'react';
import { useStateValue } from '../state/state.provider';
import { handleBlur, addField } from  '../state/state.helpers';
import { updateFieldValue } from '../state/form.duck';
import Error from './Error';

export default function Select({...props}){
    const [{ fields }, dispatch] = useStateValue();
    useEffect(() => {
      addField({...props}, dispatch);
    }, []);
  
    // console.log(fields)
    const fieldValues = fields.filter((field) => field.name === props.name)[0];
    const hasFieldValues = fields && fieldValues;
    const showError = hasFieldValues && fieldValues.isReadyForValidation && fieldValues.error;
   
    return (<Fragment>
        <label>{props.label}</label>
        <select 
          tabIndex={0}
          name={props.name || null}
          onChange={e => dispatch(updateFieldValue(e))}
          onBlur={() => handleBlur({ 
              dispatch,
              fieldValues, 
              validate: props.validate, 
              errorMessage: props.errorMessage
            
          })}
          {...props}
        >
            {/* {props.children} */}
            <option value="unselected">please select</option>
            {props.options.map(({value, label}) => {
              return <option
                value={value}
                key={value}
              >
                {label}
              </option>
            })}
        </select>
        {showError && <Error>{fieldValues.errorMessage}</Error>}
    </Fragment>)
};