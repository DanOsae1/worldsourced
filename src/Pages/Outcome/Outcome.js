import React, {useEffect, useState} from "react";
import axios from '../../Communication/Axios'


const Outcome = props => {
    const [isOrderSuccess, setOrderSuccess] = useState(false)
    const [orderNumber, setOrderNumber] = useState("Order Number")
    const [address, setAddress] = useState({})
    const [itemSummary, setItemSummary] = useState([])

    useEffect(() => {
        //get order outcome from backend
        const orderid = props.match.params.id
        getOrderOutcome(orderid)
        setOrderSuccess(orderid !== "000010")


    }, [])

    const getOrderOutcome = (orderid) => {
        axios('/order-outcome?oi=' + orderid)
            .then(res => {
                let response = res.data
                console.log(response)
                setOrderSuccess(true)
                setOrderNumber(response.orderNumber)
                setAddress(response.address)
                setItemSummary(response.itemSummary)
            }).catch(exception => {
            console.error(exception)
        })
            .finally(
                console.log(orderNumber, address, itemSummary)
            )
    }


    return (
        <div>
            <div>
                Status Icon : success or failure
            </div>

            <div>
                Order Summary

                <p>{orderNumber}</p>
                <p>delivery address</p>
                <p>item summary</p>
                <button onClick={() => {
                    props.history.push('/')
                }}>Continue Shopping
                </button>
            </div>


        </div>
    )
}

export default Outcome;