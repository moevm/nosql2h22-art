import {Grid, Card, CardMedia, CardContent, Typography} from '@mui/material';
import React, {PureComponent} from 'react';
import '../App/App.css';
import PreviewComp from "./PreviewComp";

function itemInRow(num_items){
    return((num_items % 3) > (num_items % 4) ? 3 : 4);
}

export default class GridCardComp extends PureComponent {
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
                <Grid style={{height: '90vh', overflowY: 'scroll'}} container spacing={4} padding={2}>
                    {this.props.data.map((card) => (
                        <Grid item key={card.id} xs= {itemInRow(this.props.data.length)}>
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