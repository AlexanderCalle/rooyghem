import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BackofficeMenu from '../components/BackofficeMenu';
import '../style/backoffice.css'
import CreateTokshopItemForm from '../components/CreateTokshopItemForm';

function BackofficeUpdateTokshopItemPage () {
    const params = useParams();

    const [itemInfo, setItemInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/tokshop/items/` + params.item_id, { 'credentials': 'include' });
            const json = await res.json();
            setItemInfo(json.item);
        }

        fetchData();
    }, [setItemInfo, params.item_id]);

    if (!itemInfo) {
        return (
            <>
                <Navbar />
                <main className="container" id="backofficecontainer">
                    <BackofficeMenu />
                    <p>Aan het laden...</p>
                </main>
            </>
        )
    }

    return (
        <>
            <Navbar />
            <main className="container" id="backofficecontainer">
                <BackofficeMenu />
                <CreateTokshopItemForm item={itemInfo} />
            </main>
        </>
    )
}

export default BackofficeUpdateTokshopItemPage;
