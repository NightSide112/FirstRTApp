import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {closeModal} from '../features/product/productSlice'
import { addProduct, removeProduct, setAmounts, removeAmounts } from '../features/Cart/cartSlice'

const Modal = () => {
    
    const {chosenProduct, products} = useSelector(store => store.cart);
    const addRef = useRef();
    const removeRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        let doesInclude = false;
        products.map(p => {
            if(p.id === chosenProduct.id) {
                doesInclude = true;
            };
        });
        if(doesInclude) {
            addRef.current.classList = "d-none";
            removeRef.current.classList = "btn btn-danger d-block";
        } else if(!doesInclude) {
            addRef.current.classList = "btn btn-primary d-block";
            removeRef.current.classList = "d-none";
        };
    }, [chosenProduct, products])

  return (
    <div className="modal" onClick={(e) => {e.target === e.currentTarget ? dispatch(closeModal()) : null}}>
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-body">
                    <img src={chosenProduct.image} alt="" />
                    <div className="modal-product-info">
                        <div className="modal-title">
                            <b>{chosenProduct.name}</b>
                        </div>
                        <p><strong>Company: </strong>{chosenProduct.company}</p>
                        <p><strong>Price: </strong>${Math.floor(chosenProduct.price / 100)}</p>
                        <p><strong>Shipping: </strong>{chosenProduct.shipping === true ? 'yes' : 'no'}</p>
                        <div className="mt-2">
                            <p><strong>Description: </strong><small>{chosenProduct.description}</small></p>
                        </div>
                    </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => dispatch(closeModal())}>Close</button>
                <button type="button" onClick={() => {dispatch(addProduct()); dispatch(setAmounts(chosenProduct))}} ref={addRef}>Add To Cart</button>
                <button type="button" onClick={() => {dispatch(removeProduct(chosenProduct.id)); dispatch(removeAmounts(chosenProduct))}} ref={removeRef}>Remove From Cart</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default Modal
