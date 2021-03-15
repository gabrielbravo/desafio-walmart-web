import { 
    SEARCH_GET_START, 
    SEARCH_GET_START_ASYNC, 
    SEARCH_GET_SUCCESS, 
    GETBY_CODE_START,
    GETBY_CODE_START_ASYNC,
    GETBY_CODE_SUCCESS,
    SEARCH_ERROR } from './constants';

export const searchProducts = (filter, page, fnAction, isFilter) => ({
    type: SEARCH_GET_START,    
    payload: {filter, page, fnAction, isFilter}
});

export const searchProductsAsync = () => ({
    type: SEARCH_GET_START_ASYNC
});

export const searchProductsSuccess = (products, page) => ({
    type: SEARCH_GET_SUCCESS,
    payload: { products, page }
});

export const getByCode = code => ({
    type: GETBY_CODE_START,
    payload: code
});

export const getByCodeAsync = () => ({
    type: GETBY_CODE_START_ASYNC
});

export const getByCodeSuccess = product => ({
    type: GETBY_CODE_SUCCESS,
    payload: product
});

export const searchError = (error) => ({
    type: SEARCH_ERROR,
    payload: error
})