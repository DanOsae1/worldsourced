import {combineReducers} from "redux";
import BasketReducer from "./BasketReducer";
import CheckoutReducer from "./CheckoutReducer";
import ProductReducer from "./ProductReducer";
import ApplicationReducer from "./ApplicationReducer";

export default combineReducers({
    BasketReducer,
    CheckoutReducer,
    ProductReducer,
    ApplicationReducer
})