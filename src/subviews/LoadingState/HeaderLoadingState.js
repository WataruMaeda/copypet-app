import React from 'react'
import ContentLoader from 'react-content-loader'
import { colors, rem } from 'styles'

const styles = rem({
  root: {
    display: 'flex',
    background: 'white',
    width: '100%',
    padding: '30px 30px 0',
  },
  container: {
    width: '100%',
    color: colors.lightGray,
  },
  logo: {
    cx: 16,
    cy: 16,
    r: 16,
  },
  name: {
    x: 48,
    y: 14,
    width: 120,
    height: 6,
    rx: 3,
  },
  line1: {
    x: 0,
    y: 56,
    width: 410,
    height: 6,
    rx: 3,
  },
  line2: {
    x: 0,
    y: 72,
    width: 380,
    height: 6,
    rx: 3,
  },
  line3: {
    x: 0,
    y: 88,
    width: 178,
    height: 6,
    rx: 3,
  },
})

const HeaderLoadingState = () => {
  return (
    <div style={styles.root}>
      <ContentLoader {...styles.container}>
        <circle {...styles.logo} />
        <rect {...styles.name} />
        <rect {...styles.line1} />
        <rect {...styles.line2} />
        <rect {...styles.line3} />
      </ContentLoader>
    </div>
  )
}

HeaderLoadingState.propTypes = {}
HeaderLoadingState.defaultProps = {}

export default HeaderLoadingState
