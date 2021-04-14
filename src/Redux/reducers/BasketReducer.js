import {
    ADD_QUANTITY,
    ADD_TO_BASKET,
    HIDE_BASKET,
    REMOVE_FROM_BASKET,
    SHOW_BASKET,
    SUBTRACT_QUANTITY
} from '../actions/basketActions/BasketActionsTypes'

const initialState = {
    basket: Object.assign([]),
    showBasket: false
}

const BasketReducer = (state = initialState, action) => {

    switch (action.type) {
        // needs re working
        case ADD_TO_BASKET:
            let product = action.product
            let newbasket = state.basket;
            let itemInBasket = newbasket.find(el => (
                    el.productId === product.productId
                )
            )
            let basketProduct;
            if (itemInBasket) {
                let indexof = state.basket.indexOf(itemInBasket)
                let new_quantity = itemInBasket.quantity + product.quantity
                let new_subtotal = new_quantity * itemInBasket.price
                itemInBasket.subtotal = new_subtotal
                itemInBasket.quantity = new_quantity
                basketProduct = itemInBasket
                newbasket.splice(indexof, 1)
            } else {
                basketProduct = {
                    ...product,
                    "subtotal": 1 * product.price,
                    "quantity": 1
                }
            }
            newbasket = [...newbasket, basketProduct]
            return {
                ...state,
                basket: newbasket
            }
        case SUBTRACT_QUANTITY:
            let subtracted = action.pid
            let found = state.basket
            found.forEach(el => {
                    if (el.productId === subtracted) {
                        el.quantity > 1 ? el.quantity += -1 : el.quantity += 0
                        el.subtotal = el.price * el.quantity
                    }
                }
            )
            return {
                ...state,
                basket: [...found]
            }

        case ADD_QUANTITY:
            let added = action.pid
            let ad = state.basket
            ad.forEach(el => {
                if (el.productId === added) {
                    el.quantity += +1
                    el.subtotal = el.price * el.quantity
                }
            })
            return {
                ...state,
                basket: [...ad]
            }
        case REMOVE_FROM_BASKET:
            let rid = action.pid
            let brid = state.basket
            let frid = brid.find(el => (el.productId === rid))
            let i = brid.indexOf(frid)
            brid.splice(i, 1)
            console.log(frid)
            return {
                ...state,
                basket: [...brid]
            }

        case SHOW_BASKET:
            return {
                ...state,
                showBasket: true
            }
        case HIDE_BASKET:
            // let current = state.showBasket
            // console.log(current)
            // if (current) {
            //     const timer = setTimeout(() => {
            //         console.log("Hiding basket")
            //         current = false;
            //     }, 1000)
            //     clearTimeout(timer)
            // }
            return {
                ...state,
                showBasket: false
            }

        default:
            return {
                ...state,
            }
    }

}

export default BasketReducer;