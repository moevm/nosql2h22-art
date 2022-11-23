import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions,
    Button,
    FormGroup,
    FormControlLabel,
    Checkbox,
    TextareaAutosize
} from '@mui/material';
import React from 'react';
import '../App/App.css';
import {WrapText} from "@mui/icons-material";

export default class DescriptionEditor extends React.Component {
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