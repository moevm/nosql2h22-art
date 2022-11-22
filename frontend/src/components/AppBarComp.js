import { AppBar, Button, Container, IconButton, Toolbar, Typography, Select, InputLabel, MenuItem, FormControl} from '@mui/material'
import {Component} from 'react';
import '../App/App.css';
import { Box } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu'


export default class AppBarComp extends Component{
    constructor(props){
        super(props)
        this.state = {
          
        }
        //this.handleLogInOpen = this.handleLogInOpen.bind(this)
    }
    /*handleLocalChange(value){
      this.setState({
        localisation: value
      });
    }*/
    render(){
        return(
        <div className="App">
          <AppBar position='fixed'>
            <Container fixed>
              <Toolbar>
                <IconButton edge = "start" color = "inherit" aria-label = "menu" className='menuButton'>
                  <MenuIcon/>
                </IconButton>
                <Typography variant='h6' className='title' align='left'>Paintings</Typography>
                <Box mr={3}>
                  <Button variant='outlined' color='inherit' onClick={this.handleLogInOpen}>Import</Button>
                </Box>
                <Box mr={3}>
                  <Button color='secondary' variant='contained' align='right' onClick={this.handleSignUpOpen}>Develop</Button>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
        </div>
    );
    }
}