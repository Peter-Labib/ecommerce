import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  Typography,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  makeStyles,
} from '@material-ui/core'
import { commerce } from '../../../lib/commerce'
import { initiateCart } from '../../../store/actions/index'

const useStyles = makeStyles(() => ({
  media: {
    height: 150,
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  prodname: {
    maxHeight: '4rem',
    overflow: 'hidden',
    textDecoration: 'none',
    display: 'block'
  },
  cartActions: {
    justifyContent: 'space-between',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
  },
  ctrlBtn:{
    minWidth: '40px'
  },
  removeBtn: {
    background: 'transparent',
    border: '1px solid #F44336',
  },
}))

const CartItem = (props) => {
  const { id, img, name, price, quantity, updateCart, product_id } = props
  const classes = useStyles()
  const [itemQty, setItemQty] = useState()

  useEffect(() => {
    setItemQty(quantity)
  }, [quantity])

  const updateCartQtyHandler = async (quantity) => {
    const { cart } = await commerce.cart.update(id, { quantity })
    try {
      updateCart(cart)
      setItemQty(quantity)
    } catch (e) {
      console.log(e)
    }
  }

  const removeFromCartHandler = async () => {
    const { cart } = await commerce.cart.remove(id)
    try {
      updateCart(cart)
      setItemQty(0)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Card className='cart-item'>
      <CardMedia image={img} alt={name} className={classes.media} />
      <CardContent className={classes.cardContent}>
        <Typography component={Link}
          to={`/product/${product_id}`} className={classes.prodname} variant='h5' gutterBottom>
          {name.substring(0, 40) + '...'}
        </Typography>
        <Typography className={classes.price}>{price}</Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.buttons}>
          <Button
          className={classes.ctrlBtn}
            type='button'
            size='small'
            onClick={() => updateCartQtyHandler(itemQty - 1)}
          >
            -
          </Button>
          <Typography>&nbsp;{itemQty}&nbsp;</Typography>
          <Button
          className={classes.ctrlBtn}
            type='button'
            size='small'
            onClick={() => updateCartQtyHandler(itemQty + 1)}
          >
            +
          </Button>
        </div>
        <Button
          className={classes.removeBtn}
          variant='contained'
          type='button'
          onClick={removeFromCartHandler}
        >
          Remove
        </Button>
      </CardActions>
    </Card>
  )
}

CartItem.propTypes = {
  id: PropTypes.string,
  img: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string,
  product_id: PropTypes.string,
  quantity: PropTypes.number,
  updateCart: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  updateCart: (cart) => dispatch(initiateCart(cart)),
})

export default connect(null, mapDispatchToProps)(CartItem)
