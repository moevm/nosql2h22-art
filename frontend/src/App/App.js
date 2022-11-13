import React from "react";
import {API_SERVER} from "../constants";

export default class App extends React.Component {
  render() {
    return (<div>
                It's me, React!
                <form method={'POST'} action={API_SERVER}>
                    <input type="text" name="name"></input>
                    <input type="submit" value="Set"></input>
                </form>
            </div>);
  }
}
