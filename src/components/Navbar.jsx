import React from 'react'
import Search from './navbar components/Search'
import Categories from './navbar components/Categories'

const Navbar = () => {

  return (
    <nav id='navbar'>
      <Search />
      <Categories />
    </nav>
  )
}

export default Navbar