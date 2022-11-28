import {Grid, Card, CardMedia, CardContent, Typography} from '@mui/material';
import React, {PureComponent} from 'react';
import '../App/App.css';
import PreviewComp from "./PreviewComp";

export default class GridCardComp extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            preview_open: false,
            current_index: 0
        }
    }

    handlePreviewOpen() {
        this.setState({preview_open: true})
    }

    handlePreviewClose = () => {
        this.setState({preview_open: false})
    }

    dot(index) {
        // console.log(index)
        this.state.current_index = index;
        this.handlePreviewOpen()
        console.log(this.state.preview_open)
    }

    render() {
        return (
            <div>
                <PreviewComp dataToPass={this.props.data[this.state.current_index]} is_open={this.state.preview_open} func={this.handlePreviewClose}/>
                <Grid style={{height: '90vh'}} container spacing={4} padding={2}>
                    {this.props.data.map((card, index) => (
                        <Grid item key={card.artworkid} xs="3">
                            <Card>
                                <CardMedia
                                    className='cardMedia'
                                    image={card.url}
                                    onClick={() => this.dot(index)}
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