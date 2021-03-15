import {
    PRODUCTS_GET_START_ASYNC,
    PRODUCTS_GET_SUCCESS,
    PRODUCT_SAVE_START_ASYNC,
    PRODUCT_SAVE_SUCCESS,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_DELETE_START_ASYNC,
    PRODUCT_DELETE_SUCCESS,
    UPLOAD_START_ASYNC,
    UPLOAD_SUCCESS,
    PRODUCTS_ERROR
} from './constants';

export const initialState = {  
    loading: true,
    error: false, 
    message: '',
    products: null,
    saving: false,
    deleting: false,
    image: ''
};

export const ProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case PRODUCTS_GET_START_ASYNC:            
            return { 
                ...state, 
                loading: true ,
                error: false
            };

        case PRODUCTS_GET_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload
            }

        case PRODUCT_SAVE_START_ASYNC:
            return { 
                ...state, 
                saving: true,
                error: false
            };

        case PRODUCT_SAVE_SUCCESS:
            return {
                ...state,
                saving: false,
                error: false,
                products: [{...action.payload}, ...state.products]
            }

        case PRODUCT_UPDATE_SUCCESS: 
            const updatedProducts = state.products.map(p => { return p._id===action.payload._id ? p=action.payload : p  })  

            return {
                ...state,
                saving: false,
                error: false,
                products: updatedProducts,
            }

        case PRODUCT_DELETE_START_ASYNC: 
            return {
                ...state,
                error: false,
                deleting: true
            }

        case PRODUCT_DELETE_SUCCESS:
            const newProducts = state.products.filter(p => p._id !== action.payload._id);

            return {
                ...state,
                deleting: false, 
                error: false,
                products: newProducts
            }

        case UPLOAD_START_ASYNC:
            return {
                ...state,
                loading: true,
                error: false
            }

        case UPLOAD_SUCCESS: 
            return {
                ...state,
                image: action.payload
            }

        case PRODUCTS_ERROR:
            return {
                ...state,
                loading: false,
                saving: false,
                deleting: false,
                error: true,
                message: action.payload
            }
        
        default:
            return state;

    }
}