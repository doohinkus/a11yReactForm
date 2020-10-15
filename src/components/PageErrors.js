import React, { Fragment } from 'react';
import { useStateValue } from '../state/state.provider';

const errorStyle = {
    color: "red"
}
export default function PageErrors(){
    const [{ fields }] = useStateValue();
    // console.log(fields)
    const errors = fields.filter(({error}) =>  error);
    // console.log("ERRORS>>>> ", errors, fields);

    return (
        <ul>
          {
              errors && errors.map(({name, errorMessage}) => <li style={errorStyle}>
                  There is problem with {name}: {errorMessage}.
              </li>)
          }
        </ul>
    );
}