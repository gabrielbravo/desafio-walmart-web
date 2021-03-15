import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button'; 
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  
  title: {
    width: '100%',
    color: '#FFF'
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}));

export default function Header() {
  const classes = useStyles();
  
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          
            <Link component="a"  href="/">
              <Typography className={classes.title} variant="h5" noWrap>
                Desafio Walmart
              </Typography>
            </Link> 
        </Toolbar>
      </AppBar>
    </div>
  );
}