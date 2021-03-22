import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  Card,
  CardMedia,
  CardContent,
  // CardActions,
  Typography,
  // IconButton,
} from '@material-ui/core'
// import { AddShoppingCart } from '@material-ui/icons'
// import { commerce } from '../../../lib/commerce'
import { initiateCart } from '../../../store/actions/index'
import classes from './Product.module.scss'

const Product = (props) => {
  const { id, name, price, img, addToCart } = props

  // const addToCartHandler = async (productId, quantity = 1) => {
  //   const cart = await commerce.cart.add(productId, quantity)
  //   addToCart(cart)
  // }
  return (
    <Card className={classes.card}>
      <CardMedia className={classes.card__media} image={img} title={name} />
      <CardContent>
        <Typography
          className={classes.card__prodname}
          variant='h5'
          gutterBottom
          component={Link}
          to={`/product/${id}`}
        >
          {name.substring(0, 40) + '...'}
        </Typography>
      </CardContent>
      <div className={classes.card_flex}>
        <Typography className={classes.card_price} gutterBottom>
          {price}
        </Typography>
        {/* <CardActions disableSpacing className={classes.card__actions}>
          <IconButton onClick={() => addToCartHandler(id)}>
            <AddShoppingCart />
          </IconButton>
        </CardActions> */}
      </div>
    </Card>
  )
}

Product.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  addToCart: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  addToCart: (cart) => dispatch(initiateCart(cart)),
})

export default connect(null, mapDispatchToProps)(Product)
