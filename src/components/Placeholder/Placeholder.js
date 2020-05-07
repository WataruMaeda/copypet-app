import React from 'react'
import { PropTypes } from 'prop-types'
import FontIcon from 'components/FontIcon'
import { styler, colors } from 'styles'

const styles = styler({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '30px 20px',
  },
  icon: {
    fontSize: 40,
    color: colors.gray,
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    color: colors.gray,
    marginBottom: 10,
  },
  button: {
    height: 44,
  },
})

const Placeholder = ({ icon, title, className, style }) => (
  <div className={`${styles.root} ${className}`} style={style}>
    {icon && <FontIcon icon={icon} className={styles.icon} />}
    {title && <span className={styles.title}>{title}</span>}
  </div>
)

Placeholder.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.shape({}),
}

Placeholder.defaultProps = {
  title: '',
  icon: '',
  className: '',
  style: {},
}

export default Placeholder
