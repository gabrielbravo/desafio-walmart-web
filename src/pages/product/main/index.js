import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from '../../../utils/injectSaga';
import { getProducts, deleteProduct } from '../redux/actions';
import { withRouter } from "react-router-dom";
import saga from '../redux/saga';

import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Loading from '../../../components/loading';
import { toast } from 'react-toastify';

import ProdutList from '../list/loadable';
import ProductDetail from '../detail/';
import Confirmation from '../../../components/confirmation/loadable';

const useStyles = makeStyles((theme) => ({
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        width: '100%',
        color: '#3f51b5'
    },

  }));

const Index = () => {
    const classes = useStyles();
    const [openDetail, setOpenDetail] = useState(false);
    const [isConfirmShown, setIsConfirmShown] = useState(false);
    const [confirmMessage, setConfirmMessage] = useState('');
    const [productDelete, setProductDelete] = useState(null);

    useInjectSaga({ key: 'ProductsSaga', saga });
    const dispatch = useDispatch();
    const state = useSelector(state => state);
    const productDetailRef = useRef();

    useEffect(() => {
        dispatch(getProducts(getProductsAction));
    }, [])

    const getProductsAction = (error, message) => {
        if(error) {
            toast.error(message)
        }
    }

    const openProductDetail = () => {
        productDetailRef && productDetailRef.current.cleanForm();
        setOpenDetail(true);
    }

    const loadDataProduct = product => {
        productDetailRef && productDetailRef.current.setProductData(product);
        setOpenDetail(true);
    }

    const showConfirmDeleteProduct = product => {
        setConfirmMessage( `¿Está seguro de eliminar el Producto ${product.name}?`);
        setIsConfirmShown(true);
        setProductDelete(product);
    }

    const cancelConfirmDeleteProduct = () => {
        setIsConfirmShown(false);
        setProductDelete(null);
    }

    const confirmDeleteProduct = () => {
        dispatch(deleteProduct(productDelete, deleteProductAction));
    }

    const deleteProductAction = (error, message) => {
        if(error) {
            toast.error(message)
        } else {
            setIsConfirmShown(false);
            toast.success('El Producto fue eliminado')
        }
    }

    return (
        <Grid container spacing={1} >
            <Grid item xs={8} style={{ textAlign: 'center', padding: 20 }}>
                <Typography className={classes.title} variant="h5" noWrap>
                    Listado de Productos
                </Typography>
            </Grid>
            <Grid item xs={4} style={{ textAlign: 'right', padding: 20  }}>
                    <Button variant="contained" color="primary" onClick={openProductDetail} >Crear Producto</Button>
                </Grid>
            <Grid item xs={12} >
                {
                    // state.ProductReducer.error ?
                    // <h3>{ state.ProductReducer.message }</h3>
                    // :
                    state.ProductReducer.loading ?
                    <Loading />
                    :
                    state.ProductReducer.products.length===0 ?
                    <h3>No hay productos creados</h3>
                    :
                    <ProdutList 
                    products={state.ProductReducer.products} 
                    loadDataProduct={loadDataProduct}
                    confirmDeleteProduct={showConfirmDeleteProduct}
                    />
                }
                
                
            </Grid>

            <ProductDetail 
            ref={productDetailRef}
            open={openDetail}
            handleClose={() => setOpenDetail(false)}
            />

            <Confirmation 
            open={isConfirmShown}
            mensaje={confirmMessage}
            onCancel={cancelConfirmDeleteProduct}
            onConfirm={confirmDeleteProduct}
            working={state.ProductReducer.deleting}
            />
        </Grid>
    )
}

export default withRouter(Index);
