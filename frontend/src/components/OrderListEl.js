import React from 'react';
import '../style/backoffice.css'

const OrderListEl = (props) => {
    const orderInfo = props.order;
    const deleteLink = "/wafelbak/order/delete/" + orderInfo.order_id;
    return (
        <details className="interfaceinfo">
            <summary>
                {orderInfo.firstname} {orderInfo.lastname}
                <a class="summary-button" href={deleteLink}></a>
            </summary>
            <p>Ban: {orderInfo.group}</p>
            <p>Nummer: {orderInfo.phone}</p>
            <p>Email: {orderInfo.email}</p>
            <p>Aantal pakketten: {orderInfo.total_amount}</p>
            <p>Ophaaldag: {orderInfo.pick_up_moment}</p>
        </details>
    )
};

export default OrderListEl;