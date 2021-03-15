import axios from 'axios';

export const API_searchProducts = async (text, page) => {
    let response = null;
    const url = `${process.env.REACT_APP_API_WALMART}/search?text=${text}&page=${page}`;
    await axios.get(url)
    .then(res => response = res)
    .catch(error => { throw error })  
    
    return response;
};

export const API_getByCode = async (code) => {
    let response = null;
    const url = `${process.env.REACT_APP_API_WALMART}/product/${code}`;
    await axios.get(url)
    .then(res => response = res)
    .catch(error => { throw error })  
    
    return response;
};