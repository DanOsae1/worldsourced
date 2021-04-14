import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {
    addQuantity,
    hideBasket,
    removeFromBasket,
    subtractQuantity
} from "../../Redux/actions/basketActions/BasketActions";
import Summary from "../SummariseCell/SummaryCell";
import css from './Basket.module.css'
import HOC from '../../HigherOrderComponents/hoc';

const Basket = props => {

    useEffect(() => {
        const timer = setTimeout(() => {
            props.hideBasket()
        }, 5000)
    }, [props.showBasket === true])

    return (
        <HOC>
            {props.showBasket ? <div className={css.Basket}>
                <h1>Cart</h1>
                {props.basket.length === 0 ? <p>Cart is Empty</p> :

                <ul>{props.basket.map((el, i) => (<li key={i}>
                    <Summary image={el.imageurl}
                             title={el.title}
                             price={el.price}
                             productId={el.productId}
                             quantity={el.quantity}
                    />
                </li>))}
                </ul>}
            </div> : null}
        </HOC>
    )
}

const mapStateToProps = state => {
    return {
        basket: state.BasketReducer.basket,
        showBasket: state.BasketReducer.showBasket
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addQuantity: (pid) => {
            dispatch(addQuantity(pid))
        },
        subtractQuantity: (pid) => {
            dispatch(subtractQuantity(pid))
        },
        removeFromBasket: (pid) => {
            dispatch(removeFromBasket(pid))
        },
        hideBasket: () => {
            dispatch(hideBasket())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Basket)