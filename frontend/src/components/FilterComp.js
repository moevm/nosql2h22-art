import {Typography, Input, TextField, Container, MenuItem, Grid, Button} from "@mui/material";
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

function FilterComp(){
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
    return(
        <div className="filterMenu">
            <Typography>Filters</Typography>
            <div>
                <TextField id="outlined-basic" label="Название" variant="outlined" />
            </div>
            <div>
                <TextField id="outlined-basic" label="Автор" variant="outlined" />
            </div>
            <div>
                <TextField id="outlined-basic" label="Год начала" variant="outlined" />
            </div>
            <div>
                <TextField id="outlined-basic" label="Год завершения" variant="outlined" />
            </div>
            <div>
                <TextField 
                    id="outlined-basic" 
                    label="Музей" 
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
            </div>
            <div>
                <TextField 
                    id="outlined-basic" 
                    label="Жанр" 
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
            </div>
            <div>
                <TextField 
                    id="outlined-basic" 
                    label="Материал" 
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
            </div>
            <div className='bottomGrid'>
                <Grid container spacing={2}>
                    <Grid item>
                        <Button variant='contained' color='success'>Find</Button>
                    </Grid>
                    <Grid item>
                        <Button variant='outlined' color='primary'>Clear</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default FilterComp