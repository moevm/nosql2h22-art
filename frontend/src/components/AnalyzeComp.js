import '../App/App.css';
import {Button, Typography, MenuItem, TextField, Grid} from '@mui/material';
import React, {useEffect} from 'react';
import {API_GET_ANALYSIS_FIELD} from "../constants";
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




function AnalyzeComp({closeAnalyze}) {
    const [field, setField] = React.useState('museum_name');
    const [image, setImage] = React.useState([]);
    const fieldChange = (event) => {
        setField(event.target.value);
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
                            <TextField size='small' fullWidth={true} label="Name" variant="outlined"/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField size='small' fullWidth={true} label="Author" variant="outlined"/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField size='small' fullWidth={true} label="Museum name & address" variant="outlined"/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField type="number" label="Start year" size='small' fullWidth={true}
                                       variant="outlined"/>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField type="number" label="End year" size='small' fullWidth={true} variant="outlined"/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField size='small' fullWidth={true} label="Genre" variant="outlined"/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField size='small' fullWidth={true} label="Materials" variant="outlined"/>
                        </Grid>
                    </Grid>
                    <Button variant='contained' color='primary' style={{marginTop: 10}} onClick={downloadImage}>Save as .png</Button>
                    <Button variant='contained' color='error' style={{marginTop: 10, marginLeft: 10}}
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