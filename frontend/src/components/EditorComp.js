import {Typography, TextField, Grid, Button} from "@mui/material";
import React, {useState} from "react";
import DescriptionEditor from "./DescriptionEditor";
import '../App/App.css';
import PreviewComp from "./PreviewComp";
import Axios from "axios";


function EditorComp() {
    const [desc_editor, setDescEditor] = React.useState(false);
    const [preview_open, setPreview] = React.useState(false);
    const [data, setData] = useState({
        name: '',
        author: '',
        description: '',
        startYear: '',
        endYear: '',
        materials: '',
        type: '',
        museumName: '',
        museumAddress: '',
        genre: '',
        URL: ''
    });



    const handleDescOpen = (descriptionData) => {
        setDescEditor(true);
    }
    const handleDescClose = (descriptionData) => {
        if(typeof descriptionData === "string")
            data.description = descriptionData;

        setDescEditor(false);
        // console.log(data);
    }

    const handlePreviewOpen = () => {
        if(!valid()){
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

    function submit(){
        const url = "http://localhost:5000/add_art";
        if(!valid()){
            alert("Form is incorrect");
        } else {
            Axios.post(url, {
                name: data.name,
                author: data.author,
                description: data.description,
                startYear: data.startYear,
                endYear: data.endYear,
                materials: data.materials,
                type: data.type,
                museumName: data.museumName,
                museumAddress: data.museumAddress,
                genre: data.genre,
                URL: data.URL
            }).then(r => {
                window.location.reload();
                console.log(r.data)
            });
        }
    }

    function valid(){
        return (data.name != '') && (data.author != '') && (data.type != '') &&
            (data.description != '') && (data.startYear != '') && (data.endYear != '') &&
            (data.materials != '') && (data.museumName != '') && (data.museumAddress != '') &&
            (data.genre != '');
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
                    <TextField onChange={(e) => {data.name = e.target.value; }} size='small' fullWidth={true} label="Name" variant="outlined" required/>
                </Grid>
                <Grid item xs={12}>
                    <TextField onChange={(e) => {data.author = e.target.value}} size='small' fullWidth={true} label="Author" variant="outlined" required/>
                </Grid>
                <Grid item xs={12}>
                    <Button variant='outlined' color='primary' onClick={handleDescOpen}>Description</Button>
                    <DescriptionEditor dataToPass={data.description} is_open={desc_editor} func={handleDescClose}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField onChange={(e) => {data.museumName = e.target.value;}} size='small' fullWidth={true} label="Museum name" variant="outlined" required/>
                </Grid>
                <Grid item xs={12}>
                    <TextField onChange={(e) => {data.museumAddress = e.target.value;}} size='small' fullWidth={true} label="Museum address" variant="outlined" required/>
                </Grid>
                <Grid item xs={6}>
                    Start year
                    <TextField onChange={(e) => {data.startYear = e.target.value}} type="date"  size='small' fullWidth={true}  variant="outlined" required/>
                </Grid>
                <Grid item xs={6}>
                    End year
                    <TextField onChange={(e) => {data.endYear = e.target.value}} type="date"  size='small' fullWidth={true}  variant="outlined" required/>
                </Grid>
                <Grid item xs={12}>
                    <TextField  onChange={(e) => {data.genre = e.target.value}} size='small' fullWidth={true} label="Genre" variant="outlined" required/>
                </Grid>
                <Grid item xs={12}>
                    <TextField onChange={(e) => {data.materials = e.target.value}} size='small' fullWidth={true} label="Materials" variant="outlined" required/>
                </Grid>
                <Grid item xs={12}>
                    <TextField onChange={(e) => {data.type = e.target.value}} size='small' fullWidth={true} label="Type" variant="outlined" required/>
                </Grid>
                <Grid item xs={12}>
                    <TextField  onChange={(e) => {data.URL = e.target.value; console.log(data);}} type="URL" size='small' fullWidth={true} label="URL" variant="outlined" required/>
                </Grid>

                <Grid item xs={6}>
                    <Button type="submit" variant='contained' onClick={submit} color='primary'>Add</Button>
                </Grid>

                <Grid item xs={6}>
                    <Button variant='outlined' color='primary' onClick={handlePreviewOpen}>Preview</Button>
                    <PreviewComp dataToPass={data} is_open={preview_open} func={handlePreviewClose}/>
                </Grid>
            </Grid>
        </div>
    );
}

export default EditorComp