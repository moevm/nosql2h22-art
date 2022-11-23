import './App.css';
import React from 'react';
import AppBarComp from '../components/AppBarComp';
import GridCardComp from '../components/GridCardComp'
import EditorComp from '../components/EditorComp';
import UpdaterComp from '../components/UpdaterComp';
import TableComp from '../components/TableComp';
import {Box, Button} from '@mui/material';
import FilterComp from '../components/FilterComp';
import {API_SERVER} from "../constants";
import AddArtworkForm from "../components/AddArtworkForm";

function createData(id, name, author, description, type, genre, museum, materials, start, end, image) {
    return {id, name, author, description, type, genre, museum, materials, start, end, image};
}

const rows = [
    createData(1, 'Morning in the Pine forest', 'Shishkin', '', 'Picture', 'Аnimalism', 'Hermitage', 'Oil', 1889, 1889, 'https://wpsovet.ru/wp-content/uploads/c/6/c/c6cdad86498ee5eb17cc914c96711dc1.jpeg'),
    createData(2, 'Mona Lisa', 'Leonardo da Vinci', '', 'Picture', 'Portret', 'Louvre', 'Oil', 1503, 1503, 'https://s.ecrater.com/stores/430136/5d624bd8d5f7a_430136b.jpg'),
    createData(3, 'Morning in the Pine forest', 'Shishkin', '', 'Picture', 'Аnimalism', 'Hermitage', 'Oil', 1889, 1889, 'https://wpsovet.ru/wp-content/uploads/c/6/c/c6cdad86498ee5eb17cc914c96711dc1.jpeg'),
    createData(4, 'Mona Lisa', 'Leonardo da Vinci', '', 'Picture', 'Portret', 'Louvre', 'Oil', 1503, 1503, 'https://s.ecrater.com/stores/430136/5d624bd8d5f7a_430136b.jpg'),
    createData(5, 'Morning in the Pine forest', 'Shishkin', '', 'Picture', 'Аnimalism', 'Hermitage', 'Oil', 1889, 1889, 'https://wpsovet.ru/wp-content/uploads/c/6/c/c6cdad86498ee5eb17cc914c96711dc1.jpeg'),
    createData(6, 'Mona Lisa', 'Leonardo da Vinci', '', 'Picture', 'Portret', 'Louvre', 'Oil', 1503, 1503, 'https://s.ecrater.com/stores/430136/5d624bd8d5f7a_430136b.jpg'),
    createData(7, 'Morning in the Pine forest', 'Shishkin', '', 'Picture', 'Аnimalism', 'Hermitage', 'Oil', 1889, 1889, 'https://wpsovet.ru/wp-content/uploads/c/6/c/c6cdad86498ee5eb17cc914c96711dc1.jpeg'),
    createData(8, 'Mona Lisa', 'Leonardo da Vinci', '', 'Picture', 'Portret', 'Louvre', 'Oil', 1503, 1503, 'https://s.ecrater.com/stores/430136/5d624bd8d5f7a_430136b.jpg'),
    createData(9, 'Morning in the Pine forest', 'Shishkin', '', 'Picture', 'Аnimalism', 'Hermitage', 'Oil', 1889, 1889, 'https://wpsovet.ru/wp-content/uploads/c/6/c/c6cdad86498ee5eb17cc914c96711dc1.jpeg'),
    createData(10, 'Mona Lisa', 'Leonardo da Vinci', '', 'Picture', 'Portret', 'Louvre', 'Oil', 1503, 1503, 'https://s.ecrater.com/stores/430136/5d624bd8d5f7a_430136b.jpg'),
    createData(11, 'Morning in the Pine forest', 'Shishkin', '', 'Picture', 'Аnimalism', 'Hermitage', 'Oil', 1889, 1889, 'https://wpsovet.ru/wp-content/uploads/c/6/c/c6cdad86498ee5eb17cc914c96711dc1.jpeg'),
    createData(12, 'Mona Lisa', 'Leonardo da Vinci', '', 'Picture', 'Portret', 'Louvre', 'Oil', 1503, 1503, 'https://s.ecrater.com/stores/430136/5d624bd8d5f7a_430136b.jpg'),
];

function App() {
    const [displayEditor, setDisplay] = React.useState(true);
    const [mainDisplay, setMainDisplay] = React.useState(true);

    function DisplayEditor() {
        if (displayEditor) {
            return (
                <EditorComp/>
            );
        } else {
            return (<></>
            );
        }
    }

    function MainDisplay() {
        if (mainDisplay) {
            return (
                <GridCardComp data={rows}/>
            );
        } else {
            return (
                <TableComp data={rows}/>
            );
        }
    }

    function onFileChange() {
        return
    }

    const EditorDisplayChange = () => {
        setDisplay(!displayEditor);
    }
    const MainDisplayChange = () => {
        setMainDisplay(!mainDisplay);
    }

    return (
        <div>
            <AppBarComp changeView={EditorDisplayChange} editor={displayEditor}/>
            <div className='mainContainer'>
                <div className='leftSide'>
                    <FilterComp/>
                    <DisplayEditor/>
                </div>
                <div className='rightSide'>
                    <div className='modeButtons'>
                        <Box mr={3}>
                            <Button variant='outlined' color='inherit' onClick={MainDisplayChange}>View as a
                                table</Button>
                        </Box>
                        <Box mr={3}>
                            <Button variant='outlined' color='inherit'>Analyze</Button>
                        </Box>
                        <Box mr={3}>
                            <Button color='inherit' variant='outlined' align='right' component="label"
                                    onClick={onFileChange}>Export</Button>
                        </Box>
                    </div>
                    <MainDisplay/>
                </div>
            </div>
            {/*<div>*/}
            {/*  It's me, React!*/}
            {/*  <form method={'POST'} action={API_SERVER}>*/}
            {/*      <input type="text" name="name"></input>*/}
            {/*      <input type="submit" value="Set"></input>*/}
            {/*  </form>*/}
            {/*  <AddArtworkForm/>*/}
            {/*</div>*/}
        </div>
    );
}

export default App;
