import './App.css';
import React, { useEffect } from 'react';
import AppBarComp from '../components/AppBarComp';
import GridCardComp from '../components/GridCardComp'
import EditorComp from '../components/EditorComp';
import UpdaterComp from '../components/UpdaterComp';
import TableComp from '../components/TableComp';
import { Box, Button } from '@mui/material';
import FilterComp from '../components/FilterComp';
import { API_SERVER, API_GET_ARTS } from "../constants";
import AddArtworkForm from "../components/AddArtworkForm";
import Axios from "axios";
import { saveAs } from 'file-saver'

function App() {
    const getMaterialsUrl = "http://localhost:5000/get_materials";
    const getGenresUrl = "http://localhost:5000/get_genres";
    const getMuseumsUrl = "http://localhost:5000/get_museums";

    const [displayEditor, setDisplay] = React.useState(true);
    const [mainDisplay, setMainDisplay] = React.useState(true);
    const [data, setData] = React.useState([]);
    const [museums, setMuseums] = React.useState([]);
    const [genres, setGenres] = React.useState([]);
    const [materials, setMaterials] = React.useState([]);

    useEffect(() => {
        UpdateData()
        getMaterials();
        getGenres();
        getMuseums();
    }, [])

    function DisplayEditor() {
        if (displayEditor) {
            return (
                <EditorComp />
            );
        } else {
            return (<></>
            );
        }
    }

    function MainDisplay() {
        if (mainDisplay) {
            return (
                <GridCardComp data={data} />
            );
        } else {
            return (
                <TableComp data={data} />
            );
        }
    }

    function onExport() {
        try {
            Axios.get(API_GET_ARTS).then(r => {
                let blob = new Blob([JSON.stringify(r.data)], { type: 'application/json' })
                saveAs(blob, 'exported_data.json')
            });
        } catch (e) {
            alert('Something unplanned!');
        }
    }

    const EditorDisplayChange = () => {
        setDisplay(!displayEditor);
    }
    const MainDisplayChange = () => {
        setMainDisplay(!mainDisplay);
    }

    const UpdateData = () => {
        try {
            Axios.get(API_GET_ARTS).then(r => {
                setData(r.data);
            });
        } catch (e) {
            alert('Something unplanned!');
        }
    }

    const getMaterials = async () => {
        const response = await Axios.get(getMaterialsUrl)
        console.log('materials', response.data);
        setMaterials(response.data.map((value) => ({ value, label: value })));
    };

    const getGenres = async () => {
        const response = await Axios.get(getGenresUrl)
        console.log('genres', response.data);
        setGenres(response.data.map((value) => ({ value, label: value })));
    };

    const getMuseums = async () => {
        const response = await Axios.get(getMuseumsUrl)
        console.log('museums', response.data);
        setMuseums(response.data.map((value) => ({ value, label: value })));
    };

    return (
        <div>
            <AppBarComp changeView={EditorDisplayChange} updateData={UpdateData} editor={displayEditor} />
            <div className='mainContainer'>
                <div className='leftSide'>
                    <FilterComp setData={setData} museums={museums} genres={genres} materials={materials} />
                    <DisplayEditor />
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
                                onClick={onExport}>Export</Button>
                        </Box>
                    </div>
                    <MainDisplay />
                </div>
            </div>
            {/*<div>*/}
            {/*    It's me, React!*/}
            {/*    <form method={'POST'} action={API_SERVER}>*/}
            {/*        <input type="text" name="name"></input>*/}
            {/*        <input type="submit" value="Set"></input>*/}
            {/*    </form>*/}
            {/*    <AddArtworkForm/>*/}
            {/*</div>*/}
        </div>
    );
}

export default App;
