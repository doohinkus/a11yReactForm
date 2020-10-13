import React from 'react';
const fieldStyle = {
    borderColor: 'lightgray',
    borderRadius: '.5em',
    width: '60vw',
    margin: '1em auto'
}
const legendStyle = {
  textAlign: 'left'
}
export default function Field({...props}){
    return (
      <fieldset style={fieldStyle}>
        {props.legend ? <legend style={legendStyle}>{props.legend}</legend> : null} 
        {props.children}
      </fieldset>
    )
}