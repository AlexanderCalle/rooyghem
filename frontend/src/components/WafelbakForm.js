import React, {useState, useEffect, useCallback, createRef} from 'react';
import ReCAPTCHA from "react-google-recaptcha";

const WafelbakForm = () => {
    const [groups, setGroups] = useState(null);
    const recaptchaRef = createRef();

    const [token, setToken] = useState();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [selectedGroup, setSelectedGroup] = useState("");
    const [totalAmount, setTotalAmount] = useState(1);
    const [email, setEmail] = useState("");
    const [pickUpMoment, setPickUpMoment] = useState("");
    const [phone, setPhone] = useState("");

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

    const postForm = () => {
        // console.log("Recpatcha resolved: " + recaptchaRef.current.callbacks.getResponse());
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

    const onChange = (value) => {
        console.log("Captcha value: " + value);
    }

    const onSubmit = async () => {
        // alert("In onSubmit");
        // const token = await recaptchaRef.current.executeAsync();
        // alert("Token: " + token);

        // form data
        postForm();
    }

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

    return (
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
                <select id="bannen" name="pick_up_moment" onChange={e => setPickUpMoment(e.target.value)}>
                    <option value="donderdag">Donderdag vanaf 19u</option>
                    <option value="vrijdag">Vrijdag vanaf 16u</option>
                    <option value="zaterdag">Zaterdag van 9u tot 12u</option>
                </select>
                <br/>
                <button type="submit"> Bestel </button>
                <ReCAPTCHA 
                    ref={recaptchaRef}
                    sitekey="6Lda4E4cAAAAAEMITzaJKTyhPGHZuDuKK4kFuCOD"
                    onChange={onChange}
                    size="invisible"
                />
            </form>
    );
}

export default WafelbakForm;