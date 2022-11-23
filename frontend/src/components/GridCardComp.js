import {Grid, Card, CardMedia, CardContent, Typography, Button, Container, CardActions} from '@mui/material';
import React, {Component} from 'react';
import '../App/App.css';
import PreviewComp from "./PreviewComp";

export default class GridCardComp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            preview_open: false
        }
    }

    handlePreviewOpen() {
        this.setState({preview_open: true})
    }

    handlePreviewClose = () => {
        this.setState({preview_open: false})
    }

    dot(id) {
        console.log(id)
        this.handlePreviewOpen()
        console.log(this.state.preview_open)
    }

    render() {
        return (
            <div>
                <PreviewComp is_open={this.state.preview_open} func={this.handlePreviewClose}/>
                <Grid style={{height: '90vh'}} container spacing={4} padding={2}>
                    {this.props.data.map((card) => (
                        <Grid item key={card.id} xs="3">
                            <Card>
                                <CardMedia
                                    className='cardMedia'
                                    image={card.image}
                                    onClick={() => this.dot(card.id)}
                                />
                                <CardContent className="cardContent">
                                    <Typography variant='h5' gutterBottom>
                                        {card.name}
                                    </Typography>
                                    <Typography variant='h7' gutterBottom>
                                        {card.author}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        );
    }
}