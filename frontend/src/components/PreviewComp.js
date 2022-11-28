import {Dialog, DialogContent, Typography} from '@mui/material';
import React, {PureComponent} from 'react';
import '../App/App.css';
import EditorComp from "./EditorComp";


export default class PreviewComp extends PureComponent {
    constructor(props) {
        super(props)

    }

    render() {
        let data = this.props.dataToPass;
        // console.log(data.URL);
        return (
            <Dialog open={this.props.is_open} onClose={this.props.func} aria-labelledby="form-dialog-title">
                <DialogContent>
                    <div>
                        <img src="" style={{width: '400px', height: '400px'}}/>
                    </div>
                    <div>
                        <Typography>{}</Typography>
                        <Typography>{}</Typography>
                    </div>
                    <div>
                        <p>Genre:</p>
                        <Typography>{}</Typography>
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