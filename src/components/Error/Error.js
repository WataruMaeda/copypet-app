import React from 'react'
import { motion } from 'framer-motion'
import FontIcon from 'components/FontIcon'
import PropTypes from 'prop-types'
import { styler, colors } from 'styles'

const styles = styler({
  root: {
    display: 'flex',
    borderRadius: 4,
    fontSize: 16,
    padding: 15,
    background: colors.lightOrange,
    width: '100%',
    marginBottom: 40,
    alignItems: 'center',
    border: `2px solid ${colors.orange}`,
  },
  icon: {
    fontSize: 24,
    color: colors.orange,
    marginRight: 10,
  },
})

const Error = ({ label, children, className, style }) => {
  if (!label && !children) return <span />
  return (
    <motion.div
      initial={{ scale: 0.7, opacity: 0.5 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.1 }}
      className={`${styles.root} ${className}`}
      style={style}
    >
      <FontIcon icon="exclamation-triangle" className={styles.icon} />
      {label}
      {children}
    </motion.div>
  )
}

Error.propTypes = {
  label: PropTypes.string,
  children: PropTypes.shape({}),
  className: PropTypes.string,
  style: PropTypes.shape({}),
}

Error.defaultProps = {
  label: null,
  children: null,
  className: '',
  style: {},
}

export default Error
