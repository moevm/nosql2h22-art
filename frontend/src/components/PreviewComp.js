import {Button, Dialog, DialogContent, Grid, Typography} from '@mui/material';
import React, {PureComponent} from 'react';
import '../App/App.css';
import DescriptionViewer from "./DescriptionViewer";

export default class PreviewComp extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            desc_editor: false
        }
        this.handleDescOpen = this.handleDescOpen.bind(this);
        this.handleDescClose = this.handleDescClose.bind(this);
    }

    handleDescOpen(){
        this.setState({desc_editor: true});
    }

    handleDescClose(descriptionData){
        if (typeof descriptionData === "string")
            this.props.description = descriptionData;
        this.setState({desc_editor: false});
    }

    render() {
        if(this.props.dataToPass !== undefined) {
            return (
                <>
                    <div>
                        <img src={this.props.dataToPass.url} style={{width: '400px', height: '400px'}}/>
                    </div>
                    <div>
                        <b>Name:</b>
                        <Typography> {this.props.dataToPass.name}</Typography>
                        <p></p>
                    </div>
                    <div>
                        <b>Author:</b>
                        <Typography>{this.props.dataToPass.author}</Typography>
                        <p></p>
                    </div>
                    <div>
                        <b>Start year:</b>
                        <Typography> {this.props.dataToPass.start_year}</Typography>
                        <p></p>
                    </div>
                    <div>
                        <b>End year:</b>
                        <Typography> {this.props.dataToPass.end_year}</Typography>
                        <p></p>
                    </div>
                    <div>
                        <b>Museum:</b>
                        <Typography> {this.props.dataToPass.museum_name}</Typography>
                        <p></p>
                    </div>
                    <div>
                        <b>Genre:</b>
                        <Typography> {this.props.dataToPass.genre}</Typography>
                        <p></p>
                    </div>
                    <div>
                        <b>Materials:</b>
                        <Typography> {this.props.dataToPass.materials}</Typography>
                        <p></p>
                    </div>
                    <div>
                        <b>Type:</b>
                        <Typography> {this.props.dataToPass.type}</Typography>
                        <p></p>
                    </div>
                    <Grid item xs={12}>
                        <Button variant='outlined' color='primary'  onClick={this.handleDescOpen}>Description</Button>
                        <DescriptionViewer dataToPass={this.props.dataToPass.description} is_open={this.state.desc_editor} func={this.handleDescClose} />
                    </Grid>
                </>
            );
        }
    }
}