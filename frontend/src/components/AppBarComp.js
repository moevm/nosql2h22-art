import {
    Button,
    Container,
    IconButton,
    Toolbar,
    Typography,
} from '@mui/material'
import {PureComponent} from 'react';
import '../App/App.css';
import {Box} from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu'

import {API_IMPORT} from "../constants";
import Axios from "axios";


export default class AppBarComp extends PureComponent {
    constructor(props) {
        super(props)
        this.onFileChange = this.onFileChange.bind(this)
        this.state = {}
    }

    onFileChange = event => {
        event.preventDefault();
        var reader = new FileReader();
        var json = null;

        if (event.target.files.length === 0) {
            return;
        }
        if (event.target.files[0].type !== "application/json") {
            alert('Wrong file format');
            return
        }
        reader.readAsText(event.target.files[0], "UTF-8");
        reader.onload = function (evt) {
            try {
                json = JSON.parse(evt.target.result);

                console.log(evt.target.result);

                Axios.post(API_IMPORT, json).then(() => {
                    window.location.reload()
                });
            } catch (e) {
                alert('JSON is not valid');
            }
        }
    };

    render() {
        return (
            <Box className="App" sx={{backgroundColor: '#2196f3', height: '5vh', marginBottom: '2px'}}>
                <Container fixed>
                    <Toolbar variant="dense">
                        <IconButton edge="start" color="inherit" aria-label="menu" className='menuButton'>
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant='h6' className='title' align='left'>Paintings</Typography>
                        <Box mr={3}>
                            {this.props.editor
                                ? <Button color='inherit' variant='outlined' align='right' component="label">Import
                                <input
                                type="file"
                                hidden
                                onChange={this.onFileChange}
                                /></Button>
                                : <div/>
                            }
                        </Box>
                        <Box mr={3}>
                            {this.props.editor
                                ? <Button color='secondary' variant='contained' align='right'
                                          onClick={this.props.changeView}>Develop</Button>
                                : <Button color='success' variant='contained' align='right'
                                          onClick={this.props.changeView}>View</Button>
                            }
                        </Box>
                    </Toolbar>
                </Container>
            </Box>
        );
    }
}