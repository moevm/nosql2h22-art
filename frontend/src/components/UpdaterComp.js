import {Button, Grid, TextField, Typography} from "@mui/material";
import React, {useState} from "react";
import {API_UPDATE_ART, API_DELETE_ART} from "../constants";
import DescriptionEditor from "./DescriptionEditor";
import '../App/App.css';
import Axios from "axios";


function UpdaterComp({dataToPass, hide}) {
    const [desc_editor, setDescEditor] = React.useState(false);
    const [data, setData] = useState(dataToPass);

    const handleDescOpen = (descriptionData) => {
        setDescEditor(true);
    }
    const handleDescClose = (descriptionData) => {
        if (typeof descriptionData === "string")
            data.description = descriptionData;

        setDescEditor(false);
    }

    function submit() {
        const url = API_UPDATE_ART + data.artworkid;
        console.log("url put:", url);

        Axios.put(url, {
            name: data.name,
            author: data.author,
            description: data.description,
            start_year: data.start_year,
            end_year: data.end_year,
            materials: data.materials,
            type: data.type,
            museum_name: data.museum_name,
            genre: data.genre,
            url: data.url
        }).then(r => {
            window.location.reload();
            console.log(r.data)
        });
    }
	function delete_art() {
		const url = API_DELETE_ART + data.artworkid;
		
		Axios.post(url).then(r => {
			window.location.reload();
			console.log(r.data)
		});
	}

    return (
        <div className="editorMenu">
            <Typography fontSize={20}>Updater</Typography>
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
                    <TextField defaultValue={data.name} onChange={(e) => {
                        data.name = e.target.value;
                    }} size='small' fullWidth={true} label="Name" variant="outlined" required/>
                </Grid>
                <Grid item xs={12}>
                    <TextField defaultValue={data.author} onChange={(e) => {
                        data.author = e.target.value
                    }} size='small' fullWidth={true} label="Author" variant="outlined" required/>
                </Grid>
                <Grid item xs={12}>
                    <Button variant='outlined' color='primary' onClick={handleDescOpen}>Description</Button>
                    <DescriptionEditor dataToPass={data.description} is_open={desc_editor} func={handleDescClose}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField defaultValue={data.museum_name} onChange={(e) => {
                        data.museum_name = e.target.value;
                    }} size='small' fullWidth={true} label="Museum name & address" variant="outlined" required/>
                </Grid>
                <Grid item xs={6}>
                    <TextField defaultValue={data.start_year} onChange={(e) => {
                        data.start_year = +(e.target.value)
                    }} type="number" label="Start year" size='small' fullWidth={true} variant="outlined" required/>
                </Grid>
                <Grid item xs={6}>
                    <TextField defaultValue={data.end_year} onChange={(e) => {
                        data.end_year = +(e.target.value)
                    }} type="number" label="End year" size='small' fullWidth={true} variant="outlined" required/>
                </Grid>
                <Grid item xs={12}>
                    <TextField defaultValue={data.genre} onChange={(e) => {
                        data.genre = e.target.value
                    }} size='small' fullWidth={true} label="Genre" variant="outlined" required/>
                </Grid>
                <Grid item xs={12}>
                    <TextField defaultValue={data.materials} onChange={(e) => {
                        data.materials = e.target.value
                    }} size='small' fullWidth={true} label="Materials" variant="outlined" required/>
                </Grid>
                <Grid item xs={12}>
                    <TextField defaultValue={data.type} onChange={(e) => {
                        data.type = e.target.value
                    }} size='small' fullWidth={true} label="Type" variant="outlined" required/>
                </Grid>
                <Grid item xs={12}>
                    <TextField defaultValue={data.url} onChange={(e) => {
                        data.url = e.target.value;
                    }} type="URL" size='small' fullWidth={true} label="URL" variant="outlined" required/>
                </Grid>

                <Grid item xs={3}>
                    <Button type="submit" variant='contained' onClick={submit} color='success'>Edit</Button>
                </Grid>
                <Grid item xs={4}>
                    <Button variant='contained' color='error' onClick={delete_art}>Delete</Button>
                </Grid>
                <Grid item xs={3}>
                    <Button variant='outlined' color='primary' onClick={hide}>Cancel</Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default UpdaterComp
