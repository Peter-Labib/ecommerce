import React from 'react'
import { Container } from '@material-ui/core'
import { Typography, Hidden } from '@material-ui/core'
import Slider from '../Slider/Slider'
import Products from '../Products/Products'

const Home = () => {
  return (
    <div style={{ marginTop: '4rem', marginBottom: '3rem' }}>
      <Hidden mdDown>
        <Slider />
      </Hidden>
      <Container style={{ marginTop: '5rem' }}>
        <Typography variant='h4' gutterBottom>
          OUR PRODUCTS
        </Typography>
        <Products />
      </Container>
    </div>
  )
}

export default Home
