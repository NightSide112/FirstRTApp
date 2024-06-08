import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setAmounts, removeAmounts, removeProduct, calculateTotal, decreaseAmounts } from '../features/Cart/cartSlice'

const Cart = () => {

  const {products, amount, amounts, total} = useSelector(store => store.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotal())
  }, [products])

  return (
    <div className='cart'>
      <nav className='cart-navbar'>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <button className="btn btn-light cart-back-btn"> Back </button>
        </Link>
        <button id="shopping-basket-div">
          <img src="https://cdn-icons-png.flaticon.com/512/3721/3721818.png" alt="" />
          <div id="liked-items">{amount}</div>
        </button>
      </nav>

      <div className='cart-products'>
        <div className="cart-header">
          <h1>Shopping Cart</h1>
        </div>
        {
        products.length < 1 ? <h4 className='text-secondary'>Shopping Cart Is Empty...</h4> : products.map((p) => {
          return (
            <div className="cart-product" key={p.id}>
              {p.name}
              <div className="cart-product-buttons">
                <button className="btn btn-secondary" onClick={() => {dispatch(setAmounts(p)); dispatch(calculateTotal())}}>+</button>
                <p>{amounts[p.name].amount}</p>
                <button className="btn btn-secondary" onClick={() => {amounts[p.name].amount === 1 ? dispatch(removeAmounts(p)) && dispatch(removeProduct(p.id)) : dispatch(decreaseAmounts(p)) && dispatch(calculateTotal())}}>-</button>
              </div>
            </div>
          )
        })
        }
        
        <div className={products.length < 1 ? 'd-none' : 'total'}>
          <hr style={{width: '450px'}} />
          <p>${total}</p>
        </div>
      </div>
    
    </div>
  )
}

export default Cart
