import React from 'react'
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Quantity from "../../Components/Quantity/Quantity";
import css from './Basket.module.css';
import {removeFromBasket} from "../../Redux/actions/basketActions/BasketActions";

const Basket = props => {

    const {basket} = props;

    const table = <table>
        <thead>
        <tr>
            <th/>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Amount</th>
        </tr>
        <hr/>
        </thead>

        <tbody>
        {
            basket.map((element, index) => (
                <>
                    <tr key={index}>
                        <td>
                            <div><img alt={element.title} src={element.imageurl}/></div>
                        </td>
                        <td>
                            <Link to={"/product/" + element.productId}>{element.title}</Link>
                            <p>{element.productId}</p>
                        </td>

                        <td>
                            {element.price}
                        </td>

                        <td>
                            <div className={css.Quantity}>
                                <Quantity productId={element.productId} quantity={element.quantity}/>
                            </div>
                        </td>

                        <td>
                            {element.quantity * element.price}
                        </td>

                        <td>
                            <button onClick={() => {
                                props.removeItem(element.productId)
                            }}>x
                            </button>
                        </td>

                    </tr>
                    <hr/>
                </>
            ))
        }

        </tbody>
    </table>

    return (<>
        <div className={css.Basket}>
            <h1> Shopping Basket </h1>
            <div className={css.BasketContainer}>
                <div>
                    {props.basket.length === 0 ? <h4>No items in the basket</h4> : table}
                </div>
                {props.basket.length === 0 ? <button onClick={() => {
                    props.history.goBack()
                }}>Go Back </button> : <button onClick={() => {
                    props.history.push("/checkout")
                }}>Checkout</button>}
            </div>
        </div>
    </>)
}

const mapDispatchToProps = dispatch => {
    return {removeItem: (productid) => dispatch(removeFromBasket(productid))}
}

const mapStateToProps = state => {
    return {basket: state.BasketReducer.basket}

}
export default connect(mapStateToProps, mapDispatchToProps)(Basket);