import { createSlice, current } from "@reduxjs/toolkit";

// everytime that cart product plus button is clicked, amount.product++ if it exists and amount.product = 1 if it doens't exist. Opposite of minus button.

const initialState = {
    products: [],
    chosenProduct: {},
    amounts: {},
    amount: 0,
    total: 0,
    isLoading: false
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setChosenProduct: (state, {payload}) => {
            state.chosenProduct = payload;
        },
        addProduct: (state) => {
            state.products.push(state.chosenProduct);
        },
        removeProduct: (state, {payload}) => {
            state.products.map((p) => {
                if(p.id === payload) {
                    state.products.splice(state.products.indexOf(p), 1)
                };
            });
        },
        setAmounts: (state, {payload}) => {
            if(state.amounts[payload.name]) {
                state.amounts[payload.name].amount++;
            } else {
                state.amounts[payload.name] = {amount: 1, price: Math.floor(payload.price / 100)}
            }
        },
        decreaseAmounts: (state, {payload}) => {
            state.amounts[payload.name].amount--;
        },
        removeAmounts: (state, {payload}) => {
            delete state.amounts[payload.name];
        },
        calculateTotal: (state) => {
            let amount = 0;
            let total = 0;
            for(let i in state.amounts) {
                if(state.amounts.hasOwnProperty(i)) {
                    total += state.amounts[i].amount * state.amounts[i].price;
                    amount += state.amounts[i].amount
                }
            };
            state.total = total;
            state.amount = amount;
        }
    }
})

export const {addProduct, removeProduct, setChosenProduct, calculateTotal, setAmounts, removeAmounts, decreaseAmounts} = cartSlice.actions;
export default cartSlice.reducer;