import React, { Fragment } from 'react';
const labelStyle = {
    color: 'red',
    fontWeight: 'bold'
}
const fieldStyle = {
  borderColor: 'lightgray',
  borderRadius: '.5em',
  width: '60vw',
  margin: '1em auto'
}
const legendStyle = {
  textAlign: 'left'
}
export default function RadioField({...props}){
    return (
      <Fragment>
        <fieldset style={fieldStyle}>
          {props.legend ? <legend style={legendStyle}>{props.legend}</legend> : null} 
          <label style={labelStyle}>{props.label}</label>
          {props.children}
        </fieldset>
      </Fragment>
    )
}