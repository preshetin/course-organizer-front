import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const AuthenticatedRoute = ({appProps, component: C, ...rest}) => {

  return (
    <Route
      {...rest}
      render={(props) =>
        appProps.isAuthenticated
          ? <C {...props} {...appProps} />
          : <Redirect
              to={`/login?redirect=${props.location.pathname}${props.location
                .search}`}
            />} />
  )

}

export default AuthenticatedRoute