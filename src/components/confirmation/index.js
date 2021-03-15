import React from 'react';
import { Button, Dialog, Grid, Slide} from '@material-ui/core'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Confirmation = (props) => {
    
    return (
        <Dialog
        open={props.open}
        TransitionComponent={Transition}            
        //onClose={props.close}
        className="modalWrapper"
        maxWidth="lg"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Confirmación</DialogTitle>
            <DialogContent>
                <Grid className="modalBody">  
                    <p>
                        {props.mensaje}
                    </p>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Grid className="modalFooter">
                    <Button className="btn bg-secondary" onClick={props.onCancel}>
                        Cancelar
                    </Button>
                    <Button 
                    variant="contained" 
                    className= {props.working ? 'btn btn-radius btn-disabled' : 'bg-success'}
                    onClick={props.onConfirm}
                    disabled={props.working}
                    >
                        {
                            props.working ? 'Espere...' : 'Confirmar'
                        }                    
                    </Button>
                </Grid>
            </DialogActions>
            
        </Dialog>
    )
}

export default Confirmation;