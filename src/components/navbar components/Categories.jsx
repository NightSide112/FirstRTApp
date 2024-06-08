import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCategory } from '../../features/product/productSlice';

const Categories = () => {

  const dispatch = useDispatch();
  const {category} = useSelector(store => store.product)
  const diningRef = useRef();
  const backRef = useRef();

  useEffect(() => {
    if(category.length < 1) {
      backRef.current.hidden = true;
      diningRef.current.classList += ' last-category'
    } else {
      diningRef.current.classList.remove('last-category')
      backRef.current.hidden = false;
    }
  }, [category])

  return (
    <div id="categories">
      <button className="category" onClick={(e) => dispatch(setCategory(e.target))}>office</button>
      <button className="category" onClick={(e) => dispatch(setCategory(e.target))}>living room</button>
      <button className="category" onClick={(e) => dispatch(setCategory(e.target))}>kitchen</button>
      <button className="category" onClick={(e) => dispatch(setCategory(e.target))}>bedroom</button>
      <button className="category" onClick={(e) => dispatch(setCategory(e.target))} ref={diningRef}>dining</button>
      <button className="category last-category" ref={backRef} onClick={(e) => dispatch(setCategory(e.target))}>back</button>
    </div>
  )
}

export default Categories