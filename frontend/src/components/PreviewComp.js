import {Dialog, DialogContent, Typography} from '@mui/material';
import React, {PureComponent} from 'react';
import '../App/App.css';
import EditorComp from "./EditorComp";


export default class PreviewComp extends PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        if(this.props.dataToPass !== undefined) {
            console.log(this.props.dataToPass);
            return (
                <Dialog open={this.props.is_open} onClose={this.props.func} aria-labelledby="form-dialog-title">
                    <DialogContent>
                        <div>
                            <img src={this.props.dataToPass.url} style={{width: '400px', height: '400px'}}/>
                        </div>
                        <div>
                            <Typography> {this.props.dataToPass.name}</Typography>
                            <Typography>{this.props.dataToPass.author}</Typography>
                        </div>
                        <div>
                            <p>Genre:</p>
                            <Typography> {this.props.dataToPass.genre}</Typography>
                        </div>
                        <div>
                            <p>Materials:</p>
                            <Typography> {this.props.dataToPass.materials}</Typography>
                        </div>
                        <div>
                            <p>Museum:</p>
                            <Typography> {this.props.dataToPass.museum_name}</Typography>
                        </div>
                        <div>
                            <p>Type:</p>
                            <Typography> {this.props.dataToPass.type}</Typography>
                        </div>
                    </DialogContent>
                </Dialog>
            );
        }
    }
}