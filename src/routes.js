import React, { useEffect } from 'react'
import Loadable from 'react-loadable'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Connector from 'utils/connector'
import { colors } from 'styles'
import { path } from 'utils/const'
import Navigation from 'subviews/Navigation'

const Auth = Loadable({
  loader: () => import('./scenes/auth'),
  loading: () => <div />,
})

const LandingPage = Loadable({
  loader: () => import('./scenes/lp'),
  loading: () => <div />,
})

const Home = Loadable({
  loader: () => import('./scenes/home'),
  loading: () => <div />,
})

const Router = ({ checked, loggedIn }) => {
  // update css variables
  useEffect(() => {
    Object.keys(colors).forEach(key => {
      const cssKey = `--${key}`
      const cssVal = colors[key]
      document.body.style.setProperty(cssKey, cssVal)
    })
  }, [])

  if (!checked) return <aside>Loading...</aside>

  return (
    <BrowserRouter>
      {loggedIn ? (
        <Navigation>
          <Switch>
            <Route path="/" component={Home} />
            <Route path={path.landingPage} component={LandingPage} />
            <Redirect to="/" />
          </Switch>
        </Navigation>
      ) : (
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path={path.auth} component={Auth} />
          <Redirect to="/" />
        </Switch>
      )}
    </BrowserRouter>
  )
}

export default props => (
  <Connector>
    {({
      state: {
        app: { loggedIn, checked },
      },
    }) => <Router checked={checked} loggedIn={loggedIn} {...props} />}
  </Connector>
)
