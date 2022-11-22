import {Grid, Card, CardMedia, CardContent, Typography, Button, Container, CardActions} from '@mui/material';
import '../App/App.css';

function GridCardComp(){
  const cards = [1,2,3,4,5,6,7,8,9,10,11,12]
    return (
        <div className='cardContainer'>
          <Grid container spacing={4}>
            {cards.map((card)=>(
              <Grid item key = {card} xs="16" sm="9" md="3">
                <Card className='card'>
                  <CardMedia
                    className='cardMedia'
                    image="https://source.unsplash.com/random"
                  />
                  <CardContent className="cardContent">
                    <Typography variant='h5' gutterBottom>
                      Название
                    </Typography>
                    <Typography variant='h7' gutterBottom>
                      Автор
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

export default GridCardComp;