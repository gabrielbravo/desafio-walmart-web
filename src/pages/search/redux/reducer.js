import {
    SEARCH_GET_START_ASYNC, 
    SEARCH_GET_SUCCESS, 
    GETBY_CODE_START_ASYNC,
    GETBY_CODE_SUCCESS,
    SEARCH_ERROR
} from './constants';

export const initialState = {  
    loading: true,
    error: false, 
    message: '',
    products: [],
    product: null
};


export const SearchReducer = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_GET_START_ASYNC:            
            return { 
                ...state, 
                loading: true ,
                error: false
            };

        case SEARCH_GET_SUCCESS:
            const { products, page } = action.payload;
            let newList = [];

            page === 1 ? newList = products : newList = [...state.products, ...products] 

            return {
                ...state,
                loading: false,
                products: newList
            }

        case GETBY_CODE_START_ASYNC:
            return {
                ...state,
                loading: true,
                error: false
            }
        
        case GETBY_CODE_SUCCESS: 
            return {
                ...state,
                loading: false,
                product: action.payload
            }

        case SEARCH_ERROR:
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