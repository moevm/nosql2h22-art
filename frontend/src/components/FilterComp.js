import {Typography, TextField, MenuItem, Grid, Button, Box, InputLabel} from "@mui/material";
import React from "react";
import Axios from "axios";
import '../App/App.css';

const museums = [
    {
        value: 'Эрмитаж',
        label: 'Эрмитаж'
    },
    {
        value: 'Лувр',
        label: 'Лувр'
    }
];
const genres = [
    {
        value: "Пейзаж",
        label: "Пейзаж"
    },
    {
        value: "Портрет",
        label: "Портрет"
    },
]
const materials = [
    {
        value: "Масло",
        label: "Масло"
    },
    {
        value: "Краски",
        label: "Краски"
    },
]

function FilterComp({ setData }) {
    const url = "http://localhost:5000/get_arts_by_filter";

    const [museum, setMuseum] = React.useState('Эрмитаж');
    const [genre, setGenre] = React.useState('Пейзаж');
    const [material, setMaterial] = React.useState('Масло');

    const [title, setTitle] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const [startYear, setStartYear] = React.useState('');
    const [endYear, setEndYear] = React.useState('');

    const handleChangeTitle = (event) => setTitle(event.target.value);
    const handleChangeAuthor = (event) => setAuthor(event.target.value);
    const handleChangeStartYear = (event) => setStartYear(event.target.value);
    const handleChangeEndYear = (event) => setEndYear(event.target.value);

    const findByFilter = async () => {
        console.log('title', title);
        console.log('author', author);
        console.log('startYear', startYear);
        console.log('endYear', endYear);
        console.log('material', material);
        console.log('genre', genre);
        console.log('museum', museum);

      const response = await Axios.post(url, {
        title,
        author,
        startYear,
        endYear,
        museum,
        genre,
        material,
      })

      // TODO: вызвать UpdateDate(response.data)
        console.log('response.data', response.data);
        setData(response.data)
    };

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
                    <TextField value={title} onChange={handleChangeTitle} size='small' fullWidth={true} label="Название" variant="outlined"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField value={author} onChange={handleChangeAuthor} size='small' fullWidth={true} label="Автор" variant="outlined"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField value={startYear} onChange={handleChangeStartYear} size='small' fullWidth={true} label="Год начала" variant="outlined"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField value={endYear} onChange={handleChangeEndYear} size='small' fullWidth={true} label="Год завершения" variant="outlined"/>
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
                        value={museum}
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
                    <Button variant='outlined' color='primary'>Clear</Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default FilterComp
