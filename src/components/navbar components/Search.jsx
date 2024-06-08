import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSearch } from '../../features/product/productSlice';
import { Link } from 'react-router-dom';


const Search = () => {

  const {amount} = useSelector(store => store.cart)
  const dispatch = useDispatch();

  return (
    <div id="search-div">

      <input type="search" name="search" id="search" onKeyDown={(e) => {dispatch(setSearch(e))}} />

      <Link to={"/cart"}>
        <button id="shopping-basket-div">
          <img src="https://cdn-icons-png.flaticon.com/512/3721/3721818.png" alt="" />
          <div id="liked-items">{amount}</div>
        </button>
      </Link>
    </div>
  )
}

export default Search