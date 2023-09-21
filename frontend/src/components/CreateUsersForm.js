import React, { useState, useEffect } from 'react'
// import '../style/backoffice.css'

const CreateUsersForm = (props) => {

    const isUpdateForm = props.userInfo !== undefined;

    const [groups, setGroups] = useState(null);
    const [firstname, setFirstname] = useState(isUpdateForm ? props.userInfo.firstname : "");
    const [lastname, setLastname] = useState(isUpdateForm ? props.userInfo.lastname : "");
    const [email, setEmail] = useState(isUpdateForm ? props.userInfo.email : "");
    const [username, setUsername] = useState(isUpdateForm ? props.userInfo.username : "");
    const [password, setPassword] = useState(isUpdateForm ? props.userInfo.password : "");
    const [phone, setPhone] = useState(isUpdateForm ? props.userInfo.phone : "");
    const [isAdmin, setIsAdmin] = useState(isUpdateForm ? props.userInfo.is_admin : 0);
    const [bondsteam, setBondsteam] = useState(isUpdateForm ? props.userInfo.bondsteam : "/");
    const [image, setImage] = useState(null);
    const [groupId, setGroupId] = useState(isUpdateForm ? props.userInfo.group_id : 1);
    const [isBanleader, setIsBanleader] = useState(isUpdateForm ? props.userInfo.is_banleader : 0);

    // fetch group data
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/groups/allgroups`, { 'credentials': 'include' });
            const json = await res.json();
            setGroups(json.groups);
        }

        fetchData();
    }, [setGroups]);

    const makeFormData = () => {
        const formData = new FormData();

        formData.append("firstname", firstname);
        formData.append("lastname", lastname);
        formData.append("email", email);
        formData.append("username", username);
        formData.append("password", password);
        formData.append("phone", phone);
        formData.append("is_admin", isAdmin);
        formData.append("bondsteam", bondsteam);
        formData.append("image", image);
        formData.append("group_id", groupId);
        formData.append("is_banleader", isBanleader);

        return formData;
    }

    const create = (e) => {
        e.preventDefault();

        const formData = makeFormData();

        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            body: formData
        }

        fetch(`${process.env.REACT_APP_BACKEND_HOST}/users/create`, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.statuscode === 200) {
                    window.location = "/backoffice/users"
                } else {
                    console.log(data.error);
                }
            })
    }

    const update = (e) => {
        e.preventDefault();

        const formData = makeFormData();

        const requestOptions = {
            method: 'PUT',
            credentials: 'include',
            body: formData
        }

        fetch(`${process.env.REACT_APP_BACKEND_HOST}/users/single/` + props.userInfo.user_id, requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data.statuscode === 200) {
                    window.location = "/backoffice/users"
                } else {
                    console.log(data.error);
                }
            })
    }

    if (!groups) {
        return (
            <p>Aan het laden...</p>
        )
    }

    var header = "";
    if (props.readOnly) {
        console.log("Is read only");
        header = "Gebruiker verwijderen?"
    } else if (isUpdateForm) {
        header = "Update gebruiker";
    } else {
        header = "Maak gebruiker";
    }

    return (
        <div id="backofficecreation">
            <div id="creationform">
                <h1>{header}</h1>
                <form onSubmit={isUpdateForm ? update : create}>
                    <fieldset disabled={props.readOnly ? true : false}>
                        <label for="firstname">Voornaam </label>
                        <input id="firstname" value={firstname} onChange={e => setFirstname(e.target.value)} type="text" name="firstname" placeholder="Voornaam..." />
                        <br />
                        <label for="lastname">Naam </label>
                        <input id="lastname" value={lastname} onChange={e => setLastname(e.target.value)} type="text" name="lastname" placeholder="Naam..." />
                        <br />
                        <label for="email">Email </label>
                        <input id="email" value={email} onChange={e => setEmail(e.target.value)} type="email" name="email" placeholder="Email..." />
                        <br />
                        <label for="username">Gebruikersnaam </label>
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} name="username" placeholder="Gebruikersnaam..." />
                        <br />
                        {!isUpdateForm && (
                            <>
                                <label for="password">Wachtwoord </label>
                                <input id="password" value={password} onChange={e => setPassword(e.target.value)} type="password" name="password" placeholder="Wachtwoord..." />
                                <br />
                            </>
                        )}
                        <label for="phone">Telefoonnummer </label>
                        <input id="phone" value={phone} onChange={e => setPhone(e.target.value)} type="text" name="phone" placeholder="Telefoonnummer..." />
                        <br />
                        {isUpdateForm && props.userInfo.is_banleader == 1 ? (
                            <input type="checkbox" onChange={e => setIsBanleader(e.target.value)} name="is_banleader" id="is_banleader" value="1" checked />
                        ) : (
                            <input type="checkbox" onChange={e => setIsBanleader(e.target.value)} name="is_banleader" id="is_banleader" value="1" />
                        )}
                        <label for="is_banleader">BanLeider</label>
                        <br />
                        {isUpdateForm && isAdmin === 1 ? (
                            <input class="form-checkbox" onChange={e => setIsAdmin(e.target.value)} id="is_admin" type="checkbox" name="is_admin" value="1" checked />
                        ) : (
                            <input class="form-checkbox" onChange={e => setIsAdmin(e.target.value)} id="is_admin" type="checkbox" name="is_admin" value="1" />
                        )}
                        <label for="is_admin">Admin</label>
                        <br />
                        <label for="bondsteam">Bondsteam</label>
                        <select id="bondsteam" onChange={e => setBondsteam(e.target.value)} name="bondsteam">
                            <option>/</option>
                            <option>Bondsleider</option>
                            <option>Bondssecretaris</option>
                            <option>Bondspenningmeester</option>
                            <option>Volwassenen begeleiding</option>
                        </select>
                        <br />
                        <label for="bannen">Ban </label>
                        <select id="bannen" onChange={e => setGroupId(e.target.value)} name="group_id" value={groupId}>
                            {groups.map((group) => (
                                <option value={group.group_id}>{group.name}</option>
                            ))}
                        </select>
                        <br />
                        <label for="picture_path">Foto van gebruiker</label>
                        <input type="file" onChange={e => {
                            const file = e.target.files[0];
                            setImage(file);
                        }} name="image" placeholder="Leiders foto..." />
                        <br />
                        {props.readOnly ? <></> :
                            <button type="submit">{isUpdateForm ? 'Update' : 'Maak'} gebruiker</button>
                        }
                    </fieldset>
                </form>
            </div>
        </div>
    )
}

export default CreateUsersForm
