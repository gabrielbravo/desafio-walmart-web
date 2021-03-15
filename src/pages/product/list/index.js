import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ProdutList(props) {
  const {products} = props;
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Código</TableCell>
            <TableCell align="left">Nombre</TableCell>
            <TableCell align="left">Marca</TableCell>
            <TableCell align="left">Precio</TableCell>
            <TableCell align="left">Imagen</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((p) => (
            <TableRow key={p.code}>
              <TableCell align="left">{p.code}</TableCell>
              <TableCell align="left">{p.name}</TableCell>
              <TableCell align="left">{p.brand}</TableCell>
              <TableCell align="left">{p.price}</TableCell>
              <TableCell align="left">
                {
                  p.image && p.image.length>0 ? 
                    <img src={`${process.env.REACT_APP_API_RIPLEY}/${p.image}`} width="70" alt={p.name} />
                  :
                    <img src='noimage.png' width="70" alt="Imagen no disponible" />
                }
                
                
              </TableCell>
              <TableCell>
                <Button onClick={() => props.loadDataProduct(p)}>
                  <Edit color="primary" />
                </Button>
                <Button onClick={() => props.confirmDeleteProduct(p)}  >
                  <Delete color="primary" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}