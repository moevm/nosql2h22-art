import {Button, Dialog, DialogActions, DialogContent, TextareaAutosize} from '@mui/material';
import React, {PureComponent} from 'react';
import '../App/App.css';

export default class DescriptionEditor extends PureComponent {
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
                    <TextareaAutosize onChange={(e) => {
                        this.setState({description: e.target.value})
                    }}
                                      autoFocus={true}
                                      defaultValue={this.props.dataToPass}
                                      label={'Description'}
                                      id='Description'
                                      fullWidth={true}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        this.props.func(this.state.description)
                    }} color="success" variant="contained">Save</Button>
                </DialogActions>
            </Dialog>
        );
    }
}