import { Typography, TextField, Grid, Button } from "@mui/material";
import React, { useState } from "react";
import DescriptionEditor from "./DescriptionEditor";
import '../App/App.css';
import PreviewComp from "./PreviewComp";
import Axios from "axios";


function EditorComp({ updateMaterialsSelect, updateGenresSelect, updateMuseumsSelect }) {
    const [desc_editor, setDescEditor] = React.useState(false);
    const [preview_open, setPreview] = React.useState(false);
    const [data, setData] = useState({
        name: '',
        author: '',
        description: '',
        start_year: 0,
        end_year: 0,
        materials: '',
        type: '',
        museum_name: '',
        museum_address: '',
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

    const handlePreviewOpen = () => {
        if (!valid()) {
            alert("Form is incorrect for preview");
        } else {
            setPreview(true);
        }
    }
    const handlePreviewClose = () => {
        setPreview(false);
    }

    function onFileChange(event) {
        if (event.target.files.length === 0) {
            return;
        }
        if (event.target.files[0].type !== "image/png") {
            alert('Wrong file format');
            return
        }
    }

    function submit() {
        const url = "http://localhost:5000/add_art";
        if (!valid()) {
            alert("Form is incorrect");
        } else {
            Axios.post(url, {
                name: data.name,
                author: data.author,
                description: data.description,
                start_year: data.start_year,
                end_year: data.end_year,
                materials: data.materials,
                type: data.type,
                museum_name: data.museum_name,
                museum_address: data.museum_address,
                genre: data.genre,
                url: data.url
            }).then(r => {
                window.location.reload();
                console.log(r.data)
            });

            updateMaterialsSelect();
            updateGenresSelect();
            updateMuseumsSelect();
        }
    }

    const isValidUrl = urlString=> {
        var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
        '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
        return !!urlPattern.test(urlString);
    }

    function valid(){
        return (data.name != '') && (data.author != '') && (data.type != '') &&
            (data.description != '')  && (data.materials != '') &&
            (data.museum_name != '') && (data.museum_address != '') &&
            (data.genre != '') && (data.url != '') && ((data.start_year) <= (data.end_year)) &&
            (data.start_year > 0 && data.start_year < 3000 && data.end_year > 0 && data.end_year < 3000) &&
            (isValidUrl(data.url));
    }

    return (
        <div className="editorMenu">
            <Typography fontSize={20}>Editor</Typography>
            <Grid container spacing={1} padding={1} alignItems={'center'}>
                {/*<Grid item xs={12}>*/}
                {/*    <Button variant='outlined' color='primary' component="label">Add picture*/}
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
                    <TextField onChange={(e) => {data.museum_name = e.target.value;}} size='small' fullWidth={true} label="Museum name" variant="outlined" required/>
                </Grid>
                <Grid item xs={12}>
                    <TextField onChange={(e) => {data.museum_address = e.target.value;}} size='small' fullWidth={true} label="Museum address" variant="outlined" required/>
                </Grid>
                <Grid item xs={6}>
                    Start year
                    <TextField onChange={(e) => {data.start_year = +(e.target.value)}} type="number"  size='small' fullWidth={true}  variant="outlined" required/>
                </Grid>
                <Grid item xs={6}>
                    End year
                    <TextField onChange={(e) => {data.end_year = +(e.target.value)}} type="number"  size='small' fullWidth={true}  variant="outlined" required/>
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

                <Grid item xs={6}>
                    <Button type="submit" variant='contained' onClick={submit} color='primary'>Add</Button>
                </Grid>

                <Grid item xs={6}>
                    <Button variant='outlined' color='primary' onClick={handlePreviewOpen}>Preview</Button>
                    <PreviewComp dataToPass={data} is_open={preview_open} func={handlePreviewClose} />
                </Grid>
            </Grid>
        </div>
    );
}

export default EditorComp
