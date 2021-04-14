import React, {useEffect, useState} from 'react'
import css from './Checkout.module.css'
import {connect} from "react-redux";
import MoneyFormatter from "../../Functions/MoneyFormatter";
import {loadStripe} from "@stripe/stripe-js/pure";
import axios from "../../Communication/Axios";
import {useHistory} from "react-router";
import CheckoutContainer from './CheckoutContainer'
import {makeStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import {Typography} from "@material-ui/core";
import SummaryTable from '../../Components/SummariseCell/SummaryTable'


const Checkout = (props) => {

    const stripePromise = loadStripe(process.env.REACT_APP_STRIPE)
    const [stripeSessionId, setStripeSessionId] = useState('')
    const history = useHistory();

    //billing
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    let [addressline1, setAddressline1] = useState('');
    let [addressline2, setAddressline2] = useState('');
    let [city, setCity] = useState('');
    let [country, setCountry] = useState('');
    let [postcode, setPostcode] = useState('');

    //delivery
    const [del_firstName, setdel_FirstName] = useState('')
    const [del_lastName, setdel_LastName] = useState('')
    const [del_email, setdel_Email] = useState('');
    const [del_number, setdel_Number] = useState('');
    let [del_addressline1, setdel_Addressline1] = useState('');
    let [del_addressline2, setdel_Addressline2] = useState('');
    let [del_city, setdel_City] = useState('');
    let [del_country, setdel_Country] = useState('');
    let [del_postcode, setdel_Postcode] = useState('');

    let [checkoutSubtotal, setCheckoutSubtotal] = useState('');
    let [checkoutTotal, setCheckoutTotal] = useState('');
    let [tax, setTax] = useState('')

    const [deliverySameAsBilling, setDeliverySameAsBilling] = useState(true)
    const [standardDelivery, setSanDel] = useState(false)
    const [expressDelivery, setExpress] = useState(true)

    const personalDetails =
        [
            {"First Name": firstName},
            {"Last Name": lastName},
            {"Email": email},
            {"Telephone Number": number},

        ]
    const billingDetails = [
        {"1st Line Address": addressline1},
        {"2nd Line Address": addressline2},
        {"City": city},
        {"Country": country},
        {"Post Code": postcode},
    ]

    const deliveryDetails = [

        {"First Name": del_firstName},
        {"Last Name": del_lastName},
        {"Email": del_email},
        {"Telephone Number": del_number},

        {"1st Line Address": del_addressline1},
        {"2nd Line Address": del_addressline2},
        {"City": del_city},
        {"Country": del_country},
        {"Post Code": del_postcode},
    ]

    useEffect(() => {
        let subtotal = props.basket.reduce((acc, product) => acc + product.subtotal, 0)
        setCheckoutSubtotal(MoneyFormatter(subtotal, null))
        setCheckoutTotal(MoneyFormatter(subtotal * 1.2, null))
        setTax(MoneyFormatter((subtotal * 1.2 - subtotal), null))
    }, [props.basket])

    useEffect(() => {
        const query = new URLSearchParams(window.location.search)

        if (query.get("success")) {
            //push to order summary page
        }
        if (query.get("canceled")) {
            //return to checkout as something went wrong
        }
    }, [])

    const onCheckBoxChange = (e) => {
        const {name, value} = e.target
        switch (name) {
            case "delivery":
                setDeliverySameAsBilling(!deliverySameAsBilling)
                break;
            case "standard":
                setSanDel(!standardDelivery)
                setExpress(!expressDelivery)

                break;
            case "express":
                setExpress(!expressDelivery)
                setSanDel(!standardDelivery)
                break;
            default:
        }

    }
    const onchange = (e) => {
        const {name, value} = e.target
        switch (name) {
            case "First Name":
                setFirstName(value)
                break;
            case "Last Name":
                setLastName(value)
                break;
            case "Email" :
                setEmail(value)
                break;
            case "Telephone Number":
                setNumber(value)
                break;
            case "1st Line Address":
                setAddressline1(value)
                break;
            case "2nd Line Address":
                setAddressline2(value)
                break;
            case "Post Code":
                setPostcode(value)
                break;
            case "City":
                setCity(value)
                break;
            case "Country":
                setCountry(value)
                break;
            default:
            //do Nothing
        }
    }

    const onDeliveryChange = (e) => {
        const {name, value} = e.target
        switch (name) {
            case "First Name":
                setdel_FirstName(value)
                break;
            case "Last Name":
                setdel_LastName(value)
                break;
            case "Email" :
                setdel_Email(value)
                break;
            case "Telephone Number":
                setdel_Number(value)
                break;
            case "1st Line Address":
                setdel_Addressline1(value)
                break;
            case "2nd Line Address":
                setdel_Addressline2(value)
                break;
            case "Post Code":
                setdel_Postcode(value)
                break;
            case "City":
                setdel_City(value)
                break;
            case "Country":
                setdel_Country(value)
                break;
            default:
            //do Nothing
        }
    }

    const onSubmit = async (e) => {

        let address = {
            addressline1,
            addressline2,
            city,
            country,
            postcode,
        }
        const stripe = await stripePromise
        let paymentIntent = {
            firstName,
            lastName,
            email,
            number,
            address,
            "delivery": {
                standardDelivery,
                expressDelivery,
                "address": {
                    "firstName": del_firstName,
                    "lastName": del_lastName,
                    "email": del_email,
                    "number": del_number,
                    "addressline1": del_addressline1,
                    "addressline2": del_addressline2,
                    "city": del_city,
                    "country": del_country,
                    "postcode": del_postcode
                }
            },
            "items": [
                ...props.basket
            ]
        }
        axios.post('/checkout-purchase', paymentIntent)
            .then(response => {
                let cs = response.data.clientSecret
                console.log(props)
                stripe.redirectToCheckout({
                    sessionId: cs
                })
            }).catch(e => {
            console.log("error: ", e)
        }).finally(() => {

        });

    }

    const useStyles = makeStyles((theme) => ({
        layout: {
            width: 'auto',
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
            [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
                width: 600,
                marginLeft: 'auto',
                marginRight: 'auto',
            },
        },
        paper: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            padding: theme.spacing(1),
            [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
                marginTop: theme.spacing(0),
                marginBottom: theme.spacing(0),
                padding: theme.spacing(3),
            },
        },
        stepper: {
            padding: theme.spacing(3, 0, 5),
        },
        buttons: {
            display: 'flex',
            justifyContent: 'flex-end',
        },
        button: {
            marginTop: theme.spacing(3),
            marginLeft: theme.spacing(1),
        },
    }));

    const classes = useStyles();

    return (
        <div className={css.Checkout}>

            <div className={css.Section}>
                <CssBaseline/>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h4" align="center">
                            Order Summary
                        </Typography>

                        <div>
                            <SummaryTable headers={[" ", "Title", "Price", "Quantity", "Subtotal", "Remove"]} items={props.basket}/>
                        </div>
                        <Typography variant="h6" gutterBottom>
                            <p>subtotal: {checkoutSubtotal} </p>
                            <p>delivery: £1</p>
                            <p>tax: {tax}</p>
                            <p> total: {checkoutTotal}</p>
                        </Typography>
                    </Paper>
                </main>
            </div>

            <div className={css.Section}>
                <CheckoutContainer/>
                {/*Checkout*/}

                {/*Shipping options*/}
                {/*<div>*/}
                {/*    <input type='checkbox' name="standard" value={standardDelivery} checked={standardDelivery}*/}
                {/*           onChange={onCheckBoxChange}/> Standard*/}
                {/*    <input type='checkbox' name="express" value={expressDelivery} checked={expressDelivery}*/}
                {/*           onChange={onCheckBoxChange}/> Express*/}
                {/*</div>*/}
                {/*<br/>*/}

            </div>
        </div>
    )

}

const mapStateToProps = state => {
    return {basket: state.BasketReducer.basket}
}
const mapDispatchToProps = dispatch => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);