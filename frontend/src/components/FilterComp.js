import {Box, Button, Grid, InputLabel, MenuItem, TextField, Typography} from "@mui/material";
import React from "react";
import Axios from "axios";
import '../App/App.css';
import {API_GET_ARTS_BY_FILTER, NOT_CHOSEN_LABEL} from "../constants";

function FilterComp({setData, museums, genres, types, materials, getAllData, setFilters, setPage}) {

    const [museum_name, setMuseum] = React.useState('0');
    const [genre, setGenre] = React.useState('0');
    const [material, setMaterial] = React.useState('');

    const [title, setTitle] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const [start_year, setStartYear] = React.useState('');
    const [end_year, setEndYear] = React.useState('');
    const [type, setType] = React.useState('0');

    const handleChangeTitle = (event) => setTitle(event.target.value);
    const handleChangeAuthor = (event) => {
        console.log(event.target.value);
        setAuthor(event.target.value)
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

    const findByFilter = React.useCallback(async () => {
        if (!valid()) {
            alert("Incorrect years!");
        } else {
            const response = await Axios.post(API_GET_ARTS_BY_FILTER, {
                title,
                author,
                start_year,
                end_year,
                museum_name: checkOnNoChosen(museums[museum_name].label),
                genre: checkOnNoChosen(genres[genre].label),
                material,
                type: checkOnNoChosen(types[type].label)
            })
            setPage(1);
            setData(response.data);

            console.log(type)
            setFilters({
                title,
                author,
                museum_name: museums[museum_name].label,
                start_year,
                end_year,
                genre: genres[genre].label,
                material,
                type: types[type].label
            });
        }
    }, [title,
        author,
        start_year,
        end_year, museum_name, genre, material, type]);

    const clearFilters = () => {
        getAllData();
        setMuseum('0');
        setGenre('0');
        setMaterial('');
        setTitle('');
        setAuthor('');
        setStartYear('');
        setEndYear('');
        setType('0');
        setPage(1);
        setFilters({
            title,
            author,
            museum_name: museums[museum_name].label,
            start_year,
            end_year,
            genre: genres[genre].label,
            material: materials[material].label,
            type: types[type].label
        });
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

    const handleChangeType = (event) => {
        setType(event.target.value);
        console.log(type)
    };
    return (
        <Box className="filterMenu">
            <Typography fontSize={20}>Filters</Typography>
            <Grid container spacing={1} padding={1} alignItems={'center'}>
                <Grid item xs={12}>
                    <TextField value={title} onChange={handleChangeTitle} size='small' fullWidth={true} label="Title"
                               variant="outlined"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField value={author} onChange={handleChangeAuthor} size='small' fullWidth={true} label="Author"
                               variant="outlined"/>
                </Grid>

                <Grid item xs={6}>
                    <TextField type="number" value={start_year} onChange={handleChangeStartYear} size='small'
                               fullWidth={true}
                               label="From" variant="outlined"/>
                </Grid>
                <Grid item xs={6}>
                    <TextField type="number" value={end_year} onChange={handleChangeEndYear} size='small'
                               fullWidth={true}
                               label="To" variant="outlined"/>
                </Grid>


                <Grid item xs={4}>
                    <InputLabel>Museum</InputLabel>
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
                    <InputLabel>??????</InputLabel>
                </Grid>

                <Grid item xs={8}>
                    <TextField
                        size='small'
                        fullWidth={true}
                        variant="outlined"
                        select
                        value={type}
                        onChange={handleChangeType}
                    >
                        {types.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid item xs={4}>
                    <InputLabel>Genre</InputLabel>
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

                <Grid item xs={12}>
                    <TextField value={material} onChange={materialChange} size='small' fullWidth={true} label="Materials"
                               variant="outlined"/>
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
