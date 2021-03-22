import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Container,
  Typography,
  Button,
  Grid,
  makeStyles,
} from '@material-ui/core'
import {commerce} from '../../lib/commerce'
import {initiateCart} from '../../store/actions/index'
import CartItem from './CartItem/CartItem'

const useStyle = makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  root: {
    marginBottom: '1rem',
  },
  title: {
    marginTop: '2.5rem',
    marginBottom: '1rem',
  },
  emptyButton: {
    minWidth: '150px',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '5px',
    },
    [theme.breakpoints.up('xs')]: {
      marginRight: '20px',
    },
  },
  checkoutButton: {
    minWidth: '150px',
  },
  link: {
    textDecoration: 'none',
  },
  cardDetails: {
    display: 'flex',
    marginTop: '3rem',
    width: '100%',
    justifyContent: 'space-between',
  },
}))

const Cart = (props) => {
  const { items, totalPrice, clearCart } = props
  const classes = useStyle()

  const clearCartHandler=async ()=>{
    const {cart} = await commerce.cart.empty()
    try {
      clearCart(cart)
    } catch (e) {
      console.log('error', e)
    }
  }

  const renderEmptyCart = () => (
    <Typography variant='subtitle1'>
      You have no items in your shopping cart,&nbsp;
      <Link className={classes.link} to='/'>
        start adding some
      </Link>
      !
    </Typography>
  )

  const renderCart = () => (
    <React.Fragment>
      <Grid container spacing={3}>
        {items.map((item) => (
          <Grid key={item.id} item xs={12} sm={6} md={3} lg={2}>
            <CartItem
              id={item.id}
              product_id={item.product_id}
              img={item.media.source}
              name={item.name}
              price={item.line_total.formatted_with_code}
              quantity={item.quantity}
            />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant='h4'>Subtotal: {totalPrice}</Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size='large'
            type='button'
            variant='contained'
            color='secondary'
            onClick={clearCartHandler}
          >
            Empty cart
          </Button>
          <Link to='/checkout' className={classes.link}>
          <Button
            className={classes.checkoutButton}
            size='large'
            type='button'
            variant='contained'
            color='primary'
          >
            Checkout
          </Button>
          </Link>
        </div>
      </div>
    </React.Fragment>
  )

  return (
    <Container className={classes.root}>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant='h4' gutterBottom>
        Your Shopping Cart
      </Typography>
      {!items.length ? renderEmptyCart() : renderCart()}
    </Container>
  )
}

Cart.propTypes = {
  items: PropTypes.array,
  totalPrice: PropTypes.string,
  clearCart: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  let cart = null
  if (state.cart.cart) {
    state.cart.cart.updated > state.cart.updated
      ? (cart = state.cart.cart)
      : (cart = state.cart)
  } else {
    cart = state.cart
  }
  //   const cart = state.cart.cart ? state.cart.cart : state.cart
  return {
    items: cart.line_items?cart.line_items:[],
    totalPrice: cart.subtotal ? cart.subtotal.formatted_with_code : null,
  }
}

const mapDispatchToProps = dispatch=>({
    clearCart: (cart)=>dispatch(initiateCart(cart))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
