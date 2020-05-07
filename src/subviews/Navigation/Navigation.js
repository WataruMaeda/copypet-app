/* eslint-disable import/no-unresolved */
import React from 'react'
import { PropTypes } from 'prop-types'
import { styler } from 'styles'
import Tour from 'components/Tour'

import Top from './Top'
import Left from './Left'
import Center from './Center'
import Right from './Right'
import Bottom from './Bottom'

const styles = styler({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  container: {
    flex: 1,
    display: 'flex',
    height: '100%',
  },
})

const Navigation = ({ children, style }) => {
  return (
    <div className={styles.root} style={style}>
      <Top />
      <div className={styles.container}>
        <Left />
        <Center />
        <Right />
        {children}
      </div>
      <Bottom />
      <Tour />
    </div>
  )
}

Navigation.propTypes = {
  children: PropTypes.shape({}),
  style: PropTypes.shape({}),
}

Navigation.defaultProps = {
  children: {},
  style: {},
}

export default Navigation
