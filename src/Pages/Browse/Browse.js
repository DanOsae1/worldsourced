import React from 'react'
import css from './Browse.module.css'
import {connect} from "react-redux";
import {addToBasket} from "../../Redux/actions/basketActions/BasketActions";
import {getProductById} from "../../Redux/actions/ProductActions/ProductActions";
import Grid from "../../Components/Grid/Grid";


const Browse = props => {


    return (
        <div className={css.Browse}>

            <div className={css.section1}>
                filter
            </div>

            <div className={css.section2}>
                <Grid items={props.products}/>
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
    return {products: state.ProductReducer.browsedProducts}

}

export default connect(mapStateToProps, mapDispatchToProps)(Browse);