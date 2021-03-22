import React from 'react'
import Slick from 'react-slick'
import classes from './slider.module.scss'
import clothing from '../../assets/clothing-store.jpg'
import girl from '../../assets/girl-fashion.jpg'
import necklace from '../../assets/necklace.jpg'
import neckties from '../../assets/neckties.jpg'
import watch from '../../assets/smart-watch.jpg'

const settings = {
  dots: false,
  infinite: true,
  fade: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  pauseOnHover: false,
}
const Slider = () => {
  return (
    <div className={classes.slider}>
      <Slick {...settings}>
        <div className={classes.img_container}>
          <img src={clothing} alt='clothing-store' />
        </div>
        <div className={classes.img_container}>
          <img src={girl} alt='girl-fashion' />
        </div>
        <div className={classes.img_container}>
          <img src={necklace} alt='necklace' />
        </div>
        <div className={classes.img_container}>
          <img src={neckties} alt='neckties' />
        </div>
        <div className={classes.img_container}>
          <img src={watch} alt='smart-watch' />
        </div>
      </Slick>
    </div>
  )
}

export default Slider
