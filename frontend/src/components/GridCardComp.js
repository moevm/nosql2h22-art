import {Grid, Card, CardMedia, CardContent, Typography, Button, Container, CardActions} from '@mui/material';
import {Component} from 'react';
import '../App/App.css';

export default class GridCardComp extends Component{
  constructor(props){
    super(props)
    this.state = {

    }
  }
  render(){
    return (
        <div className='cardContainer'>
          <Grid container spacing={4}>
            {this.props.data.map((card)=>(
              <Grid item key = {card.id} xs="16" sm="9" md="3">
                <Card className='card'>
                  <CardMedia
                    className='cardMedia'
                    image= {card.image}
                  />
                  <CardContent className="cardContent">
                    <Typography variant='h5' gutterBottom>
                      {card.name}
                    </Typography>
                    <Typography variant='h7' gutterBottom>
                      {card.author}
                    </Typography>
                  </CardContent>
                  <CardActions>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>  
    );
  }
}