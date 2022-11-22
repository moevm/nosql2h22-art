import {Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, FormGroup, FormControlLabel, Checkbox} from '@mui/material';
import React from 'react';
import '../App/App.css';

export default class DescriptionEditor extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            
        }
    }
    render(){ 
        return (
            <Dialog open={this.props.is_open} onClose={this.props.func} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Description</DialogTitle>
                <DialogContent>
                    <DialogContentText></DialogContentText>
                    <textarea
                        autoFocus={true}
                        margin='dense'
                        id='name'
                        label="Email Adress"
                        type="email"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.func} color="success" variant="contained">Save</Button>
                </DialogActions>
            </Dialog>
        );
    }
}