import {Typography, TextField,  Grid, Button} from "@mui/material";
import React from "react";
import DescriptionEditor from "./DescriptionEditor";
import '../App/App.css';
import PreviewComp from "./PreviewComp";


function EditorComp(){
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

    return(
        <div className="editorMenu">
            <Typography>Editor</Typography>
            <Button variant='outlined' color='primary'>Add picture</Button>
            <div>
                <TextField id="outlined-basic" label="Name" variant="outlined"/>
            </div>
            <div>
                <TextField id="outlined-basic" label="Author" variant="outlined" />
            </div>
            <div>
                <Button variant='outlined' color='primary' onClick={handleDescOpen}>Descryption</Button>
                <DescriptionEditor is_open = {desc_editor} func={handleDescClose}/>
            </div>
            <div>
                <TextField id="outlined-basic" label="Museum" variant="outlined" />
            </div>
            <div>
                <TextField id="outlined-basic" label="Start year" variant="outlined" />
                <TextField id="outlined-basic" label="End year" variant="outlined" />
            </div>
            <div>
                <TextField id="outlined-basic" label="Genre" variant="outlined" />
            </div>
            <div>
                <TextField id="outlined-basic" label="Materials" variant="outlined" />
            </div>

            <div className='bottomGrid'>
                <Grid container spacing={2}>
                    <Grid item>
                        <Button variant='contained' color='primary'>Add</Button>
                    </Grid>
                    <Grid item>
                        <Button variant='outlined' color='primary' onClick={handlePreviewOpen}>Preview</Button>
                        <PreviewComp is_open = {preview_open} func={handlePreviewClose}/>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default EditorComp