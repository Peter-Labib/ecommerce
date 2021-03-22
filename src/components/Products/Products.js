import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid } from '@material-ui/core'
import Product from './Product/Product'

const Products = (props) => {
  const { products } = props
  return (
    <main>
      <Grid
        container
        justify='flex-start'
        alignItems='stretch'
        spacing={4}
      >
        {products.map((product) => (
          <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
            <Product
              id={product.id}
              name={product.name}
              description={product.description}
              price={product.price.formatted_with_code}
              img={product.media.source}
            />
          </Grid>
        ))}
      </Grid>
    </main>
  )
}

Products.propTypes = {
  products: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => {
  const products = Object.values(state.products)
  return {
    products,
  }
}
export default connect(mapStateToProps)(Products)
