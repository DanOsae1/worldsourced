import './App.css';
import Header from "./Components/Header/Header";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./Pages/Home/Home";
import Product from "./Pages/Product/Product"
import Checkout from "./Pages/Checkout/Checkout";
import React from 'react'
import Outcome from "./Pages/Outcome/Outcome";
import Browse from "./Pages/Browse/Browse";
import {connect} from "react-redux";
import Basket from "./Components/Basket/Basket";
import {hideBasket} from "./Redux/actions/basketActions/BasketActions";
import Footer from './Components/Footer/Footer'
import ProfileBasket from './Pages/Profile/Basket'


const App = props => {

    return (
        <React.Fragment>
            <BrowserRouter>

                <div className="App">
                    <Header/>
                    <Switch>
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/basket" component={ProfileBasket}/>

                        <Route exact path="/product/:id" component={Product}/>
                        <Route path="/checkout" exact render={() =>
                            <Checkout/>
                        }/>
                        <Route path="/outcome/:id" component={Outcome}/>
                        <Route path="/browse" component={Browse}/>
                    </Switch>

                    <Footer/>
                </div>
            </BrowserRouter>
        </React.Fragment>
    );
}

const mapStateToProps = state => {
    return {
        basket: state.BasketReducer.basket,
        showBasket: state.BasketReducer.showBasket
    }
}

const mapDispatchToProps = dispatch => {
    return {
        hideBasket: () => (dispatch(hideBasket()))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
