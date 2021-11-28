import React, {useState, useEffect} from 'react';
import BackofficeMenu from '../components/BackofficeMenu';
import Navbar from '../components/Navbar';
import OrderListEl from '../components/OrderListEl';
import '../style/backoffice.css';

const BackofficeWafelbakPage = () => {
    const [orders, setOrders] = useState(null);
    const [message, setMessage] = useState(null);
    const [nrOrders, setNrOrders] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('http://localhost:2000/wafelbak/orders/', {'credentials': 'include'});
            const json = await res.json();

            if(res.error) {
                setMessage("Er was een fout: " + json.error);
            } else {
                setOrders(json.orders);
                setNrOrders(json.total_orders);
            }
        };

        fetchData();
    }, [setOrders, setNrOrders, setMessage]);

    if(!orders) {
        return(
            <>
                <Navbar />
                <main class="container" id="backofficecontainer">
                    <BackofficeMenu />
                    {message ? <p>{message}</p> : <p>Aan het laden....</p>}
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
                    <div class="orders-header">
                        <h2>Wafelbak bestellingen</h2>
                        <p>Totaal aantal pakketten: {nrOrders}</p>
                        <a href="/wafelbak/excel">Download bestellingen</a>
                    </div>

                    <div class="info">
                        {
                            orders.map(order => (
                                <OrderListEl order={order} />
                            ))
                        }
                    </div>
                </div>
            </main>
        </>
    );
}

export default BackofficeWafelbakPage;