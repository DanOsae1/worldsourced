import React, {useState} from 'react'
import css from './Item.module.css'
import {useHistory} from 'react-router-dom'
import MoneyFormatter from "../../Functions/MoneyFormatter";
import {addToBasket, hideBasket, showBasket} from "../../Redux/actions/basketActions/BasketActions";
import {getProductById} from "../../Redux/actions/ProductActions/ProductActions";
import {connect} from "react-redux";

const Item = (props) => {

    const [isHovering, setIsHovering] = useState(false)

    const history = useHistory();

    const goToImageLink = (id) => {
        history.push("/product/" + id)
    }

    const addToCart = () => {
        const {productId, price, imageurl, description, title} = props
        let product = {
            productId,
            price,
            description,
            title,
            imageurl,
            "quantity": 1,
            "subtotal": 0
        }
        props.addToBasket(product)
        props.showBasket()
    }


    return (
        <div className={css.Item} onMouseLeave={() => {
            setIsHovering(false)
        }} onMouseEnter={() => {
            setIsHovering(true)
        }}>
            <img src={props.imageurl} alt={props.title}/>

            <button id={css.MoreInfo} onClick={() => {
                history.push("/product/" + props.productId)
            }}>More Info
            </button>

            <div className={css.Details}>
                <p>{props.title}</p>
                <p>{MoneyFormatter(props.price, null)} </p>
            </div>

            <button id={css.Cart} onClick={() => {
                addToCart()
            }}>Add to cart
            </button>

        </div>)
}

const mapStateToProps = state => {
    return {
        basket: state.BasketReducer.basket,
        showBasket: state.BasketReducer.showBasket
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addToBasket: (product) => dispatch(addToBasket(product)),
        getProductById: id => dispatch(getProductById(id)),
        showBasket: () => dispatch(showBasket()),
        hideBasket: () => {
            dispatch(hideBasket())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Item)