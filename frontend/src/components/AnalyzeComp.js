import '../App/App.css';
import {Button, Typography, MenuItem, TextField, Grid} from '@mui/material';
import React from 'react';

const fields = [
    {
        value: 'Museum',
        label: 'Музей'
    },
    {
        value: 'Materials',
        label: 'Материалы'
    }
];

function AnalyzeComp({closeAnalyze, filters}) {
    const [field, setField] = React.useState('Museum');
    const fieldChange = (event) => {
        setField(event.target.value);
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
                    <Button variant='contained' color='primary' style={{marginTop: 10}}>Save as .png</Button>
                    <Button variant='contained' color='error' style={{marginTop: 10, marginLeft: 10}}
                            onClick={closeAnalyze}>Cancel</Button>
                </div>
                <div className='analyzeView'>
                    <Typography fontSize={20}>Analysis for</Typography>
                    <img src='https://assets.pikiran-rakyat.com/crop/0x0:0x0/x/photo/2021/05/18/1067981407.jpg'
                         style={{width: 400, height: 300}}/>
                </div>
            </div>
        </div>
    );
}

export default AnalyzeComp;