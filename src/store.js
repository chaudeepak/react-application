import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user-reducer";
import cartReducer from "./reducers/cart-reducer";


const store = configureStore({
    reducer: {
        User: userReducer,
        Cart: cartReducer
    }
})

export default store;