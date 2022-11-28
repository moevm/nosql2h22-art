import {Typography, TextField, MenuItem, Grid, Button, Box, InputLabel} from "@mui/material";
import React from "react";
import Axios from "axios";
import '../App/App.css';
import {API_GET_ARTS_BY_FILTER} from "../constants";

function FilterComp({setData, museums, genres, materials, getAllData}) {

    const [museum_name, setMuseum] = React.useState('0');
    const [genre, setGenre] = React.useState('0');
    const [material, setMaterial] = React.useState('0');

    const [title, setTitle] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const [start_year, setStartYear] = React.useState('');
    const [end_year, setEndYear] = React.useState('');

    const handleChangeTitle = (event) => setTitle(event.target.value);
    const handleChangeAuthor = (event) => setAuthor(event.target.value);
    const handleChangeStartYear = (event) => setStartYear(event.target.value);
    const handleChangeEndYear = (event) => setEndYear(event.target.value);

    const findByFilter = async () => {
        const response = await Axios.post(API_GET_ARTS_BY_FILTER, {
            title,
            author,
            start_year,
            end_year,
            museum_name: museums[museum_name].label,
            genre: genres[genre].label,
            material: materials[material].label,
        })

        console.log('response.data', response.data);
        setData(response.data)
    };

    const clearFilters = () => {
        getAllData();
        setMuseum('0');
        setGenre('0');
        setMaterial('0');
        setTitle('');
        setAuthor('');
        setStartYear('');
        setEndYear('');
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
        <Box className="filterMenu">
            <Typography fontSize={20}>Filters</Typography>
            <Grid container spacing={1} padding={1} alignItems={'center'}>
                <Grid item xs={12}>
                    <TextField value={title} onChange={handleChangeTitle} size='small' fullWidth={true} label="Название"
                               variant="outlined"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField value={author} onChange={handleChangeAuthor} size='small' fullWidth={true} label="Автор"
                               variant="outlined"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField value={start_year} onChange={handleChangeStartYear} size='small' fullWidth={true}
                               label="Год начала" variant="outlined"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField value={end_year} onChange={handleChangeEndYear} size='small' fullWidth={true}
                               label="Год завершения" variant="outlined"/>
                </Grid>

                <Grid item xs={4}>
                    <InputLabel>Музей</InputLabel>
                </Grid>

                <Grid item xs={8}>
                    <TextField
                        size='small'
                        fullWidth={true}
                        variant="outlined"
                        select
                        value={museum_name}
                        onChange={museumChange}
                    >
                        {museums.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={4}>
                    <InputLabel>Жанр</InputLabel>
                </Grid>

                <Grid item xs={8}>
                    <TextField
                        size='small'
                        fullWidth={true}
                        variant="outlined"
                        select
                        value={genre}
                        onChange={genreChange}
                    >
                        {genres.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={4}>
                    <InputLabel>Материал</InputLabel>
                </Grid>

                <Grid item xs={8}>
                    <TextField
                        size='small'
                        fullWidth={true}
                        variant="outlined"
                        select
                        value={material}
                        onChange={materialChange}
                    >
                        {materials.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid item xs={6}>
                    <Button onClick={findByFilter} variant='contained' color='success'>Find</Button>
                </Grid>

                <Grid item xs={6}>
                    <Button onClick={clearFilters} variant='outlined' color='primary'>Clear</Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default FilterComp
