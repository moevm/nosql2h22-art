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



function AnalyzeComp({closeAnalyze, filters}) {
    const [field, setField] = React.useState('museum_name');
    const [image, setImage] = React.useState([]);
    const fieldChange = (event) => {
        setField(event.target.value);
        console.log(filters)
        console.log(API_GET_ANALYSIS_FIELD + event.target.value)
        axios.post(API_GET_ANALYSIS_FILTERED_FIELD + event.target.value, {
            "name": filters.title,
            "author": filters.author,
            "museum_name": filters.museum_name.localeCompare("Не выбрано" ) === 0 ? "" : filters.museum_name,
            "start_year": filters.start_year,
            "end_year": filters.end_year,
            "genre": filters.genre.localeCompare("Не выбрано" ) === 0 ? "" : filters.genre,
            "materials": filters.material.localeCompare("Не выбрано" ) === 0 ? "" : filters.material,
             "type": filters.type.localeCompare("Не выбрано" ) === 0 ? "" : filters.type
        })
          .then(res => {
          setImage(res.data)
              console.log(filters)
      }).catch(err => {
        console.log(err)
      })
    };



    const downloadImage = () => {
        saveAs(image, field+'_analysis.png')
    }

    useEffect(() => {
      axios.post(API_GET_ANALYSIS_FILTERED_FIELD + field, {
            "name": filters.title,
            "author": filters.author,
            "museum_name": filters.museum_name.localeCompare("Не выбрано" ) === 0 ? "" : filters.museum_name,
            "start_year": filters.start_year,
            "end_year": filters.end_year,
            "genre": filters.genre.localeCompare("Не выбрано" ) === 0 ? "" : filters.genre,
            "materials": filters.material.localeCompare("Не выбрано" ) === 0 ? "" : filters.material,
            "type": filters.type.localeCompare("Не выбрано" ) === 0 ? "" : filters.type
      })
          .then(res => {
          setImage(res.data)
              console.log(filters)
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
                            <TextField size='small' value={filters.museum_name.localeCompare("Не выбрано") === 0 ? "" : filters.museum_name} InputProps={{readOnly:true}}
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
                            <TextField size='small' value={filters.genre.localeCompare("Не выбрано") === 0 ? "" : filters.genre} InputProps={{readOnly:true}} fullWidth={true}
                                        label="Genre" variant="outlined"/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField size='small' value={filters.material.localeCompare("Не выбрано") === 0 ? "" : filters.material} InputProps={{readOnly:true}}
                                        fullWidth={true} label="Materials" variant="outlined"/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField size='small' value={filters.type.localeCompare("Не выбрано") === 0 ? "" : filters.type} InputProps={{readOnly:true}}
                                        fullWidth={true} label="Type" variant="outlined"/>
                        </Grid>
                    </Grid>
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