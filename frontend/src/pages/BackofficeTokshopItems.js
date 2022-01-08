import React, { useState, useEffect } from 'react'
import BackofficeMenu from '../components/BackofficeMenu';
import Navbar from '../components/Navbar';
import '../style/backoffice.css';

const BackofficeTokshopItemsPage = () => {
    const [items, setItems] = useState(null);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/tokshop/items`, { 'credentials': 'include' });
            const json = await res.json();

            if (json.error) {
                setMessage("Er ging iets fout: " + json.error);
            } else {
                setItems(json.items);
            }
        };
        fetchData();
    }, [setItems, setMessage]);

    if(!items) {
        return (
            <>
                <Navbar />
                <main class="container" id="backofficecontainer">
                    <BackofficeMenu />
                    {message ? <p>{message}</p> : <p>Aan het laden...</p>}
                </main>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main className="container" id="backofficecontainer">
                <BackofficeMenu />
                <div class="interface">
                    <h2>Tokshop items</h2>
                    <div class="info">
                        {items.map(item => (
                            TokshopItemListItem(item)
                        ))}
                    </div>
                    <a href="/backoffice/tokshop/items/create" class="addLink">Nieuw item</a>
                </div>
            </main>
        </>
    );
}

const TokshopItemListItem = (tokshopitem) => {
    const updateLink = "/backoffice/tokshop/items/update/" + tokshopitem.tokshopitem_id;
    const deleteLink = "/backoffice/tokshop/items/delete/" + tokshopitem.tokshopitem_id;

    return(
        <div class="interfaceinfo">
            <image src={tokshopitem.picture}/>
            <p>{tokshopitem.name}: <b>€{tokshopitem.price}</b></p>
            <div class="buttons">
                <a href={updateLink}>Bewerk</a>
                <a href={deleteLink}>Verwijder</a>
            </div>
        </div>
    );
}

export default BackofficeTokshopItemsPage;