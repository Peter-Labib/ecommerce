import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Grid, Container } from '@material-ui/core'
import Product from '../Products/Product/Product'

const Category = (props) => {
  const { allProducts } = props
  const [categoryProducts, setCategoryProducts] = useState([])

  useEffect(() => {
    const category = props.match.params.slug
    const productsInCat = allProducts.filter((product) => {
      //   product.categories.forEach((cat) => (cat.slug == category ? true : false))
      return product.categories[0].slug == category
    })
    setCategoryProducts(productsInCat)
  }, [allProducts, props.match.params.slug])

  return (
    <Container style={{marginTop: '5rem'}}>
      <Grid container justify='flex-start' alignItems='stretch' spacing={4}>
        {categoryProducts.map((product) => (
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
    </Container>
  )
}

Category.propTypes = {
  allProducts: PropTypes.array,
  match: PropTypes.object,
}

const mapStateToProps = (state, props) => {
  //   const category = props.match.params.slug
  const allProducts = Object.values(state.products)
  //   const categoryProducts = allProducts.filter((product) => {
  //    return product.categories.forEach((cat) => cat.slug == category ? false : true)
  //   })
  return {
    allProducts,
  }
}

export default connect(mapStateToProps)(Category)
