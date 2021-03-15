import React, { useState, forwardRef, useImperativeHandle } from 'react';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Dialog, Grid, Slide } from '@material-ui/core'
import { toast } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import { saveProduct, uploadImage } from '../redux/actions';
import Input from '../../../components/input/loadable';
import Upload from '../../../components/upload/loadable';
import Button from '../../../components/button/loadable';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ProductDetail = forwardRef((props, ref) => {
    const [id, setId] = useState('');
    const [code, setCode] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [brand, setBrand] = useState('');
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState('');
    const [errorForm, setErrorForm] = useState({});

    const dispatch = useDispatch();
    const state = useSelector(state => state);
  
    const changeHandler = async (event) => {   
        validateProperty(event);

        event.target.name==='code' && setCode(event.target.value);
        event.target.name==='name' && setName(event.target.value);
        event.target.name==='description' && setDescription(event.target.value);
        event.target.name==='brand' && setBrand(event.target.value);

        if( event.target.name==='price') {
            if(!Number(event.target.value)) 
                setPrice('');
            else
                setPrice(event.target.value);
        }
        
        event.target.name==='image' && setImage(event.target.value);          
    };

    const validateProperty = event => {
        if(event.target.value.length > 0) {
            delete errorForm[event.target.name];
        } else {
            errorForm[event.target.name] = 'Este campo es obligatorio';
        }

        return true;
    }

    const sendhandler = async () => {
        setErrorForm(null);
        const errors = await validateForm();
        
        if(Object.keys(errors).length > 0) return;

        const product = {
            id,
            code,
            name,
            description,
            brand,
            price,
            image
        };

        dispatch(saveProduct(product, sendHandlerAction))
    }

    const sendHandlerAction = (error, message) => {
        if(error) {
            toast.error(message)
        } else {
            cleanForm();
            props.handleClose();
            toast.success('El Producto fue guardado')
        }
    }

    useImperativeHandle(ref, () => ({
        cleanForm: () => {
            cleanForm()
        },
        setProductData: (product) => {
            setProductData(product)
        }
    }));

    const cleanForm = () => {
        setCode('');
        setName('');
        setDescription('');
        setBrand('');
        setPrice('');
        setImage('');
    }

    const setProductData = product => {
        setId(product._id);
        setCode(product.code);
        setName(product.name);
        setDescription(product.description);
        setBrand(product.brand);
        setPrice(product.price);
        setImage(product.image);
    }

    const validateForm = async () => {
        let errors = {};

        if(code==='') {
            errors['code'] = 'Debe ingresar código del Producto';
        }   

        if(name==='') {
            errors['name'] = 'Debe ingresar nombre del Producto';
        }

        if(description==='') {
            errors['description'] = 'Debe ingresar descripción del Producto';
        }

        if(brand==='') {
            errors['brand'] = 'Debe ingresar Marca del Producto';
        }

        if(price==='' || price===0) {
            errors['price'] = 'Debe ingresar Precio del Produto';
        } 

        setErrorForm(errors);
        return errors;
    }

    const handleChangeImage = event => {
        const data = new FormData();
        data.append('file', event.target.files[0]);

        dispatch(uploadImage(data, uploadImageAction));
    }

    const uploadImageAction = (error, message) => {
        if(error) {
            toast.error(message);
        } else {
            toast.success('Imagen cargada');
            setImage(message.path);
        }
    }

  return (
    <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        TransitionComponent={Transition}     
        className="modalWrapper"
        maxWidth="sm"
    >
        <DialogTitle id="alert-dialog-title">Detalle de Producto</DialogTitle>
        <DialogContent>
            <Grid className="modalBody">   
                <Grid container spacing={3}>
                    <Grid item sm={12} xs={12}>       
                        <Input
                            name="code"
                            label="Código (*)"
                            placeholder="Ej. COD1"
                            onChange={changeHandler}
                            value={code}
                            error={errorForm.code && true}
                            helperText={errorForm.code && errorForm.code}
                        />      
                    </Grid>         
                    <Grid item sm={12} xs={12}>       
                        <Input
                            name="name"
                            label="Nombre (*)"
                            placeholder="Ej. Producto Uno"
                            onChange={changeHandler}
                            value={name}
                            error={errorForm.name && true}
                            helperText={errorForm.name && errorForm.name}
                        />      
                    </Grid>     
                    <Grid item sm={12} xs={12}>       
                        <Input
                            name="description"
                            label="Descripción (*)"
                            placeholder="Ej. Detallde del Producto"
                            onChange={changeHandler}
                            value={description}
                            error={errorForm.description && true}
                            helperText={errorForm.description && errorForm.description}
                        />      
                    </Grid>    
                    <Grid item sm={12} xs={12}>       
                        <Input
                            name="brand"
                            label="Marca (*)"
                            placeholder="Ej. Mi Marca"
                            onChange={changeHandler}
                            value={brand}
                            error={errorForm.brand && true}
                            helperText={errorForm.brand && errorForm.brand}
                        />      
                    </Grid>   
                    <Grid item sm={12} xs={12}>       
                        <Input
                            name="price"
                            label="Precio (*)"
                            placeholder="Ej. 9990"
                            onChange={changeHandler}
                            value={price}
                            error={errorForm.price && true}
                            helperText={errorForm.price && errorForm.price}

                        />      
                    </Grid>    
                    <Grid item sm={12} xs={12}>       
                        <Upload
                        name="image"
                        handleChange={handleChangeImage}
                        />      
                    </Grid>  
                    
                </Grid>
            </Grid>
        </DialogContent>
        <DialogActions>
            <Button 
            color="default" 
            handleclick={props.handleClose}
            text="Cancelar"
            working={false}
            textWorking=""
            />

            <Button 
            color="primary" 
            handleclick={sendhandler} 
            autoFocus
            disabled={state.ProductReducer ? state.ProductReducer.saving : false}
            working={state.ProductReducer ? state.ProductReducer.saving : false}
            text="Guardar"
            textWorking="Guardando..."
            />

        </DialogActions>
    </Dialog>
  );
});

export default ProductDetail;