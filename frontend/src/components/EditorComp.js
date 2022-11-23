import {Typography, TextField, Grid, Button} from "@mui/material";
import React from "react";
import DescriptionEditor from "./DescriptionEditor";
import '../App/App.css';
import PreviewComp from "./PreviewComp";


function EditorComp() {
    const [desc_editor, setDescEditor] = React.useState(false);
    const [preview_open, setPreview] = React.useState(false);

    const handleDescOpen = () => {
        setDescEditor(true);
    }
    const handleDescClose = () => {
        setDescEditor(false);
    }
    const handlePreviewOpen = () => {
        setPreview(true);
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

    return (
        <div className="editorMenu">
            <Typography fontSize={20}>Editor</Typography>
            <Grid container spacing={1} padding={1} alignItems={'center'}>
                <Grid item xs={12}>
                    <Button variant='outlined' color='primary' component="label">Add picture
                        <input
                            type="file"
                            hidden
                            onChange={onFileChange}
                        /></Button>
                </Grid>
                <Grid item xs={12}>
                    <TextField size='small' fullWidth={true} label="Name" variant="outlined"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField size='small' fullWidth={true} label="Author" variant="outlined"/>
                </Grid>
                <Grid item xs={12}>
                    <Button variant='outlined' color='primary' onClick={handleDescOpen}>Description</Button>
                    <DescriptionEditor is_open={desc_editor} func={handleDescClose}/>
                </Grid>
                <Grid item xs={12}>
                    <TextField size='small' fullWidth={true} label="Museum" variant="outlined"/>
                </Grid>
                <Grid item xs={6}>
                    <TextField size='small' fullWidth={true} label="Start year" variant="outlined"/>
                </Grid>
                <Grid item xs={6}>
                    <TextField size='small' fullWidth={true} label="End year" variant="outlined"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField size='small' fullWidth={true} label="Genre" variant="outlined"/>
                </Grid>
                <Grid item xs={12}>
                    <TextField size='small' fullWidth={true} label="Materials" variant="outlined"/>
                </Grid>
                <Grid item xs={6}>
                    <Button variant='contained' color='primary'>Add</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button variant='outlined' color='primary' onClick={handlePreviewOpen}>Preview</Button>
                    <PreviewComp is_open={preview_open} func={handlePreviewClose}/>
                </Grid>
            </Grid>
        </div>
    );
}

export default EditorComp