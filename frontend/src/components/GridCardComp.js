import {Grid, Card, CardMedia, CardContent, Typography} from '@mui/material';
import React, {PureComponent} from 'react';
import '../App/App.css';

export default class GridCardComp extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {}
    }

    dot(index) {
        this.props.curIndexChange(index);
    }

    set_page = (e) => {
        e.preventDefault();
        this.props.setPage(parseInt(e.target.id))
    }

    render() {
        return (
            <div>
                <Grid style={{height: '80vh'}} container spacing={4} padding={2}>
                    {this.props.data.map((card, index) => (
                        <Grid item key={card.id} xs="3">
                            <Card onClick={() => this.dot(index)}>
                                <CardMedia
                                    className='cardMedia'
                                    image={card.url}
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
                    <Grid xs="12" display={"flex"} justifyContent={"center"}>
                        {this.props.page - 5 >= 1
                            ? <p style={{margin: '0'}}>...</p>
                            : <p/>
                        }
                        {((rows, i, len) => {
                            while (++i <= len) {
                                if (i >= 1 && i <= this.props.total / 12 + 1 && (i - 1) !== this.props.total / 12) {
                                    if (i != this.props.page) {
                                        rows.push(<a id={i} onClick={this.set_page} href=""
                                                     style={{margin: "0 3px 0 3px"}}>{i}</a>)
                                    } else {
                                        rows.push(<a style={{margin: "0 3px 0 3px"}}>{i}</a>)
                                    }
                                }
                            }
                            return rows;
                        })([], this.props.page - 5, this.props.page + 5)}
                        {this.props.page + 5 <= this.props.total / 12
                            ? <p style={{margin: '0'}}>...</p>
                            : <p/>
                        }
                    </Grid>
                </Grid>
            </div>
        );
    }
}