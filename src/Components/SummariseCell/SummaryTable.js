import React from 'react';
import {Link} from "react-router-dom";
import Quantity from "../Quantity/Quantity";
import css from './Summary.module.css'
import {connect} from "react-redux";
import {removeFromBasket} from "../../Redux/actions/basketActions/BasketActions";

const SummaryTable = (props) => {

    const {headers, items} = props;

    return (
        <div className={css.SummaryContainer}>
            <table>
                <thead>
                <tr>
                    {headers.map((element, index) => (
                        <th key={index}>{element}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {items.map((el, i) => (
                    <tr key={i}>
                        <td>
                            <div className={css.SummaryImageContainer}><img alt={el.title} src={el.imageurl}/></div>
                        </td>
                        <td>
                            <Link to={"/product/" + el.productId}>{el.title}</Link>
                            <p>{el.productId}</p>
                        </td>

                        <td>
                            {el.price}
                        </td>

                        <td>
                            <Quantity productId={el.productId} quantity={el.quantity}/>
                        </td>

                        <td>
                            {el.quantity * el.price}
                        </td>

                        <td>
                            <button onClick={() => {
                                props.removeFromBasket(props.productId)
                            }}>x
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>)

}

const mapStateToProps = state => {
    return {basket: state.BasketReducer.basket}
}

const mapDispatchToProps = dispatch => {
    return {
        removeFromBasket: (pid) => {
            (dispatch(removeFromBasket(pid)))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SummaryTable);