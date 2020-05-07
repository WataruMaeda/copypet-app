import React from 'react'
import { PropTypes } from 'prop-types'
import { styler, colors } from 'styles'

const styles = styler({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 12,
    color: colors.blue,
    background: colors.lightBlue,
    padding: '3px 6px',
    borderRadius: 4,
    marginRight: 10,
  },
})

const Tag = ({ label, style }) => (
  <div className={styles.root} style={style}>
    {label}
  </div>
)

Tag.propTypes = {
  label: PropTypes.string,
  style: PropTypes.shape({}),
}

Tag.defaultProps = {
  label: '',
  style: {},
}

export default Tag
