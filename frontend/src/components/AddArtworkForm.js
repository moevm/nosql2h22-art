import React, {Component} from "react";
import {API_SERVER} from "../constants";

export class AddArtworkForm extends Component {
    render() {
        return (
            <div className="AddArtworkForm">
                <form method={'POST'} action={API_SERVER}>
                    <input type="text" placeholder="name" name="name" /> <br/>
                    <input type="text" placeholder="author" name="author" /> <br/>
                    <input type="text" placeholder="description" name="description" /> <br/>
                    <input type="date" placeholder="start year" name="start year" /> <br/>
                    <input type="date" placeholder="end year" name="end year" /> <br/>
                    <input type="text" placeholder="materials" name="materials" /> <br/>
                    <input type="text" placeholder="type" name="type" /> <br/>
                    <input type="text" placeholder="museum name" name="museum name" /> <br/>
                    <input type="text" placeholder="museum address" name="museum address" /> <br/>
                    <input type="text" placeholder="genre" name="genre" /> <br/>
                    <input type="url" placeholder="URL" name="URL" /> <br/>
                    <button type="submit" name="add picture"> add picture </button> <br/>
                </form>
            </div>
        );
    }
}