import {Dialog, DialogContent, TextareaAutosize} from '@mui/material';
import React, {PureComponent} from 'react';
import '../App/App.css';

export default class DescriptionViewer extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            description: ''
        }
    }


    render() {
        return (
            <Dialog open={this.props.is_open} onClose={this.props.func}>
                <DialogContent sx={{width: '25vw', height: '25vh'}}>
                    <TextareaAutosize
                        style={{width: 550, height: 300}}
                        autoFocus={true}
                        defaultValue={this.props.dataToPass}
                        label={'Description'}
                        id='Description'
                        fullWidth={true}
                        readOnly/>
                </DialogContent>
            </Dialog>
        );
    }
}