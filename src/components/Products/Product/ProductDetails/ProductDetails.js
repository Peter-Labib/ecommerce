import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  Typography,
  Button,
  Card,
  CardActions,
  IconButton,
  CardContent,
  Container,
  CardMedia,
  makeStyles,
} from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons'
import { commerce } from '../../../../lib/commerce'
import { initiateCart } from '../../../../store/actions/index'

const useStyles = makeStyles(() => ({
  root: {
    marginTop: '5rem',
    maxWidth: 600,
  },
  media: {
    height: 300,
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  prodname: {
    maxHeight: '4rem',
    overflow: 'hidden',
  },
  cartActions: {
    justifyContent: 'space-between',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
  },
  description: {
    marginTop: '3rem',
    marginBottom: '2rem',
  },
}))

const ProductDetails = (props) => {
  const { addToCart } = props
  const [product, setProduct] = useState()
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const classes = useStyles()

  const fetchProduct = async (id) => {
    const product = await commerce.products.retrieve(id)
    try {
      setProduct(product)
      setLoading(false)
    } catch (e) {
      console.log('error', e)
    }
  }

  useEffect(() => {
    const id = props.match.params.id
    fetchProduct(id)
  }, [props.match.params.id])

  const addToCatrHandler = async () => {
    if (quantity) {
      const cart = await commerce.cart.add(product.id, quantity)
      addToCart(cart)
    }
  }

  return loading ? (
    <div></div>
  ) : (
    <Container className={classes.root}>
      <Card className='cart-item'>
        <CardMedia
          image={product.media.source}
          alt={product.name}
          className={classes.media}
        />
        <CardContent className={classes.cardContent}>
          <Typography className={classes.prodname} variant='h5' gutterBottom>
            {product.name}
          </Typography>
          <div className={classes.flex}>
            <Typography className={classes.price}>
              {product.price.formatted_with_code}
            </Typography>
            <CardActions className={classes.cardActions}>
              <div className={classes.buttons}>
                <Button
                  type='button'
                  size='small'
                  onClick={() => {
                    quantity > 1 && setQuantity(quantity - 1)
                  }}
                >
                  -
                </Button>
                <Typography>&nbsp;{quantity}&nbsp;</Typography>
                <Button
                  type='button'
                  size='small'
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
              <IconButton color='secondary' onClick={addToCatrHandler}>
                <AddShoppingCart />
              </IconButton>
            </CardActions>
          </div>
        </CardContent>
      </Card>
      <div className={classes.description}>
        <Typography variant='h4' gutterBottom>
          Description
        </Typography>
        <Typography
          dangerouslySetInnerHTML={{ __html: product.description }}
        ></Typography>
      </div>
    </Container>
  )
}

ProductDetails.propTypes = {
  match: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  addToCart: (cart) => dispatch(initiateCart(cart)),
})

export default connect(null, mapDispatchToProps)(ProductDetails)
