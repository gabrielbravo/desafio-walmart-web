import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './../../components/header';

import Busqueda from './../search/main/loadable';
import ListaProductos from '../product/main/loadable';
import Detalle from './../search/detail/loadable';
import NotFound from '../notFound/index';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';



const Routes = () => {
    
    return (
        <Fragment>
            <Router>
                <CssBaseline />
                <Container maxWidth="xl">
                    <Header />
                </Container>
                <Container maxWidth="md">
                    <Switch>
                        <Route path="/" exact component={Busqueda} />
                        <Route path="/busqueda" exact component={Busqueda} />
                        <Route path="/productos" exact component={ListaProductos} />
                        <Route path="/producto/:code" exact component={Detalle} />
                        <Route component={NotFound} />
                    </Switch>
                </Container>
            </Router>
            
        </Fragment>
    )
}

export default Routes;