import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../style/tokshop.css';

function TokshopOrderPage() {
    // const [items, setItems] = useState(null);
    const [order, setOrder] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_HOST}/tokshop/items`);
            const json = await res.json();
            var tempOrder = new Map();
            
            json.items.forEach(item => {
                tempOrder.set(item, 0);
            })
            setOrder(tempOrder);
        }

        fetchData();
    }, [setOrder]);

    if (!order) {
        return(
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
        if(!doIncrement) {
            factor = -1;
        } 
        tempMap.set(itemInfo, startAmount + (1*factor));
        setOrder(tempMap);
        setTotalPrice(totalPrice + (itemInfo.price * factor));
        
    }

    return(
        <>
        <Navbar/>
        <main class="container" id="tokshopcontainer">
            <div id="tokshoplist">
                {
                    Array.from(order).map(([itemInfo, amount]) => (
                        <div class="tokshopitem">
                            <h3>{itemInfo.name}</h3>
                            <div class="tokshopitemimg">
                                <img src={itemInfo.picture}/>
                            </div>
                            <p>{itemInfo.description}</p>
                            <div class="tokshopitemcontrol">
                                <p><b>€{itemInfo.price}</b></p>
                                <button class="tokshopminbutton" onClick={() => changeAmount(itemInfo, false)} disabled={amount <= 0}>-</button>
                                <p>{amount}</p>
                                <button class="tokshopplusbutton" onClick={() => changeAmount(itemInfo, true)}>+</button>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div id="tokshopcontrol">
                <p>Totale prijs: €{totalPrice}</p>
                <button>Bestel</button>
            </div>
        </main>
        <Footer/>
        </>
    );
}

function TokshopItem(itemInfo, amount) {
    return(
        <div class="tokshopitem">
            <h3>{itemInfo.name}</h3>
            <image src={itemInfo.picture}/>
            <p>{itemInfo.description}</p>
            <div class="tokshopitemcontrol">
                <p><b>€{TokshopItem.price}</b></p>
                <button class="tokshopminbutton">-</button>
                <p>{amount}</p>
                <button class="tokshopplusbutton">+</button>
            </div>
        </div>
    );
}

export default TokshopOrderPage;