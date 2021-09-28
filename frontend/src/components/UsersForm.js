import React, {useState, useEffect} from 'react'


const UsersForm = (props) => {
    const isUpdateForm = props.user !== undefined;
    const [firstname, setFirstName] = useState(isUpdateForm ? props.user.firstname : "");
    const [lastname, setLastname] = useState(isUpdateForm ? props.user.lastname : "");
    const [email, setEmail] = useState(isUpdateForm ? props.user.email : "");
    const [username, setUsername] = useState(isUpdateForm ? props.user.username : "");


    return(
        <div id="creationform">
            <h1>Maak gebruikers</h1>
            <form action="/users/create" method="POST" enctype="multipart/form-data">
                <label for="firstname">Voornaam </label>
                <input id="firstname" type="text" name="firstname" placeholder="Voornaam..."/>
                <br/>
                <label for="lastname">Naam </label>
                <input id="lastname" type="text" name="lastname" placeholder="Naam..."/>
                <br/>
                <label for="email">Email </label>
                <input id="email" type="email" name="email" placeholder="Email..."/>
                <br/>
                <label for="username">Gebruikersnaam </label>
                <input type="text" name="username" placeholder="Gebruikersnaam..."/>
                <br/>
                <label for="password">Wachtwoord </label>
                <input id="password" type="password" name="password" placeholder="Wachtwoord..."/>
                <br/>
                <label for="phone">Telefoonnummer </label>
                <input id="phone" type="text" name="phone" placeholder="Telefoonnummer..."/>
                <br/>
                <input type="checkbox" name="is_banleader" id="is_banleader" value="1"/>
                <label for="is_banleader">BanLeider</label>
                <br/>
                <input class="form-checkbox" id="is_admin" type="checkbox" name="is_admin" value="1"/>
                <label for="is_admin">Admin</label>
                <br/>
                <label for="bondsteam">Bondsteam</label>
                <select id="bondsteam" name="bondsteam">
                    <option>/</option>
                    <option>Bondsleider</option>
                    <option>Bondssecretaris</option>
                    <option>Bondspenningmeester</option>
                    <option>Volwassenen begeleiding</option>
                </select>
                <br/>
                <label for="bannen">Ban </label>
                <select id="bannen" name="group_id">
                    
                        <option value="1">Kabouters</option>
                    
                        <option value="2">Pagadders</option>
                    
                        <option value="3">Jongknapen</option>
                    
                        <option value="4">Knapen</option>
                    
                        <option value="5">Jonghernieuwers</option>
                    
                        <option value="6">Aspiranten</option>
                    
                        <option value="7">Hernieuwers</option>
                    
                        <option value="8">Oudercomite</option>
                    
                        <option value="9">Webteam</option>
                    
                </select>
                <br/>
                <label for="picture_path">Foto van gebruiker </label>
                <input type="file" name="image" placeholder="Leiders foto..."/>
                <br/>
                <button type="submit">Maak gebruiker</button>
            </form>
        </div>
    );
}

export default UsersForm;