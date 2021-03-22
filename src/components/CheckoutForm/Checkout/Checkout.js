import React, { useState, useEffect } from 'react'
import {
  CssBaseline,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
  makeStyles,
} from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { commerce } from '../../../lib/commerce'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'

const steps = ['Shipping address', 'Payment details']
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  toolbar: theme.mixins.toolbar,
  layout: {
    marginTop: '5%',
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      marginTop: 60,
    },
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  divider: {
    margin: '20px 0',
  },
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}))

const Checkout = (props) => {
  const { cart, onCaptureCheckout, order, error } = props
  const [checkoutToken, setCheckoutToken] = useState(null)
  const [activeStep, setActiveStep] = useState(0)
  const [shippingData, setShippingData] = useState({})
  const classes = useStyles()
  const history = useHistory()

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

  useEffect(() => {
    if (cart.id) {
      const generateToken = async () => {
        try {
          const token = await commerce.checkout.generateToken(cart.id, {
            type: 'cart',
          })

          setCheckoutToken(token)
        } catch {
          if (activeStep !== steps.length) history.push('/')
        }
      }

      generateToken()
    }
  }, [activeStep, cart, history])

  const test = (data) => {
    setShippingData(data)

    nextStep()
  }

  let Confirmation = () =>
    order.customer ? (
      <>
        <div>
          <Typography variant='h5'>
            Thank you for your purchase, {order.customer.firstname}{' '}
            {order.customer.lastname}!
          </Typography>
          <Divider className={classes.divider} />
          <Typography variant='subtitle2'>
            Order ref: {order.customer_reference}
          </Typography>
        </div>
        <br />
        <Button component={Link} variant='outlined' type='button' to='/'>
          Back to home
        </Button>
      </>
    ) : (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    )

  if (error) {
    Confirmation = () => (
      <React.Fragment>
        <Typography variant='h5'>Error: {error}</Typography>
        <br />
        <Button component={Link} variant='outlined' type='button' to='/'>
          Back to home
        </Button>
      </React.Fragment>
    )
  }

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm
        checkoutToken={checkoutToken}
        nextStep={nextStep}
        setShippingData={setShippingData}
        test={test}
      />
    ) : (
      <PaymentForm
        checkoutToken={checkoutToken}
        nextStep={nextStep}
        backStep={backStep}
        shippingData={shippingData}
        onCaptureCheckout={onCaptureCheckout}
      />
    )

  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant='h4' align='center'>
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Confirmation />
          ) : (
            checkoutToken && <Form />
          )}
        </Paper>
      </main>
    </>
  )
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
  return {
    cart,
  }
}

export default connect(mapStateToProps)(Checkout)
