import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core';

import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from '../../../utils/injectSaga';
import { searchProducts } from '../redux/actions';
import { withRouter } from "react-router-dom";
import saga from '../redux/saga';

import InputSearch from '../inputSearch/loadable';
import Item from '../item/loadable';
import Loading from '../../../components/loading/loadable';
import { toast } from 'react-toastify';
import Button from './../../../components/button'

const Index = (props) => {
    useInjectSaga({ key: 'SearchSaga', saga });
    const dispatch = useDispatch();
    const state = useSelector(state => state);

    const [filter, setFilter] = useState('');
    const [page, setPage] = useState(1);

    const handleChangeFilter = event => {
        setFilter(event.target.value);    
    }

    const handleKeyPressFilter = event => {
        if(event.charCode===13) {
            dispatch(searchProducts(filter, 1, searchProductsAction, true));
        }
    }

    useEffect(() => {
        dispatch(searchProducts(filter, 1, searchProductsAction, false));
    }, []);

    useEffect(() => {
        if(filter.length===0) {
            dispatch(searchProducts(filter, 1, searchProductsAction, false));
        }
    }, [filter])

    const handleLoadMore = () => {
        const newPage = page + 1;
        dispatch(searchProducts(filter, newPage, searchProductsAction, false));
        setPage(newPage);
    }

    const searchProductsAction = (error, message, isFilter, products) => {
        error && toast.warn(message)
        if(isFilter && products.length===1) {
            window.location.href = `/producto/${products[0].id}`;
        }
        
    }

    return (
        <Grid container spacing={1} >
            <Grid item xs={12} style={{ textAlign: 'center', padding: 20 }}>
                <InputSearch 
                handleChange={handleChangeFilter}
                handleKeyPress={handleKeyPressFilter}
                value={filter}
                />
            </Grid>
            <Grid container spacing={1} direction="row" >
                {
                    // state.SearchReducer.loading ?
                    // <br/>
                    // :
                    state.SearchReducer.error ? 
                    <h3>Ocurrió un error, intente nuevamente</h3>
                    :!state.SearchReducer.loading && 
                    state.SearchReducer.products.length===0 ?
                    <h3> {`No se encontraron resultados para la búsqueda "${filter}"`} </h3>
                    :
                    state.SearchReducer.products.map(p => (
                        <Grid key={p.code} item xs={3}>
                            <Item product={p} />
                        </Grid>
                    ))
                }
            </Grid>
            <Grid item xs={12} style={{ textAlign: 'center', padding: 20 }}>
                <Button 
                color="primary"
                text="Cargar más"
                handleclick={handleLoadMore}
                disabled={state.SearchReducer.loading}
                working={state.SearchReducer.loading}
                />
            </Grid>
        </Grid>
    )
}

export default withRouter(Index);