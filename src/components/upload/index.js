import React from 'react'


export default function Index(props) {
    return (
        <input 
        type="file" 
        name={props.name}
        onChange={props.handleChange}
        />
    )
}
