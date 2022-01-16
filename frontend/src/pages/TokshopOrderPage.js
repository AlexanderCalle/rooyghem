import React, { useEffect, useState, createRef } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../style/tokshop.css';

function TokshopOrderPage() {
    const recaptchaRef = createRef();
    const [showItemsList, setShowItemsList] = useState(true);

    const [order, setOrder] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);

    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [groups, setGroups] = useState(null);
    const [groupid, setGroupid] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const itemsRes = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/tokshop/items`);
            const groupsRes = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/groups`);
            const itemsJson = await itemsRes.json();
            const groupsJson = await groupsRes.json();
            var tempOrder = new Map();

            itemsJson.items.forEach(item => {
                tempOrder.set(item, 0);
            })
            setOrder(tempOrder);
            setGroups(groupsJson.groups);
        }
        fetchData();
    }, [setOrder, setGroups]);

    if (!order || !groups) {
        return (
            <>
                <Navbar />
                <main class="container" id="tokshopcontainer">
                    <p>Aan het laden...</p>
                </main>
                <Footer />
            </>
        );
    }

    const changeAmount = (itemInfo, doIncrement) => {
        var tempMap = new Map(order);
        const startAmount = tempMap.get(itemInfo);
        var factor = 1;
        if (!doIncrement) {
            factor = -1;
        }
        const newvalue = startAmount + (1 * factor);
        if (newvalue >= 0) {
            tempMap.set(itemInfo, newvalue);
            setOrder(tempMap);
            setTotalPrice(totalPrice + (itemInfo.price * factor));
            console.log(tempMap);
            console.log(tempMap.get(itemInfo))
        }

    };

    const postOrder = async () => {
        var formData = new FormData();
        formData.append("email", email);
        formData.append("firstname", firstname);
        formData.append("lastname", lastname);
        formData.append("group_id", groupid);

        var items = Array.from(order).filter(([k, v]) => { return v > 0; }).map(([item, amount]) => ({ tokshopitem_id: item.tokshopitem_id, amount: amount }));
        formData.append("items", items);
        const requestOptions = {
            method: 'POST',
            credentials: 'include',
            body: formData
        };

        var alertString = "";
        for (var item of formData.entries()) {
            alertString += item[0] + ": " + item[1] + "\n";
        }
        alert(alertString);

        fetch(`${process.env.REACT_APP_BACKEND_HOST}/tokshop/orders`, requestOptions)
            .then(response => {
                response.json().then(json => { })
            });

        // fetch(`https://jsonplaceholder.typicode.com/`, requestOptions)
        // .then(response => {
        //     response.json().then(json => {alert(JSON.stringify(json))})
        // });
    }

    const makeItemList = () => {
        return (
            <>
                <div id="tokshopcontrol">
                    <h2>Tokshop</h2>
                    <div className="tokshopcontroltotal">
                        <p><b>Totale prijs: €{totalPrice.toFixed(2)}</b></p>
                        <button onClick={e => setShowItemsList(false)}>Bestellen</button>
                    </div>
                </div>
                <div id="tokshoplist">
                    {
                        Array.from(order).map(([itemInfo, amount]) => (
                            <div class="tokshopitem">
                                <div class="imgdiv b-line">
                                    <img src={itemInfo.picture} />
                                </div>
                                <div class="tokshopiteminfo">
                                    <h3>{itemInfo.name}</h3>
                                    <h4>€{itemInfo.price}</h4>
                                    {/* <p>{itemInfo.description}</p> */}
                                </div>
                                <div class="tokshopitemcontrol">
                                    {order.get(itemInfo) > 0 ? (
                                        <div>
                                            <button className="addminbtn" onClick={() => changeAmount(itemInfo, false)}>-</button>
                                            <p><b>{amount}</b></p>
                                            <button className="addminbtn" onClick={() => changeAmount(itemInfo, true)}>+</button>
                                        </div>
                                    ) : (
                                        <button onClick={() => changeAmount(itemInfo, true)} className="tokshopitembtn">Voeg toe!</button>
                                    )}
                                </div>
                            </div>
                        ))
                    }
                </div>

            </>
        );
    };

    const makeUserForm = () => {
        return (
            <div id="finishorderview">
                <div id="orderlist">
                    <div id="orderlistitems">
                        {
                            Array.from(order)
                                .filter(([k, v]) => { return v > 0; })
                                .map(([item, amount]) => (
                                    <div class="orderitem">
                                        <div class="imgdiv">
                                            <img src={item.picture} />
                                        </div>
                                        <div className="orderiteminfo">
                                            <p><b>{item.name}</b></p>
                                            <div className="orderiteminfoprice">
                                                <p>Aantal: {amount}</p>
                                                <p>Prijs: €{item.price.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        }
                    </div>
                    <div id="ordertotalpricediv">
                        <p><b>Totaal: €{totalPrice.toFixed(2)}</b></p>
                    </div>
                </div>
                <form onSubmit={postOrder}>
                    <label for="email">Emailadres</label>
                    <input type="email" value={email} placeholder="Emailadres" name="email" onChange={(e) => setEmail(e.target.value)} required />
                    <label>Voornaam lid <i>(bestelling zal meegegeven worden op activiteit)</i></label>
                    <input type="text" value={firstname} placeholder="Voornaam lid" name="firstname" onChange={(e) => setFirstname(e.target.value)} required />
                    <label>Achternaam lid <i>(bestelling zal meegegeven worden op activiteit)</i></label>
                    <input type="text" value={lastname} placeholder="Achternaam lid" name="lastname" onChange={(e) => setLastname(e.target.value)} required />
                    <label>Ban waartoe het lid behoort</label>

                    <select id="bannen" name="group" value={groupid ? groupid : 1} onChange={e => setGroupid(e.target.value)}>
                        {groups.map((group) => (
                            <option value={group.group_id}>{group.name}</option>
                        ))
                        }
                    </select>
                    <div>
                        <button onClick={e => setShowItemsList(true)}>Bestelling aanpassen</button>
                        <button type="submit"
                            disabled={totalPrice <= 0}>
                            Bestelling plaatsen</button>
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey="6Lda4E4cAAAAAEMITzaJKTyhPGHZuDuKK4kFuCOD"
                            size="invisible"
                        />
                    </div>
                </form>
            </div>)
    };

    return (
        <>
            <Navbar />
            <main class="container" id="tokshopcontainer">
                {showItemsList ? makeItemList() : makeUserForm()}
            </main>
            <Footer />
        </>
    );
}

export default TokshopOrderPage;