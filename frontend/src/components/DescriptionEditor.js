import {
    Dialog,
    DialogContent,
    DialogActions,
    Button,
    TextareaAutosize
} from '@mui/material';
import React, {PureComponent} from 'react';
import '../App/App.css';

export default class DescriptionEditor extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Dialog open={this.props.is_open} onClose={this.props.func}>
                <DialogContent sx={{width: '25vw', height: '25vh'}}>
                    <TextareaAutosize
                        autoFocus={true}
                        label={'Description'}
                        id='Description'
                        fullWidth={true}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.func} color="success" variant="contained">Save</Button>
                </DialogActions>
            </Dialog>
        );
    }
}