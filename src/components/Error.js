import React from 'react';
const errorStyle = {
    color: 'red',
    fontWeight: 'bold'
}
export default function Error({...props}){
    return (
      <div style={errorStyle}>{props.children}</div>
    )
}