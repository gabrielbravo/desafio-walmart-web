import React, { useState, useEffect, Fragment } from 'react'
import { Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from '../../../utils/injectSaga';
import { getByCode } from '../redux/actions';
import { withRouter } from "react-router-dom";
import saga from '../redux/saga';
import Loading from '../../../components/loading/loadable';

const Index = (props) => {
    useInjectSaga({ key: 'SearchSaga', saga });
    const dispatch = useDispatch();
    const state = useSelector(state => state);

    useEffect(() => {
        dispatch(getByCode(props.match.params.code));
    }, []);

    return (
        state.SearchReducer.loading ?
        <Loading />
        :
        state.SearchReducer.error ?
        <h4>Error</h4>
        :
        <Grid container spacing={3}>
            <Grid item xs={6}>
                <img 
                width="100%"
                alt={state.SearchReducer.product.description} 
                src={`http://${state.SearchReducer.product.image}`} >        
                </img>
            </Grid>
            <Grid item xs={6}>
                <h2>{state.SearchReducer.product.name}</h2>
                <h4>{state.SearchReducer.product.code}</h4>
                <h4>{state.SearchReducer.product.brand}</h4>
                <h3>${state.SearchReducer.product.price}</h3>
            </Grid>
            <Grid item xs={12}>
                <h4>{state.SearchReducer.product.description}</h4> 
            </Grid>
            
        </Grid>
        
    )
}

export default withRouter(Index);