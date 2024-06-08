import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    products: [],
    isLoading: false,
    search: '',
    isOpen: false,
    category: '',
    chosenCategory: ''
}

export const getProducts = createAsyncThunk(
    'product/getProducts',
    async () => {
        const response = await axios.get('https://www.course-api.com/react-store-products');
        return response.data
})

const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        openModal: (state) => {
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.isOpen = false;
        },
        setCategory: (state, {payload}) => {
            // payload = e.target

            if(payload.innerText === 'back') {
                state.chosenCategory.classList.remove('chosen-category');
                state.chosenCategory = '';
                state.category = '';
            } else {
                if(state.chosenCategory.length < 1) {
                    state.category = payload.innerText;
                    state.chosenCategory = payload;
                    state.chosenCategory.classList += ' chosen-category';
                } else {
                    if(state.chosenCategory === payload) {
                        state.chosenCategory.classList.remove('chosen-category');
                        state.chosenCategory = '';
                        state.category = '';
                    } else {
                        state.chosenCategory.classList.remove('chosen-category');
                        state.chosenCategory = payload;
                        state.chosenCategory.classList += ' chosen-category';
                        state.category = payload.innerText;
                    }
                }
            }
        },
        setSearch: (state, {payload}) => {
            if(payload.code === 'Enter') {
                let search = payload.target.value.toLowerCase().trim().split(/ +/).join(" ");
                state.search = search;
                payload.target.value = '';
            };
        }
    },
    extraReducers: (bulider) => {
        bulider
            .addCase(getProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProducts.fulfilled, (state, action) => {
                state.isLoading = false;

                let products = action.payload;
                let searchedProducts = [];
                let searchedProducts2 = [];

                // searchedProducts = filtered version of products array. the filtering depends on the category.

                if(state.category.length < 1) {
                    searchedProducts = products;
                } else {
                    searchedProducts = products.filter(p => p.category === state.category)
                }

                // searchedProducts2 = filter version of searchedProducts array. the filtering depends on the search.
                
                if(state.search === '') {
                    state.products = searchedProducts
                } else {
                    searchedProducts.map((p) => {
                        let productNameSubStr = [];
                        let productNameWords = p.name.split(" ");
                        for(let i = 0; i <= p.name.length; i++) {
                            let subStr = p.name.substring(0, i);
                            productNameSubStr.push(subStr);
                        };
                        productNameWords.map(word => {
                            if(!productNameSubStr.includes(word)) {
                                productNameSubStr.push(word)
                            }
                        })
                        if(productNameSubStr.includes(state.search)) {
                            searchedProducts2.push(p)
                        }
                    });
                    state.products = searchedProducts2
                }
            })
            .addCase(getProducts.rejected, (state, action) => {
                state.isLoading = false
                console.log(action.error)
            })
    }
})

export const { openModal, closeModal, setCategory, setSearch } = productSlice.actions
export default productSlice.reducer