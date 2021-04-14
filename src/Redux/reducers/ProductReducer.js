import {LOAD_FROM_THE_NET_PRODUCTS, LOAD_SINGLE_PRODUCT} from "../actions/ProductActions/ProductActionsTypes";

const initialstate = {
    products: [{
        "id": 1,
        "productId": "dsadaddaf",
        "title": "TestProduct1",
        "price": 230,
        "description": "A description of a product",
        "imageurl": "https://via.placeholder.com/210x194"
    }, {
        "id": 2,
        "productId": "ds334addaf",
        "title": "TestProduct2",
        "price": 200,
        "description": "A description of a product",
        "imageurl": "https://via.placeholder.com/210x194"
    }, {
        "id": 3,
        "productId": "dsavhcddaf",
        "title": "TestProduct3",
        "price": 4,
        "description": "A description of a product",
        "imageurl": "https://via.placeholder.com/210x194"
    }, {
        "id": 4,
        "productId": "dsaa6570cddaf",
        "title": "TestProduct4",
        "price": 29,
        "description": "A description of a product",
        "imageurl": "https://via.placeholder.com/210x194"
    },{
        "id": 5,
        "productId": "dsaa6570cdda7f",
        "title": "TestProduct5",
        "price": 89,
        "description": "A description of a product",
        "imageurl": "https://via.placeholder.com/210x194"
    },{
        "id": 1,
        "productId": "dsadaddaf",
        "title": "TestProduct1",
        "price": 230,
        "description": "A description of a product",
        "imageurl": "https://via.placeholder.com/210x194"
    }, {
        "id": 2,
        "productId": "ds334addaf",
        "title": "TestProduct2",
        "price": 200,
        "description": "A description of a product",
        "imageurl": "https://via.placeholder.com/210x194"
    }, {
        "id": 3,
        "productId": "dsavhcddaf",
        "title": "TestProduct3",
        "price": 4,
        "description": "A description of a product",
        "imageurl": "https://via.placeholder.com/210x194"
    }, {
        "id": 4,
        "productId": "dsaa6570cddaf",
        "title": "TestProduct4",
        "price": 29,
        "description": "A description of a product",
        "imageurl": "https://via.placeholder.com/210x194"
    },{
        "id": 5,
        "productId": "dsaa6570cdda7f",
        "title": "TestProduct5",
        "price": 89,
        "description": "A description of a product",
        "imageurl": "https://via.placeholder.com/210x194"
    }],
    browsedProducts: [{
        "id": 1,
        "productId": "dsadaddaf",
        "title": "TestProduct1",
        "price": 230,
        "description": "A description of a product",
        "imageurl": "https://via.placeholder.com/250"
    }, {
        "id": 2,
        "productId": "ds334addaf",
        "title": "TestProduct2",
        "price": 200,
        "description": "A description of a product",
        "imageurl": "https://via.placeholder.com/250"
    }, {
        "id": 3,
        "productId": "dsavhcddaf",
        "title": "TestProduct3",
        "price": 4,
        "description": "A description of a product",
        "imageurl": "https://via.placeholder.com/250"
    }, {
        "id": 4,
        "productId": "dsaa6570cddaf",
        "title": "TestProduct4",
        "price": 2.9,
        "description": "A description of a product",
        "imageurl": "https://via.placeholder.com/250"
    }, {
        "id": 1,
        "productId": "dsadaddaf",
        "title": "TestProduct1",
        "price": 230,
        "description": "A description of a product",
        "imageurl": "https://via.placeholder.com/250"
    }, {
        "id": 2,
        "productId": "ds334addaf",
        "title": "TestProduct2",
        "price": 200,
        "description": "A description of a product",
        "imageurl": "https://via.placeholder.com/250"
    }, {
        "id": 3,
        "productId": "dsavhcddaf",
        "title": "TestProduct3",
        "price": 4,
        "description": "A description of a product",
        "imageurl": "https://via.placeholder.com/250"
    }, {
        "id": 4,
        "productId": "dsaa6570cddaf",
        "title": "TestProduct4",
        "price": 2.9,
        "description": "A description of a product",
        "imageurl": "https://via.placeholder.com/250"
    }, {
        "id": 1,
        "productId": "dsadaddaf",
        "title": "TestProduct1",
        "price": 230,
        "description": "A description of a product",
        "imageurl": "https://via.placeholder.com/250"
    }, {
        "id": 2,
        "productId": "ds334addaf",
        "title": "TestProduct2",
        "price": 200,
        "description": "A description of a product",
        "imageurl": "https://via.placeholder.com/250"
    }, {
        "id": 3,
        "productId": "dsavhcddaf",
        "title": "TestProduct3",
        "price": 4,
        "description": "A description of a product",
        "imageurl": "https://via.placeholder.com/250"
    }, {
        "id": 4,
        "productId": "dsaa6570cddaf",
        "title": "TestProduct4",
        "price": 2.9,
        "description": "A description of a product",
        "imageurl": "https://via.placeholder.com/250"
    }],
    focusedProduct: Object.assign({}),
}

const ProductReducer = (state = initialstate, action) => {
    switch (action.type) {

        case LOAD_FROM_THE_NET_PRODUCTS:
            //load from the net
            return {
                ...state,

            }

        case LOAD_SINGLE_PRODUCT:
            let pid = action.productId
            let prod = state.products.find(el => (el.productId === pid))
            return {
                ...state,
                focusedProduct: prod
            }
        default:
            return {
                ...state
            }
    }
}

export default ProductReducer