import Navbar from "./components/Navbar";
import Products from "./components/Products";
import Modal from "./components/Modal";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./features/product/productSlice";
import { calculateTotal } from "./features/Cart/cartSlice"

function App() {

  const dispatch = useDispatch();
  const { isLoading, isOpen, category, search } = useSelector(store => store.product)
  const { products } = useSelector(store => store.cart)

  useEffect(() => {
    dispatch(getProducts());
  }, [category, search]);

  useEffect(() => {
    dispatch(calculateTotal())
  }, [products])

  return (
    <>
      <Navbar />
      {isLoading ? <div className="loading"><h1>Loading...</h1></div> : <Products />}
      {isOpen && <Modal />}
    </>
  )
}

export default App
