import {LOAD_FROM_THE_NET_PRODUCTS, LOAD_SINGLE_PRODUCT} from "./ProductActionsTypes";

export const LoadProducts = () => {
    return {type: LOAD_FROM_THE_NET_PRODUCTS}
}

export const getProductById = (productId) => {
    return {
        type: LOAD_SINGLE_PRODUCT, productId
    }
}
