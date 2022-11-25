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


export default class AppBarComp extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {

        }
        //this.handleLogInOpen = this.handleLogInOpen.bind(this)
    }

    onFileChange = event => {
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
            console.log(evt.target.result)
            try {
                json = JSON.parse(evt.target.result);
                console.log(json)
            } catch (e) {
                alert('JSON is not valid');
                return
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
                            <Button color='inherit' variant='outlined' align='right' component="label">Import
                                <input
                                    type="file"
                                    hidden
                                    onChange={this.onFileChange}
                                /></Button>
                        </Box>
                        <Box mr={3}>
                            {this.props.editor
                                ?<Button color='secondary' variant='contained' align='right'
                                    onClick={this.props.changeView}>Develop</Button>
                                :<Button color='success' variant='contained' align='right'
                                    onClick={this.props.changeView}>View</Button>
                            }
                        </Box>
                    </Toolbar>
                </Container>
            </Box>
        );
    }
}