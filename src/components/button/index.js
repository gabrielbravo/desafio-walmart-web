import React from 'react'
import { Button } from '@material-ui/core'

export default function ButtonApp(props) {
    return (
        <Button 
        variant="contained" 
        color={props.color} 
        onClick={props.handleclick} 
        autoFocus
        disabled={props.disabled}
        >
            { props.working ? props.textWorking : props.text }
        </Button>
    )
}
