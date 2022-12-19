import '../App/App.css';
import {Button, Typography, MenuItem, TextField, Grid} from '@mui/material';
import React, {useEffect} from 'react';
import {
    API_GET_ANALYSIS_FIELD,
    API_GET_ANALYSIS_FILTERED_FIELD,
    API_GET_ARTS_BY_FILTER,
    NOT_CHOSEN_LABEL
} from "../constants";
import axios from "axios";
import {Image} from "@mui/icons-material";
import Axios from "axios";
import { saveAs } from 'file-saver'

const fields = [
    {
        value: 'author',
        label: 'Автор'
    },
    {
        value: 'museum_name',
        label: 'Музей'
    },
    {
          value: 'start_year',
          label: 'Год начала'
    },
    {
        value: 'end_year',
        label: 'Год завершения'
    },
    {
        value: 'materials',
        label: 'Материалы'
    },
    {
        value: 'genre',
        label: 'Жанр'
    },
    {
        value: 'type',
        label: 'Тип'
    }
];



function AnalyzeComp({closeAnalyze, setData, museums, genres, types, materials, getAllData}) {
    const [field, setField] = React.useState('museum_name');
    const [image, setImage] = React.useState([]);
    const fieldChange = (event) => {
        setField(event.target.value);
        console.log(API_GET_ANALYSIS_FIELD + event.target.value)
        axios.get(API_GET_ANALYSIS_FIELD + event.target.value)
          .then(res => {
          setImage(res.data)
      }).catch(err => {
        console.log(err)
      })
    };

    const downloadImage = () => {
        saveAs(image, field+'_analysis.png')
    }

    useEffect(() => {
      axios.get(API_GET_ANALYSIS_FIELD + field)
          .then(res => {
          setImage(res.data)
      }).catch(err => {
        console.log(err)
      })}, [])

    const [museum_name, setMuseum] = React.useState('');
    const [genre, setGenre] = React.useState('');
    const [material, setMaterial] = React.useState('');

    const [title, setTitle] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const [start_year, setStartYear] = React.useState('');
    const [end_year, setEndYear] = React.useState('');
    const [type, setType] = React.useState('');

    const handleChangeTitle = (event) => setTitle(event.target.value);
    const handleChangeAuthor = (event) => {
        console.log(event.target.value);
        setAuthor(event.target.value);
    };
    const handleChangeStartYear = (event) => setStartYear(event.target.value);
    const handleChangeEndYear = (event) => setEndYear(event.target.value);

    const checkOnNoChosen = (val) => {
        if (val === NOT_CHOSEN_LABEL) {
            console.log("Not chosen val");
            return "";
        }
        return val;
    }

    const checkYear = (year) => {
        if (year === "")
            return true;
        return Number(year) > 0 && Number(year) < 3000;
    }

    const valid = React.useCallback(() => {
        const checkStart = checkYear(start_year);
        const checkEnd = checkYear(end_year);
        return (start_year <= end_year && checkStart && checkEnd);
    }, [start_year, end_year]);

    const findByFilter = React.useCallback(async (field) => {
        if (!valid()) {
            alert("Incorrect years!");
        } else {

            let url = API_GET_ANALYSIS_FILTERED_FIELD + field;
            const response = await Axios.post(url, {
                name:  title,
                author: author,
                start_year: start_year,
                end_year: end_year,
                materials: material,
                museum_name: museum_name,
                genre: genre
            });
            if(response.data !== "")
                setImage(response.data);
        }
    }, [title,
        author,
        start_year,
        end_year, museum_name, genre, material]);

    const clearFilters = () => {
        setMuseum('');
        setGenre('');
        setMaterial('');
        setTitle('');
        setAuthor('');
        setStartYear('');
        setEndYear('');
        setType('');
    }

    const museumChange = (event) => {
        setMuseum(event.target.value);
    };
    const genreChange = (event) => {
        setGenre(event.target.value);
    };
    const materialChange = (event) => {
        setMaterial(event.target.value);
    };


    return (
        <div>
            <div className='analyzeContainer'>
                <div className='analyzeControls'>
                    <TextField
                        id="outlined-basic"
                        label="Поле"
                        variant="outlined"
                        select
                        value={field}
                        fullWidth={true}
                        style={{paddingBottom: 20}}
                        onChange={fieldChange}
                    >
                        {fields.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                    <Grid container spacing={1} padding={1} alignItems={'center'} className="analyzeGrid">
                        <Grid item xs={12}>
                            <Typography fontSize={20}>Based on filters</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField size='small' value={filters.title} InputProps={{readOnly:true}} fullWidth={true} 
                                        label="Title" variant="outlined"/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField size='small' value={filters.author} InputProps={{readOnly:true}} fullWidth={true} 
                                        label="Author" variant="outlined"/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField size='small' value={filters.museum_name} InputProps={{readOnly:true}} 
                                        fullWidth={true} label="Museum name & address" variant="outlined"/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField type="number" value={filters.start_year} InputProps={{readOnly:true}} 
                                        label="Start year" size='small' fullWidth={true} variant="outlined"/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField type="number" value={filters.end_year} InputProps={{readOnly:true}} 
                                        label="End year" size='small' fullWidth={true} variant="outlined"/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField size='small' value={filters.genre} InputProps={{readOnly:true}} fullWidth={true} 
                                        label="Genre" variant="outlined"/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField size='small' value={filters.materials} InputProps={{readOnly:true}} 
                                        fullWidth={true} label="Materials" variant="outlined"/>
                        </Grid>
                    </Grid>
                    <Button variant='contained' color='primary' style={{marginTop: 10}} onClick={()=>{findByFilter(field)}}>filter</Button>
                    <Button variant='contained' color='primary' style={{marginTop: 10, marginLeft: 5}} onClick={downloadImage}>Save as .png</Button>
                    <Button variant='contained' color='error' style={{marginTop: 10, marginLeft: 5}}
                            onClick={closeAnalyze}>Cancel</Button>
                </div>
                <div className='analyzeView'>
                    <Typography fontSize={20} onChange={fieldChange}>Analysis for {field}</Typography>
                    <img src={image} style={{width: 800, height: 600}}/>
                </div>
            </div>
        </div>
    );
}

export default AnalyzeComp;