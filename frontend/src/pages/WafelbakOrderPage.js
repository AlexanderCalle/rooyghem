import React, {useState, useEffect} from 'react';
import ReCAPTCHA from "react-google-recaptcha";

const WafelbakOrderPage = () => {

    const [groups, setGroups] = useState(null);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const[selectedGroup, setSelectedGroup] = useState("");
    const [totalAmount, setTotalAmount] = useState(1);
    const [email, setEmail] = useState("");
    const [pickUpMoment, setPickUpMoment] = useState("");
    const [phone, setPhone] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:2000/groups/', {'credentials': 'include'});
            const json = await res.json();
            setGroups(json.groups);
        };

        fetchData();
    }, [setGroups]);

    if(!groups) {
        return(<p>Aan het laden...</p>);
    }

    const create = (formData) => {
        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            body: formData
        }

        fetch("http://localhost:2000/wafelbak/order", requestOptions)
        .then(response => {
            if (response.ok) {
                console.log("response ok!");
                window.location="/";
            } else {
                // something went wrong
                response.json().then(json => {console.log(json.error)});
            }
        });
    };

    const onSubmit = (token) => {
        const formData = new FormData();

        formData.append("firstname", firstName);
        formData.append("lastname", lastName);
        formData.append("group", selectedGroup);
        formData.append("total_amount", totalAmount);
        formData.append("phone", phone);
        formData.append("email", email);
        formData.append("pick_up_moment", pickUpMoment);

        create(formData);
    };

    return (
        <>
            <div id="wafelbakform">
            <h2>Bestel hier onze heerlijke wafels!</h2>
            <p>
                Onze jaarlijkse wafelbak draait weer op volle toeren. Bestel snel je pakketjes heerlijke luikse wafels. Een pakket van 4 wafels kost €5.
                De pakketten kunnen worden opgehaald op donderdag 28 oktober vanaf 19u, vrijdag 29 oktober vanaf 16u en zaterdag 30 oktober van 9u tot 12u.
                Deadline om wafels te bestellen online is woensdag 27 oktober.
            </p>
            <form id="wafelbak_form" onSubmit={onSubmit}>
                <input type="text" placeholder="Voornaam" name="firstname" onChange={e => setFirstName(e.target.value)} required />
                <input type="text" name="lastname" placeholder="Achternaam" onChange={e => setLastName(e.target.value)} required />
                <input type="number" name="total_amount" placeholder="Aantal pakketten..." onChange={e => setTotalAmount(e.target.value)} required />
                <input type="text" name="phone" placeholder="Telefoonnummer..." onChange={e => setPhone(e.target.value)} required />
                <input type="email" name="email" placeholder="Email..." onChange={e => setEmail(e.target.value)} required />
                <select id="bannen" name="group" onChange={e => setSelectedGroup(e.target.value)}>
                    {groups.map((group) => (
                        <option value={group.name}>{group.name}</option>
                    ))}
                    <option>Geen groep</option>
                </select>
                <select id="bannen" name="pick_up_moment" onChange={e => setSelectedGroup(e.target.value)}>
                    <option value="donderdag">Donderdag vanaf 19u</option>
                    <option value="vrijdag">Vrijdag vanaf 16u</option>
                    <option value="zaterdag">Zaterdag van 9u tot 12u</option>
                </select>
                <br/>
                <button class="g-recaptcha" data-sitekey="6Lda4E4cAAAAAEMITzaJKTyhPGHZuDuKK4kFuCOD" data-callback={onSubmit}>
                    Bestel
                </button>
            </form>
        </div>
        <div id="wafelbakphoto">
            <img src="/public/images/wafelbak.jpg" alt="Wafelbak" />
        </div>
    </>
    );
};

export default WafelbakOrderPage;