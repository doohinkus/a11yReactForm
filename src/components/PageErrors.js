import React, { Fragment } from 'react';
import { useStateValue } from '../state/state.provider';

const errorStyle = {
    color: "red",
    margin: "auto",
}
const fieldStyle = {
    borderColor: 'lightgray',
    borderRadius: '.5em',
    width: '60vw',
    margin: '1em auto'
}
export default function PageErrors(){
    const [{ fields }] = useStateValue();
    // console.log(fields)
    const errors = fields.filter(({error, isReadyForValidation}) =>  error && isReadyForValidation);
    // console.log("ERRORS>>>> ", errors, fields);

    return (
        <ul style={fieldStyle}>
          {
              errors && errors.map(({name, errorMessage}) => <li key={name} style={errorStyle}>
                  There is problem with {name}: {errorMessage}.
              </li>)
          }
        </ul>
    );
}