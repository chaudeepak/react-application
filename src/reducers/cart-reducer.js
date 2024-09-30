import { createSlice } from "@reduxjs/toolkit";

const CartSlicer = createSlice({
    name: "cart",
    initialState: {
        cart: null
    },
    reducers: {
        setToCart: (state, action) => {
            console.log(action.payload)
            let currentItem = action.payload;
            let cart = JSON.parse(localStorage.getItem("cart")) ?? []

            if(cart === 0){
                cart.push(currentItem)
            } else{
                let index = null
                cart.map((item, ind) => {
                    if(item.productId === currentItem.productId) {
                        index = ind
                    }
                })
                if(index === null){
                    cart.push(currentItem)
                } else{
                    if(currentItem.qty <= 0) {
                        cart.splice(index, 1)
                    } else {
                        cart[index]['qty'] = currentItem.qty;
                    }
                }
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            state.cart = cart
        },
        updateCart: (state, action) => {
            state.cart = JSON.parse(localStorage.getItem('cart')) ?? null
        },
        resetCart: (state, action) => {
            state.cart = null, 
            localStorage.removeItem('cart');
        }
    }
})

export const {setToCart, updateCart, resetCart} = CartSlicer.actions;
export default CartSlicer.reducer;