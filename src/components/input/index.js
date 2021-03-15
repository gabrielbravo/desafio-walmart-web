import React from 'react'
import { TextField } from '@material-ui/core'

export default function Index(props) {
    return (
        <TextField
            label={props.label}
            placeholder={props.placeholder}
            fullWidth
            variant="outlined"
            name={props.name}
            onChange={props.onChange}
            value={props.value}
            InputLabelProps={{
                shrink: true,
            }}
            error={props.error}
            helperText={props.helperText}
            className="formInput"
            
        />      
    )
}
