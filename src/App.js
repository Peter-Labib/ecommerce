import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchProducts, fetchCart,fetchCategories } from './store/actions/index'
import Navbar from './components/Navbar/Navbar'
// import SideDrawer from './components/Navbar/SideDrawer/SideDrawer'
import Home from './components/Home/Home'
import Cart from './components/Cart/Cart'
import ProductDetails from './components/Products/Product/ProductDetails/ProductDetails'
import Category from './components/Category/Category'
import Checkout from './components/CheckoutForm/Checkout/Checkout'

function App(props) {
  const { fetchData, fetchCart, getCategories } = props

  useEffect(() => {
    getCategories()
    fetchData()
    fetchCart()
    console.log('app loaded')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='App'>
      <Navbar />
      {/* <SideDrawer /> */}
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/cart' component={Cart} />
        <Route path='/product/:id' component={ProductDetails} />
        <Route path='/category/:slug' component={Category} />
        <Route path= '/checkout' component={Checkout} />
      </Switch>
    </div>
  )
}

App.propTypes = {
  fetchData: PropTypes.func.isRequired,
  fetchCart: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(fetchProducts()),
  fetchCart: () => dispatch(fetchCart()),
  getCategories: () => dispatch(fetchCategories()),
})

export default connect(null, mapDispatchToProps)(App)
