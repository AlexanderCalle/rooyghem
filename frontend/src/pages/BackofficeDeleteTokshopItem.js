import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import BackofficeMenu from '../components/BackofficeMenu'
import Navbar from '../components/Navbar'
import CreateTokshopItemForm from '../components/CreateTokshopItemForm';

const BackofficeUsersDelete = () => {
    const params = useParams();
    const [itemInfo, setItemInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/tokshop/items/` + params.item_id, { credentials: 'include' });
            const json = await res.json();
            setItemInfo(json.item);
        };

        fetchData();
    }, [setItemInfo, params.item_id])

    if (!itemInfo) {
        return (
            <>
                <p>Aan het laden...</p>
            </>
        )
    }

    const deleteItem = async () => {
        const requestOptions = {
            method: 'DELETE',
            credentials: 'include'
        };

        fetch(`${process.env.REACT_APP_BACKEND_HOST}/tokshop/items/` + itemInfo.tokshopitem_id, requestOptions)
            .then(response => {
                if (response.ok || response.status == 204) {
                    window.location = "/backoffice/tokshop/items";
                }
            });
    };

    return (
        <>
            <Navbar />
            <main className="container" id="backofficecontainer">
                <BackofficeMenu />
                <div id="backofficecreation">
                    <CreateTokshopItemForm item={itemInfo} readOnly={true} />
                    <button onClick={deleteItem}>Verwijder item</button>
                </div>
            </main>
        </>
    );
}

export default BackofficeUsersDelete;