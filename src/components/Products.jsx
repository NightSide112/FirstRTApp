import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { openModal } from '../features/product/productSlice'
import {setChosenProduct} from '../features/Cart/cartSlice'

const Products = () => {
    const {products} = useSelector(store => store.product);
    const dispatch = useDispatch();

  return (
    <div id='products'>
        {
            products.map(product => {
                return (
                  <div className='product card' key={product.id} onClick={() => { dispatch(setChosenProduct(product)); dispatch(openModal());}}>
                    <div className="image-container">
                      <img src={product.image} className='card-img-top' alt="" /> 
                      <div className="open-modal">open</div> 
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <div className='card-text'><span className='product-info'>company:</span> {product.company} <br /> <span className='product-info'>price:</span> ${Math.floor(product.price / 100)} <br /> <span className='product-info'>shipping:</span> {product.shipping === true ? "yes" : "no"} <br /> <div className='card-description'><span className='product-info'>description:</span> {product.description}</div></div>
                    </div>
                  </div>
                )
            })
        }
    </div>
  )
}

export default Products
