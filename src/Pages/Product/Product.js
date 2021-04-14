import React, {useEffect, useState} from "react";
import {useHistory} from 'react-router-dom'
import MoneyFormatter from "../../Functions/MoneyFormatter";
import css from './Product.module.css'
import {connect} from "react-redux";
import {addToBasket} from "../../Redux/actions/basketActions/BasketActions";
import {getProductById} from "../../Redux/actions/ProductActions/ProductActions";
import {Container} from "@material-ui/core";
import Grid from "../../Components/Grid/Grid";


function Product(props) {

    const [quantity, setQuantity] = useState(1)
    const [subtotal, setSubtotal] = useState(0)
    const [oneTime, setOnetime] = useState(false);
    const [subscription, setSubscription] = useState(true);
    const history = useHistory();
    const [dropDown, setDropDown] = useState(false);

    useEffect(() => {
        props.getProduct(props.match.params.id)
        setSubtotal(props.product.price * quantity)
    }, [])

    useEffect(() => {
        if (props.product) {
            let pz = quantity * props.product.price
            setSubtotal(pz)
        }
    }, [quantity])


    const onchange = (e) => {
        const {name, value} = e.target
        switch (name) {
            case 'oneTime':
            case 'subscribe':
                setOnetime(!oneTime)
                setSubscription(!subscription)
                break;
            case 'quantity':
                setQuantity(value)
                break;
            default:
            //nothing
        }
    }

    const onConfirmPurchase = (e) => {
        //set up payment object
        let purchase = {
            ...props.product,
            quantity,
            subtotal,
            subscription,
            oneTime
        }
        props.addToBasket(purchase)
        if (e.target.id === "straightPurchase") {
            history.push("/checkout")
        }

    }

    function applyQuantity(event) {
        let new_quantity = quantity;
        if (event.target.id === "minus" && quantity > 1) {
            new_quantity = quantity - 1
        } else if (event.target.id === "plus") {
            new_quantity = quantity + 1
        }
        setQuantity(new_quantity)


    }

    return (
        <div className={css.Product}>

            <div className={css.lowerProduct}>

                <Container maxWidth="lg">

                    <div className={css.Container}>
                        <div className={css.Section}>
                            <div className={css.ProductImg}>
                                <img src={props.product.imageurl} alt={props.product.title}/>
                            </div>
                            Other image array
                        </div>

                        <div className={css.Section}>
                            <div style={{paddingBottom: "50px"}}>
                                <h1>{props.product.title}</h1>
                                <h4>{MoneyFormatter(props.product ? props.product.price : 0, null)}</h4>
                            </div>

                            <div className={css.Descriptions}>
                                <h5 onClick={() => {
                                    setDropDown(!dropDown)
                                }}>Description</h5>
                            </div>
                            {dropDown ? <p> {props.product.description}</p> : null}


                            <div className={css.Checkout}>
                                <div className={css.Quantity}>
                                    <button id="plus" onClick={(e) => {
                                        applyQuantity(e)
                                    }}>+
                                    </button>
                                    <input type='number'
                                           value={quantity}
                                           onChange={onchange}
                                           name="quantity"
                                    />
                                    <button id="minus" onClick={(e) => {
                                        applyQuantity(e)
                                    }}>-
                                    </button>
                                </div>

                                <div className={css.ButtonGroup}>
                                    <button id="straightPurchase" onClick={event => {
                                        onConfirmPurchase(event)
                                    }}>Buy Now
                                    </button>

                                    <button id="basket" onClick={(e) => {
                                        onConfirmPurchase(e)
                                    }}>Add to Basket
                                    </button>

                                </div>
                            </div>

                        </div>
                    </div>

                </Container>

                <div>
                    <h3> You may be also be interested in: </h3>
                    <Grid items={[props.product, props.product, props.product, props.product]}/>
                </div>


            </div>

        </div>

    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToBasket: (product) => dispatch(addToBasket(product)),
        getProduct: (id) => (dispatch(getProductById(id)))
    }
}

const mapStateToProps = (state) => {
    return {product: state.ProductReducer.focusedProduct}

}

export default connect(mapStateToProps, mapDispatchToProps)(Product);