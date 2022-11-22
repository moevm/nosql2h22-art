import './App.css';
import React from 'react';
import AppBarComp from '../components/AppBarComp';
import GridCardComp from '../components/GridCardComp'
import EditorComp from '../components/EditorComp';
import UpdaterComp from '../components/UpdaterComp';
import {Box, Button} from '@mui/material';
import FilterComp from '../components/FilterComp';
import {API_SERVER} from "../constants";
import AddArtworkForm from "../components/AddArtworkForm";

function App() {
  const [displayEditor, setDisplay] = React.useState(true);

  function DisplayEditor(){
    if(displayEditor){
      return(
        <EditorComp/>
      );
    }
    else{
      return(<></>
      );
    }
  }

  const handleDisplayShow = () => {
    setDisplay(true);
  }
  const handleDisplayHide = () => {
    setDisplay(false);
  }
  return (
    <>
      <AppBarComp/>
      <div className='mainContainer'>
        <div className='leftSide'>
          <FilterComp/>
          <DisplayEditor/>
        </div>
        <div className='rightSide'>
          <div className='modeButtons'>
            <Box mr={3}>
              <Button variant='outlined' color='inherit' onClick={handleDisplayHide}>Analyze</Button>   
            </Box>
            <Box mr={3}>
              <Button color='inherit' variant='outlined' align='right' onClick={handleDisplayShow}>Export</Button>
            </Box>
          </div>
          <GridCardComp/>
        </div>
      </div>
      <div>
        It's me, React!
        <form method={'POST'} action={API_SERVER}>
            <input type="text" name="name"></input>
            <input type="submit" value="Set"></input>
        </form>
        <AddArtworkForm/>
      </div>
    </>
  );
}

export default App;
