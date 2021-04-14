import {
    ADD_QUANTITY,
    ADD_TO_BASKET,
    HIDE_BASKET,
    REMOVE_FROM_BASKET,
    SHOW_BASKET,
    SUBTRACT_QUANTITY
} from "./BasketActionsTypes";

export const addToBasket = (product) => {
    return {type: ADD_TO_BASKET, product}
}

export const subtractQuantity = (pid) => {
    return {type: SUBTRACT_QUANTITY, pid}
}

export const addQuantity = pid => {
    return {type: ADD_QUANTITY, pid}
}

export const removeFromBasket = pid => {
    return {type: REMOVE_FROM_BASKET, pid}
}

export const showBasket = () => {
    return {type: SHOW_BASKET}
}

export const hideBasket = () => {
    return {type: HIDE_BASKET}
}