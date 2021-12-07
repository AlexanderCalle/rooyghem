import React, { useState, useEffect } from 'react'

const CreateAspirantForm = (props) => {
    const isUpdateForm = props.aspirantInfo !== undefined;

    const [firstname, setFirstname] = useState(isUpdateForm ? props.aspirantInfo.firstname : "");
    const [lastname, setLastname] = useState(isUpdateForm ? props.aspirantInfo.lastname : "");
    const [image, setImage] = useState(null);

    const makeFormData = () => {
        const formData = new FormData();

        formData.append("firstname", firstname);
        formData.append("lastname",lastname);
        formData.append("image", image);

        return formData;
    };

    const create = (e) => {
        e.preventDefault();
        
        const formData = makeFormData();

        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            body: formData
        };

        fetch(`${process.env.REACT_APP_BACKEND_HOST}/aspiranten/create`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                window.location = "/backoffice/aspiranten"
            });
    };

    const update = (e) => {
        e.preventDefault();
        
        const formData = makeFormData();

        const requestOptions = {
            method: 'PUT',
            credentials: 'include',
            body: formData
        };

        fetch(`${process.env.REACT_APP_BACKEND_HOST}/aspiranten/single/${props.aspirantInfo.aspi_id}`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                window.location = "/backoffice/aspiranten"
            });
    }

    var header = "";
    if (props.readOnly) {
        header = "Aspirant verwijderen?";
    } else if (isUpdateForm) {
        header = "Update aspirant";
    } else {
        header = "Maak aspirant";
    }

    return(
        <div id="backofficecreation">
            <div id="creationform">
                <h1>{header}</h1>
                <form onSubmit = {isUpdateForm ? update : create}>
                    <fieldset disabled={props.readOnly ? true:  false}>
                        <label for="firstname">Voornaam</label>
                        <input id="firstname" value={firstname} onChange = {e => setFirstname(e.target.value)} type="text" name="firstname" placeholder="Voornaam..."></input>
                        <br/>

                        <label for="lastname">Achternaam</label>
                        <input id="lastname" value={lastname} onChange = {e => setLastname(e.target.value)} type="text" name="lastname" placeholder="Achternaam..."></input>
                        <br/>

                        <label for="picture_path">Foto van aspirant</label>
                        <input type="file" onChange={e => {
                            const file = e.target.files[0];
                            setImage(file);
                        }} name="image" placeholder="Foto van aspirant..."/>
                        <br/>
                        {props.readOnly ? <></> :
                            <button type="submit">{isUpdateForm ? 'Update' : 'Maak'} gebruiker</button>
                        }
                    </fieldset>
                </form>
            </div>

        </div>
    );
};

export default CreateAspirantForm;