import React from 'react'
import { ClipLoader } from 'react-spinners'
import PropTypes from 'prop-types'
import { styler, colors } from 'styles'

const styles = styler({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  full: {
    width: '100vw',
    height: '100vh',
  },
})

const Loader = ({ size, color, full, loading, className, style }) => (
  <div
    className={`${styles.root} ${className} ${full && styles.full}`}
    style={style}
  >
    <ClipLoader size={size} color={color} loading={loading} />
  </div>
)

Loader.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  loading: PropTypes.bool,
  full: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.object),
}

Loader.defaultProps = {
  size: 20,
  color: colors.flatBlue,
  loading: false,
  full: false,
  className: '',
  style: {},
}

export default Loader
