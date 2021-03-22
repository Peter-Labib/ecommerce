import React, { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  fade,
  InputBase,
  Button,
  makeStyles,
  Hidden
} from '@material-ui/core'
import { ShoppingCart, Search, MenuOutlined } from '@material-ui/icons'
import { fetchCategories } from '../../store/actions/index'
import style from './navbar.module.scss'
import logo from '../../assets/lets-shop.png'

const useStyles = makeStyles((theme) => ({
  logo: {
    width: '8rem',
    cursor: 'pointer',
    marginRight: theme.spacing(2),
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  grow: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  activeNav: {
    backgroundColor:'rgba(0, 0, 0, .2)'
  }
}))

const Navbar = (props) => {
  const { getCategories, categories, cartItems } = props
  const classes = useStyles()

  // useEffect(() => {
  //   getCategories()
  // }, [getCategories])

  return (
    <React.Fragment>
      <AppBar position='fixed' color='primary'>
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <Link to='/'>
            <img
              className={classes.logo}
              src={logo}
              alt='logo'
              style={{ width: '8rem', cursor: 'pointer', marginRight: '' }}
            />
          </Link>
          <Hidden mdDown>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <Search />
            </div>
            <InputBase
              placeholder='Search…'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow}></div>
          {categories.map((cat) => (
            <NavLink
              key={cat.id}
              className={classes.link}
              activeClassName={style.activeNav}
              to={`/category/${cat.slug}`}
            >
              <Button color='inherit'>
                {cat.name}
              </Button>
            </NavLink>
          ))}
          </Hidden>
          <IconButton component={Link} to='/cart' color='inherit'>
            <Badge badgeContent={cartItems} color='error'>
              <ShoppingCart />
            </Badge>
          </IconButton>
          {/* <Hidden mdUp>
          <IconButton color='inherit'>
              <MenuOutlined />
          </IconButton>
          </Hidden> */}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}

Navbar.propTypes = {
  getCategories: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  cartItems: PropTypes.number,
}

const mapStateToProps = (state) => {
  const categoriesArr = Object.values(state.categories)
  let cart = null
  if (state.cart.cart) {
    state.cart.cart.updated > state.cart.updated
      ? (cart = state.cart.cart)
      : (cart = state.cart)
  } else {
    cart = state.cart
  }
  // const cartItems = state.cart.cart
  //   ? state.cart.cart.total_unique_items
  //   : state.cart.total_unique_items
  return {
    categories: categoriesArr,
    cartItems: cart.total_unique_items,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCategories: () => dispatch(fetchCategories()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
