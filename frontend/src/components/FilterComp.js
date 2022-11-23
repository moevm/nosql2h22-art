import {Typography, Input, TextField, Container, MenuItem, Grid, Button, Box, InputLabel} from "@mui/material";
import React from "react";
import '../App/App.css';

const museums = [
    {
        value: 'HERMITAGE',
        label: 'Эрмитаж'
    },
    {
        value: 'LOUVRE',
        label: 'Лувр'
    }
];
const genres = [
    {
        value: "LANDSCAPE",
        label: "Пейзаж"
    },
    {
        value: "PORTRET",
        label: "Портрет"
    },
]
const materials = [
    {
        value: "OIL",
        label: "Масло"
    },
    {
        value: "PAINTS",
        label: "Краски"
    },
]

function FilterComp() {
    const [museum, setMuseum] = React.useState('HERMITAGE');
    const [genre, setGenre] = React.useState('LANDSCAPE');
    const [material, setMaterial] = React.useState('OIL');

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
                    <TextField size='small' fullWidth={true} label="Название" variant="outlined"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField size='small' fullWidth={true} label="Автор" variant="outlined"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField size='small' fullWidth={true} label="Год начала" variant="outlined"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField size='small' fullWidth={true} label="Год завершения" variant="outlined"/>
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
                    <Button variant='contained' color='success'>Find</Button>
                </Grid>

                <Grid item xs={6}>
                    <Button variant='outlined' color='primary'>Clear</Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default FilterComp