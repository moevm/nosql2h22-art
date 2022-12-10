import {Typography, TextField, Grid, Button} from "@mui/material";
import React, { useState } from "react";
import DescriptionEditor from "./DescriptionEditor";
import '../App/App.css';


function UpdaterComp() {
    const [desc_editor, setDescEditor] = React.useState(false);
    const [data, setData] = useState({
        name: '',
        author: '',
        description: '',
        start_year: 0,
        end_year: 0,
        materials: '',
        type: '',
        museum_name: '',
        genre: '',
        url: ''
    });



    const handleDescOpen = (descriptionData) => {
        setDescEditor(true);
    }
    const handleDescClose = (descriptionData) => {
        if (typeof descriptionData === "string")
            data.description = descriptionData;

        setDescEditor(false);
    }

    function submit() {}

    return (
        <div className="editorMenu">
            <Typography fontSize={20}>Editor</Typography>
            <Grid container spacing={1} padding={1} alignItems={'center'}>
                {/*<Grid item xs={12}>*/}
                {/*    <Button variant='outlined' color='primary' component="label">Change picture*/}
                {/*        <input*/}
                {/*            type="file"*/}
                {/*            hidden*/}
                {/*            onChange={onFileChange}*/}
                {/*        /></Button>*/}
                {/*</Grid>*/}
                <Grid item xs={12}>
                    <TextField onChange={(e) => { data.name = e.target.value; }} size='small' fullWidth={true} label="Name" variant="outlined" required />
                </Grid>
                <Grid item xs={12}>
                    <TextField onChange={(e) => { data.author = e.target.value }} size='small' fullWidth={true} label="Author" variant="outlined" required />
                </Grid>
                <Grid item xs={12}>
                    <Button variant='outlined' color='primary' onClick={handleDescOpen}>Description</Button>
                    <DescriptionEditor dataToPass={data.description} is_open={desc_editor} func={handleDescClose} />
                </Grid>
                <Grid item xs={12}>
                    <TextField onChange={(e) => {data.museum_name = e.target.value;}} size='small' fullWidth={true} label="Museum name & address" variant="outlined" required/>
                </Grid>
                <Grid item xs={6}>
                    <TextField onChange={(e) => {data.start_year = +(e.target.value)}} type="number" label="Start year" size='small' fullWidth={true}  variant="outlined" required/>
                </Grid>
                <Grid item xs={6}>
                    <TextField onChange={(e) => {data.end_year = +(e.target.value)}} type="number" label="End year"  size='small' fullWidth={true}  variant="outlined" required/>
                </Grid>
                <Grid item xs={12}>
                    <TextField onChange={(e) => { data.genre = e.target.value }} size='small' fullWidth={true} label="Genre" variant="outlined" required />
                </Grid>
                <Grid item xs={12}>
                    <TextField onChange={(e) => { data.materials = e.target.value }} size='small' fullWidth={true} label="Materials" variant="outlined" required />
                </Grid>
                <Grid item xs={12}>
                    <TextField onChange={(e) => { data.type = e.target.value }} size='small' fullWidth={true} label="Type" variant="outlined" required />
                </Grid>
                <Grid item xs={12}>
                    <TextField onChange={(e) => { data.url = e.target.value; }} type="URL" size='small' fullWidth={true} label="URL" variant="outlined" required />
                </Grid>

                <Grid item xs={3}>
                    <Button type="submit" variant='contained' onClick={submit} color='success'>Edit</Button>
                </Grid>
                <Grid item xs={4}>
                    <Button variant='contained' color='error'>Delete</Button>
                </Grid>
                <Grid item xs={3}>
                    <Button variant='outlined' color='primary'>Cancle</Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default UpdaterComp