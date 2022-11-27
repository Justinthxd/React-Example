import { ref, remove, update } from 'firebase/database';
import React from 'react'
import { db } from '../data/firebase';
import './Order.css'

const Order = ({ order, id }) => {
    const deleteOrder = () => {
        remove(ref(db, 'orders/' + id));
    }

    const updateOrder = () => {
        if (order.status === 'Pending') {
            update(ref(db, 'orders/' + id), {
                status: 'Delivered',
            });
        } else {
            update(ref(db, 'orders/' + id), {
                status: 'Pending',
            });
        }
    }

    return (
        <div className='cont'>
            <div class="row">
                <div class="col"><h5 >{order['title']}</h5></div>
                <div class="col"><b>{order['status']}</b></div>
                <div class="w-100"></div>
                <hr />
                <div class="col">
                    <h4><b>Items</b></h4>
                    {order['items']}
                </div>
                <br />
                <br />
                <br />
                <hr />
                <div class="w-100"></div>
                <div class="col"><button className='btn btn-warning' >Edit</button></div>
                <div class="col"><button className='btn btn-danger' onClick={deleteOrder}>Remove</button></div>
                <div class="col"><button className='btn btn-primary' onClick={updateOrder}>Status</button></div>
            </div>
        </div>
    );
}

export default Order;
