import React, {useState} from "react";
import {API_ADD_ART} from "../constants";
import Axios from "axios";

// import axios from "axios";


function AddArtworkForm() {
    const url = API_ADD_ART;

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

    function handle(e) {
        const newData = {...data};
        newData[e.target.id] = e.target.value;
        setData(newData);
    }


    function submit(e) {
        e.preventDefault();

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
            console.log(r.data)
        });
    }

    return (
        <div className="AddArtworkForm">
            <form method={'POST'} onSubmit={(e) => submit(e)}>
                <input onChange={(e) => handle(e)} type="text" placeholder="name" id="name" value={data.name} required/>
                <br/>
                <input onChange={(e) => handle(e)} type="text" placeholder="author" id="author" value={data.author}
                       required/> <br/>
                <textarea onChange={(e) => handle(e)} placeholder="description" id="description"
                          value={data.description} required/> <br/>
                <input onChange={(e) => handle(e)} type="date" placeholder="start year" id="startYear"
                       value={data.startYear} required/> <br/>
                <input onChange={(e) => handle(e)} type="date" placeholder="end year" id="endYear" value={data.endYear}
                       required/> <br/>
                <input onChange={(e) => handle(e)} type="text" placeholder="materials" id="materials"
                       value={data.materials} required/> <br/>
                <input onChange={(e) => handle(e)} type="text" placeholder="type" id="type" value={data.type} required/>
                <br/>
                <input onChange={(e) => handle(e)} type="text" placeholder="museum name" id="museumName"
                       value={data.museumName} required/> <br/>
                <input onChange={(e) => handle(e)} type="text" placeholder="museum address" id="museumAddress"
                       value={data.museumAddress} required/> <br/>
                <input onChange={(e) => handle(e)} type="text" placeholder="genre" id="genre" value={data.genre}
                       required/> <br/>
                <input onChange={(e) => handle(e)} type="url" placeholder="URL" id="URL" value={data.URL} required/>
                <br/>
                <button type="submit" id="addArtwork"> add artwork</button>
                <br/>
            </form>
        </div>
    );
}

export default AddArtworkForm;