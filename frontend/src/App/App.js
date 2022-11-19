import React from "react";
import {API_SERVER} from "../constants";
import {AddArtworkForm} from "../components/AddArtworkForm";

export default class App extends React.Component {
  render() {
    return (<div>
                It's me, React!
                <form method={'POST'} action={API_SERVER}>
                    <input type="text" name="name"></input>
                    <input type="submit" value="Set"></input>
                </form>
                <br/>
                <br/>
                <br/>

                <AddArtworkForm/>
            </div>);
  }
}
