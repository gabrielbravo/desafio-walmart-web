import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
      width:'70%'
    },
  }));

const InputSearch = props => {
    const classes = useStyles();
    return (
        <TextField
            className={classes.margin}
            id="input-with-icon-textfield"
            placeholder="Búsqueda de Producto"
            InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                <Search />
                </InputAdornment>
            ),
            }}
            onChange={props.handleChange}
            value={props.value}
            onKeyPress={props.handleKeyPress}
        />
    )
}

export default InputSearch;