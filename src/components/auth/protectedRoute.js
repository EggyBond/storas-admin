import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

const PrivateRoute = ({ component: Component, ...rest }) => {

  // Add your own authentication on the below line.
  // const isLoggedIn = localStorage.getItem('isLoggedIn') || false
  const isLoggedIn = true

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/auth/login', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default (PrivateRoute)