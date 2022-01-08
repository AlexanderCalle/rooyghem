import React, { useState, useEffect } from 'react'

const CreateTokshopItemForm = (props) => {
    const isUpdateForm = props.item !== undefined;

    const [name, setName] = useState(isUpdateForm ? props.item.name : "");
    const [description, setDescription] = useState(isUpdateForm ? props.item.description : "");
    const [price, setPrice] = useState(isUpdateForm ? props.item.price : 0);
    const [image, setImage] = useState(null);

    // TODO: make callbacks
    const makeFormData = () => {
        const formData = new FormData();

        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);
        formData.append("image", image);

        return formData;
    }

    const create = (e) => {
        e.preventDefault();

        const formData = makeFormData();

        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            body: formData
        };

        fetch(`${process.env.REACT_APP_BACKEND_HOST}/tokshop/items`, requestOptions)
        .then(response => response.json())
        .then(data => {
            window.location = "/backoffice/tokshop/items";
        })
    };

    const update = (e) => {
        e.preventDefault();

        const formData = makeFormData();

        const requestOptions = {
            method: 'PUT',
            credentials: 'include',
            body: formData
        }

        fetch(`${process.env.REACT_APP_BACKEND_HOST}/tokshop/items/` + props.item.tokshopitem_id, requestOptions)
        .then(response => response.json())
        .then(data => {
            window.location = "/backoffice/tokshop/items";
        });
    };

    var header = "";
    if (props.readOnly) {
        header = "Tokshop item verwijderen?";
    } else if (isUpdateForm) {
        header = "Update tokshop item";
    } else {
        header = "Maak tokshop item";
    }

    return(
        <div id="backofficecreation">
            <div id="creationform">
                <h1>{header}</h1>
                <form onSubmit={isUpdateForm ? update : create}>
                    <fieldset disabled={props.readOnly ? true : false}>
                        <label for="name">Naam</label>
                        <input id="name" value={name} onChange={e => setName(e.target.value)} type="text" name="name" placeholder="Itemnaam..."/>
                        <br/>
                        <label for="description">Beschrijving</label>
                        <input id="description" value={description} onChange={e => setDescription(e.target.value)} type="text" name="description" placeholder="Beschrijving item..."/>
                        <br/>
                        <label for="price">Prijs (€)</label>
                        <input id="price" value={price} onChange={e => setPrice(e.target.value)} type="number" step="0.01" min="0" name="price" placeholder="0"/>
                        <br/>
                        <label for="image">Foto van item</label>
                        <input type="file" onChange={e => {
                            const file = e.target.files[0];
                            setImage(file);
                        }} name="image" placeholder="Foto van item..."/>
                                                <br />
                        {props.readOnly ? <></> :
                            <button type="submit">{isUpdateForm ? 'Update' : 'Maak'} item</button>
                        }
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default CreateTokshopItemForm;