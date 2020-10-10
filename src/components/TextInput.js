import React from 'react';
import { useStateValue } from '../state/state.provider';
import { ACTIONS } from '../state/form.duck';


export default function TextInput({...props}){
  const [{ fields }, dispatch] = useStateValue();
    return (<div>
        <label>{props.label}</label>
        <input 
          onChange={e => dispatch({
            type: ACTIONS.CHANGE_FIELD_VALUE,
            payload: {
              id:  e.target.id,
              value: e.target.value
            }
          })}
          {...props}
          />
          {JSON.stringify(fields.filter((field) => field.id === props.id))}
    </div>)
};