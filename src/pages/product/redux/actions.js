import {
    PRODUCTS_GET_START,
    PRODUCTS_GET_SUCCESS,
    PRODUCTS_GET_START_ASYNC,

    PRODUCT_SAVE_START,
    PRODUCT_SAVE_START_ASYNC,
    PRODUCT_SAVE_SUCCESS,
    PRODUCT_UPDATE_SUCCESS,

    PRODUCT_DELETE_START,
    PRODUCT_DELETE_START_ASYNC,
    PRODUCT_DELETE_SUCCESS,

    UPLOAD_START,
    UPLOAD_START_ASYNC,
    UPLOAD_SUCCESS,

    PRODUCTS_ERROR
} from './constants';

export const getProducts = (fnAction) => ({
    type: PRODUCTS_GET_START,    
    payload: {fnAction}
});

export const getProductsAsync = () => ({
    type: PRODUCTS_GET_START_ASYNC
});

export const getProductosSuccess = (products) => ({
    type: PRODUCTS_GET_SUCCESS,
    payload: products
});

export const saveProduct = (product, fnAction) => ({
    type: PRODUCT_SAVE_START,    
    payload: {product, fnAction}
});

export const saveProductAsync = () => ({
    type: PRODUCT_SAVE_START_ASYNC
});

export const saveProductSuccess = (product) => ({
    type: PRODUCT_SAVE_SUCCESS,
    payload: product
});

export const updateProductSuccess = (product) => ({
    type: PRODUCT_UPDATE_SUCCESS,
    payload: product
});

export const deleteProduct = (product, fnAction) => ({
    type: PRODUCT_DELETE_START,    
    payload: {product, fnAction}
});

export const deleteProductAsync = () => ({
    type: PRODUCT_DELETE_START_ASYNC
});

export const deleteProductSuccess = (product) => ({
    type: PRODUCT_DELETE_SUCCESS,
    payload: product
})

export const uploadImage = (image, fnAction) => ({
    type: UPLOAD_START,
    payload: { image, fnAction }
})

export const uploadImageAsync = () => ({
    type: UPLOAD_START_ASYNC
})

export const uploadImageSuccess = (image) => ({
    type: UPLOAD_SUCCESS,
    payload: { image }
})

export const productsError = (error) => ({
    type: PRODUCTS_ERROR,
    payload: error
})