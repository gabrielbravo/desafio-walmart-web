import { takeLatest, put, delay, call } from 'redux-saga/effects';
import { SEARCH_GET_START, GETBY_CODE_START  } from './constants';
import { 
    searchProductsAsync,
    searchProductsSuccess,
    getByCodeSuccess,
    searchError
} from './actions';

import { 
    API_searchProducts,
    API_getByCode
} from './../../../services/searchService';

export default function* SearchSaga() {
    yield takeLatest(SEARCH_GET_START, searchProducts);
    yield takeLatest(GETBY_CODE_START, getByCode);
}

function* searchProducts({ payload }) {
    const { filter, page, fnAction, isFilter } = payload;

    yield put(searchProductsAsync());
    yield delay(1000);
    try{
        const response = yield call(API_searchProducts, filter, page);
        console.log(response)
        if(response.status===200){
            yield put(searchProductsSuccess(response.data, page));
            fnAction(false,'', isFilter, response.data);
        }
        else{
            yield put(searchError(response.data.message));
            fnAction(true, 'Error al obtener los productos', isFilter, null);
        }
    } catch(ex) {
        console.log('ex',ex)
        fnAction(true, 'Ocurrió un error al obtener el listado de Productos, intente nuevamente', isFilter, null);
        yield put(searchError(ex.response ? ex.response.data.message : 'Error General'));
    }
}

function* getByCode({payload}) {
    try {
        yield put(searchProductsAsync());
        yield delay(1000);

        const response = yield call(API_getByCode, payload);
        if(response.status===200){
            yield put(getByCodeSuccess(response.data));
        }
        else{
            yield put(searchError(response.data.message));
        }
    }
    catch(ex) {
        yield put(searchError(ex.response ? ex.response.data.message : 'Error al obtener Producto'));
    }
}