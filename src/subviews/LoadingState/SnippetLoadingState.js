import React from 'react'
import ContentLoader from 'react-content-loader'
import { colors, rem } from 'styles'

const styles = rem({
  root: {
    width: 300,
    height: 'auto',
    color: colors.lightGray,
  },
  logo: {
    x: 20,
    ry: 8,
    width: 16,
    height: 16,
  },
  name: {
    x: 42,
    width: 90,
    height: 4,
  },
})

const SnippetLoadingState = () => {
  const logoY = 0
  const nameY = 6
  return (
    <ContentLoader {...styles.root}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((x, i) => (
        <span key={i.toString()}>
          <rect {...styles.logo} {...rem({ y: logoY + 30 * x })} />
          <rect {...styles.name} {...rem({ y: nameY + 30 * x })} />
        </span>
      ))}
    </ContentLoader>
  )
}

SnippetLoadingState.propTypes = {}
SnippetLoadingState.defaultProps = {}

export default SnippetLoadingState
