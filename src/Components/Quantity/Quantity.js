import React from "react";
import {connect} from "react-redux";
import {addQuantity, removeFromBasket, subtractQuantity} from "../../Redux/actions/basketActions/BasketActions";

const Quantity = props => {

    return (
        <div>
            <button
                id="plus"
                onClick={(e) => {
                    props.addQuantity(props.productId)
                }}>
                +
            </button>

            <input type='number'
                   value={props.quantity}
                   name="quantity"
                   readOnly={true}
            />
            <button id="minus" onClick={(e) => {
                props.subtractQuantity(props.productId)
            }}>-
            </button>
            {props.checkout ? <button onClick={() => {
                props.removeFromBasket(props.productId)
            }}>Remove</button> : null}
        </div>
    )
}

const mapStateToProps = state => {
    return {basket: state.BasketReducer.basket}
}

const mapDispatchToProps = dispatch => {
    return {
        addQuantity: (pid) => {
            (dispatch(addQuantity(pid)))
        },
        subtractQuantity: (pid) => {
            (dispatch(subtractQuantity(pid)))
        },
        removeFromBasket: (pid) => {
            (dispatch(removeFromBasket(pid)))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quantity);