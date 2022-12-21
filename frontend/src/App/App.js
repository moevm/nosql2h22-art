import './App.css';
import React, {useEffect} from 'react';
import AppBarComp from '../components/AppBarComp';
import GridCardComp from '../components/GridCardComp'
import EditorComp from '../components/EditorComp';
import UpdaterComp from '../components/UpdaterComp';
import TableComp from '../components/TableComp';
import {Box, Button} from '@mui/material';
import FilterComp from '../components/FilterComp';
import PreviewComp from "../components/PreviewComp";
import AnalyzeComp from "../components/AnalyzeComp";
import {
    API_GET_ARTS,
    API_GET_GENRES,
    API_GET_MATERIALS,
    API_GET_MUSEUMS,
    API_GET_TYPES,
    NOT_CHOSEN_LABEL
} from "../constants";
import Axios from "axios";
import {saveAs} from 'file-saver'

const defaultFilterValue = {value: "0", label: NOT_CHOSEN_LABEL};

function App() {

    const [displayEditor, setDisplay] = React.useState(true);
    const [displayUpdater, setUpdater] = React.useState(false);
    const [dataDisplay, setDataDisplay] = React.useState(true);
    const [page, setPage] = React.useState(1);
    const [previewData, setPreviewData] = React.useState([]);
    const [filtersData, setFiltersData] = React.useState({
        title: "", author: "", museum_name: "", start_year: "", end_year: "", genre: "", material: "", type: "",
    });
    const [previewOpen, setPreview] = React.useState(false);
    const [mainDisplay, setMainDisplay] = React.useState(true);

    const [data, setData] = React.useState([]);
    const [museums, setMuseums] = React.useState([]);
    const [genres, setGenres] = React.useState([]);
    const [materials, setMaterials] = React.useState([]);
    const [types, setTypes] = React.useState([]);

    useEffect(() => {
        UpdateData()
        getMaterials();
        getGenres();
        getMuseums();
        getTypes();
    }, [])

    function DisplayEditor() {
        if (displayEditor) {
            if (displayUpdater) {
                return (<UpdaterComp dataToPass={previewData} hide={HidePreview}/>);
            } else {
                return (<EditorComp showPreview={ShowPreview} hidePreview={HidePreview} previewOpen={previewOpen}/>);
            }
        } else {
            return (<></>);
        }
    }

    function DataDisplay() {
        if (previewOpen) {
            return (
                <PreviewComp dataToPass={previewData}/>
            );
        } else {
            if (dataDisplay) {
                console.log(data.slice((page - 1) * 12, (page) * 12))
                return (
                    <GridCardComp data={data.slice((page - 1) * 12, (page) * 12)} total={data.length} setPage={setPage}
                                  page={page} curIndexChange={DisplayIndexChange}/>
                );
            } else {
                return (
                    <TableComp data={data.slice((page - 1) * 12, (page) * 12)} total={data.length} setPage={setPage}
                               page={page}/>
                );
            }
        }
    }

    function MainDisplay() {
        if (mainDisplay) {
            return (
                <div className='mainContainer'>
                    <div className='leftSide'>
                        <FilterComp setData={setData} museums={museums} genres={genres}
                                    types={types} materials={materials}
                                    getAllData={UpdateData}
                                    setFilters={setFiltersData}/>
                        <DisplayEditor updateMaterialsSelect={getMaterials} updateGenresSelect={getGenres}
                                       updateMuseumsSelect={getMuseums}/>

                    </div>
                    <div className='rightSide'>
                        {previewOpen
                            ? <></>
                            : <div className='modeButtons'>
                                <Box mr={3}>
                                    {dataDisplay
                                        ?
                                        <Button variant='outlined' color='inherit' onClick={DataDisplayChange}>View as a
                                            table</Button>
                                        :
                                        <Button variant='outlined' color='inherit' onClick={DataDisplayChange}>View as a
                                            list</Button>
                                    }
                                </Box>
                                <Box mr={3}>
                                    <Button variant='outlined' color='inherit'
                                            onClick={MainDisplayChange}>Analyze</Button>
                                </Box>
                                <Box mr={3}>
                                    <Button color='inherit' variant='outlined' align='right' component="label"
                                            onClick={onExport}>Export</Button>
                                </Box>
                            </div>
                        }
                        <DataDisplay/>
                    </div>
                </div>
            );
        } else {
            return (
                <AnalyzeComp closeAnalyze={MainDisplayChange} filters={filtersData}/>
            );
        }
    }

    function onExport() {
        try {
            Axios.get(API_GET_ARTS).then(r => {
                let blob = new Blob([JSON.stringify(data)], {type: 'application/json'})
                saveAs(blob, 'exported_data.json')
            });
        } catch (e) {
            alert('Something unplanned!');
        }
    }

    const EditorDisplayChange = () => {
        setDisplay(!displayEditor);
    }
    const DisplayIndexChange = (index) => {
        setPreviewData(data.slice((page - 1) * 12, (page) * 12)[index]);
        setPreview(!previewOpen);
        setUpdater(true);
    }
    const DataDisplayChange = () => {
        setDataDisplay(!dataDisplay);
    }
    const MainDisplayChange = () => {
        setMainDisplay(!mainDisplay);
    }
    const ShowPreview = (data) => {
        setPreview(!previewOpen);
        setPreviewData(data);
    }
    const HidePreview = () => {
        setPreview(!previewOpen);
        setUpdater(false);
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

    const getTypes = async () => {
        const response = await Axios.get(API_GET_TYPES)
        console.log('types', response.data);
        const list = response.data.map((value, index) => ({value: `${index + 1}`, label: value}));
        setTypes([defaultFilterValue].concat(list));
    };

    const getMaterials = async () => {
        const response = await Axios.get(API_GET_MATERIALS)
        console.log('materials', response.data);
        const list = response.data.map((value, index) => ({value: `${index + 1}`, label: value}));
        setMaterials([defaultFilterValue].concat(list));
    };

    const getGenres = async () => {
        const response = await Axios.get(API_GET_GENRES)
        console.log('genres', response.data);
        const list = response.data.map((value, index) => ({value: `${index + 1}`, label: value}));
        setGenres([defaultFilterValue].concat(list));
    };

    const getMuseums = async () => {
        const response = await Axios.get(API_GET_MUSEUMS)
        console.log('museums', response.data);
        const list = response.data.map((value, index) => ({value: `${index + 1}`, label: value}));
        setMuseums([defaultFilterValue].concat(list));
    };

    return (
        <div>
            <AppBarComp changeView={EditorDisplayChange} updateData={UpdateData} editor={displayEditor}/>
            <MainDisplay/>
        </div>
    );
}

export default App;
