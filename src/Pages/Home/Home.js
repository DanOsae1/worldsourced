import React from 'react'
import css from './Home.module.css'
import Banner from "../../Components/Banner/Banner";
import Grid from "../../Components/Grid/Grid";
import {connect} from "react-redux";
import {LoadProducts} from "../../Redux/actions/ProductActions/ProductActions";
import Spotlight from '../../Components/Spotlight/Spotlight'

const Home = props => {


    return (
        <div className={css.Home}>
            <Banner/>
            <h1>Welcome to WorldSourced</h1>
            <h3>Some slogon goes here</h3>
            <p>To Change We are purveyors of quality to ensure your child and family has only the finest sourced and
                artisan hand-made products available.</p>
            <div className={css.ProductPlacement}>
                <img src={"https://via.placeholder.com/600x400/09f.png/fff"}/>
            </div>
            {/*<Subscription/>*/}
            <Grid items={props.products}/>
            <Spotlight/>
            <button id={css.Basket} onClick={() => {
                props.history.push("/basket")
            }}>Go To Basket
            </button>

            <div className={css.Delivery}>
                <div className={css.DeliverySection}>subscription</div>
                <div className={css.DeliverySection}>delivery</div>
                <div className={css.DeliverySection}>gift</div>

            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        products: state.ProductReducer.products
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadItems: () => dispatch(LoadProducts())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
