import {configureStore} from "@reduxjs/toolkit";
import  authReducer from "./auth_slice/index.js";
import  adminProductsSlice from "./admin/products-slice/index.js";
import  shopProductsSlice from "./shop/products-slice/index.js";
import  shopCartSlice from "./shop/cart-slice/index.js";
import  shopAddressSlice from "./shop/address-slice/index.js";

const store = configureStore({
    reducer: {
        auth : authReducer,
        adminProducts : adminProductsSlice,
        shopProducts : shopProductsSlice,
        shopCart : shopCartSlice,
        shopAddress : shopAddressSlice,
    }
})

export  default (store);
