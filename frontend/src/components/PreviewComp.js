import {Dialog, DialogTitle, DialogContent, DialogContentText, Typography} from '@mui/material';
import React from 'react';
import '../App/App.css';

export default class PreviewComp extends React.Component {
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
                    <div>
                        <img src="https://source.unsplash.com/random"/>
                    </div>
                    <div>
                        <Typography>Morning in a pine forest</Typography>
                        <Typography>Shishkin Ivan Ivanovich</Typography>
                    </div>
                    <div>
                        <p>Genre:</p>
                        <Typography></Typography>
                    </div>
                    <div>
                        <p>Materials:</p>
                        <Typography></Typography>
                    </div>
                    <div>
                        <p>Museum:</p>
                        <Typography></Typography>
                    </div>
                    <div>
                        <Typography></Typography>
                    </div>
                </DialogContent>
            </Dialog>
        );
    }
}