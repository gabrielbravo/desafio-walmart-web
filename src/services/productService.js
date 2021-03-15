import axios from 'axios';

export const API_getProducts = async () => {
    let response = null;
    const url = `${process.env.REACT_APP_API_RIPLEY}/product`;
    await axios.get(url)
    .then(res => response = res)
    .catch(error => { throw error })  
    
    return response;
};

export const API_saveProduct = async(product) => {
    const { code, 
        name, 
        description, 
        brand,
        price,
        image } = product;

    let response = null;
    const url = `${process.env.REACT_APP_API_RIPLEY}/product`;
    await axios.post(url, {
        code, 
        name, 
        description, 
        brand,
        price,
        image
    })
    .then(res => response = res )
    .catch(error => {
       throw error; 
    }); 

    return response;
}

export const API_updateProduct = async(product) => {
    const { 
        id,
        code, 
        name, 
        description, 
        brand,
        price,
        image } = product;

    let response = null;
    const url = `${process.env.REACT_APP_API_RIPLEY}/product/${id}`;
    await axios.put(url, {
        code, 
        name, 
        description, 
        brand,
        price,
        image
    })
    .then(res => response = res )
    .catch(error => {
       throw error; 
    }); 

    return response;
}

export const API_deleteProduct = async(product) => {
    const { _id } = product;

    let response = null;
    const url = `${process.env.REACT_APP_API_RIPLEY}/product/${_id}`;
    await axios.delete(url)
    .then(res => response = res )
    .catch(error => {
       throw error; 
    }); 

    return response;
}

export const API_uploadIMage = async(image) => {
    let response = null;
    const url = `${process.env.REACT_APP_API_RIPLEY}/upload`;
    await axios.post(url, image)
    .then(res => response = res )
    .catch(error => {
       throw error; 
    }); 
    
    return response;
}