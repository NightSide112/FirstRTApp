import {configureStore} from '@reduxjs/toolkit'
import productSlice from './features/product/productSlice'
import cartSlice from './features/Cart/cartSlice'
productSlice

export const store = configureStore({
    reducer: {
        product: productSlice,
        cart: cartSlice
    }
})