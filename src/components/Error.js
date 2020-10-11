import React from 'react';
const errorStyle = {
    color: 'red',
    fontWeight: 'bold'
}
export default function Error({...props}){
    return (
    <span style={errorStyle}>{props.children}</span>
    )
}