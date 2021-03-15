import { takeLatest, put, delay, call } from 'redux-saga/effects';
import { 
    PRODUCTS_GET_START, 
    PRODUCT_SAVE_START, 
    PRODUCT_DELETE_START, 
    UPLOAD_START  } from './constants';

import { 
    getProductsAsync,
    getProductosSuccess, 
    saveProductAsync,
    saveProductSuccess,
    updateProductSuccess,
    deleteProductAsync,
    deleteProductSuccess,
    productsError 
} from './actions';

import { 
    API_getProducts, 
    API_saveProduct, 
    API_updateProduct,
    API_deleteProduct,
    API_uploadIMage
} from './../../../services/productService';

export default function* ProductsSaga() {
    yield takeLatest(PRODUCTS_GET_START, loadProducts);
    yield takeLatest(PRODUCT_SAVE_START, saveProduct);
    yield takeLatest(PRODUCT_DELETE_START, deleteProduct);
    yield takeLatest(UPLOAD_START, uploadImage)
}

function* loadProducts({ payload }) {
    const { fnAction } = payload;

    yield put(getProductsAsync());
    yield delay(1000);
    try{
        const response = yield call(API_getProducts);
        if(response.status===200){
            yield put(getProductosSuccess(response.data.products));
            fnAction(false,'');
        }
        else{
            yield put(productsError(response.data.message));
            fnAction(true, 'Error al obtener los productos');
        }
    } catch(ex) {
        fnAction(true, 'Ocurrió un error al obtener el listado de Productos, intente nuevamente');
        yield put(productsError(ex.response.data.message));
    }
}

function* saveProduct({ payload }) {
    const { product, fnAction } = payload;

    yield put(saveProductAsync());
    yield delay(1000);

    try {
        let response = null

        if(product.id) {
            response = yield call(API_updateProduct, product);
            if(response.status===200) {
                yield put(updateProductSuccess(response.data));
                fnAction(false, '');
            } else {
                yield put(productsError(response.data.message));
                fnAction(true, response.data.message);
            }
        }
        else {
            response = yield call(API_saveProduct, product);
            if(response.status===201) {
                yield put(saveProductSuccess(response.data));  
                fnAction(false, '');
            } else {
                yield put(productsError(response.data.message));
                fnAction(true, response.data.message);
            }
            
        }
    } catch(ex) {
        fnAction(true, ex.response.data.message);
        yield put(productsError('Ocurrió un error al guardar el producto, intente nuevamente'));
    }
}

function* deleteProduct({payload}) {
    const { product, fnAction } = payload;
    yield put(deleteProductAsync());
    yield delay(1000);

    try {
        const response = yield call(API_deleteProduct, product);
        if(response.status===200) {
            yield put(deleteProductSuccess(response.data));
            fnAction(false, '');
        } else {
            yield put(productsError(response.data.message));
            fnAction(true, response.data.message);
        }
    } catch(ex) {
        yield put(productsError('Ocurrió un error al eliminar el producto, intente nuevamente'));
    }
}

function* uploadImage({payload}){
    const {image, fnAction} = payload;

    try {
        const response = yield call(API_uploadIMage, image);

        if(response.status===200) {
            fnAction(false, response.data.file);
        } else {
            fnAction(true, response.data.message);
        }
    } catch(ex) {
        console.log(ex);
        fnAction(true, ex.response ? ex.response.data.message : 'Error al enviar imagen');
    }
}