import {Button, Grid, Typography} from '@mui/material';
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

    handleDescOpen() {
        this.setState({desc_editor: true});
    }

    handleDescClose(descriptionData) {
        if (typeof descriptionData === "string")
            this.props.description = descriptionData;
        this.setState({desc_editor: false});
    }

    render() {
        if (this.props.dataToPass !== undefined) {
            return (
                <Grid container alignItems={'center'} className='preview'>
                    <Grid item xs={12}>
                        <img src={this.props.dataToPass.url} style={{width: '400px', height: '400px'}}/>
                    </Grid>
                    <Grid item xs={6} textAlign={'right'} padding={2}>
                        <b>Name:</b>
                        <Typography> {this.props.dataToPass.name}</Typography>
                        <p></p>
                    </Grid>
                    <Grid item xs={6} textAlign={'left'} padding={2}>
                        <b>Author:</b>
                        <Typography>{this.props.dataToPass.author}</Typography>
                        <p></p>
                    </Grid>
                    <Grid item xs={6} textAlign={'right'} padding={2}>
                        <b>Start year:</b>
                        <Typography> {this.props.dataToPass.start_year}</Typography>
                        <p></p>
                    </Grid>
                    <Grid item xs={6} textAlign={'left'} padding={2}>
                        <b>End year:</b>
                        <Typography> {this.props.dataToPass.end_year}</Typography>
                        <p></p>
                    </Grid>
                    <Grid item xs={6} textAlign={'right'} padding={2}>
                        <b>Museum:</b>
                        <Typography> {this.props.dataToPass.museum_name}</Typography>
                        <p></p>
                    </Grid>
                    <Grid item xs={6} textAlign={'left'} padding={2}>
                        <b>Genre:</b>
                        <Typography> {this.props.dataToPass.genre}</Typography>
                        <p></p>
                    </Grid>
                    <Grid item xs={6} textAlign={'right'} padding={2}>
                        <b>Materials:</b>
                        <Typography> {this.props.dataToPass.materials}</Typography>
                        <p></p>
                    </Grid>
                    <Grid item xs={6} textAlign={'left'} padding={2}>
                        <b>Type:</b>
                        <Typography> {this.props.dataToPass.type}</Typography>
                        <p></p>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant='outlined' color='primary' onClick={this.handleDescOpen}>Description</Button>
                        {this.props.editor
                            ? <></>
                            : <Button variant='outlined' color='error' onClick={this.props.returnBack}>Назад</Button>
                        }
                        <DescriptionViewer dataToPass={this.props.dataToPass.description}
                                           is_open={this.state.desc_editor} func={this.handleDescClose}/>
                    </Grid>
                </Grid>
            );
        }
    }
}