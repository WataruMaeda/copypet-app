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
    background: colors.lightGreen,
    width: '100%',
    marginBottom: 40,
    alignItems: 'center',
    border: `1px solid ${colors.green}`,
  },
  icon: {
    fontSize: 24,
    color: colors.green,
    marginRight: 10,
  },
})

const InfoBox = ({ icon, label, children, className, style }) => {
  if (!label && !children) return <span />
  return (
    <motion.div
      initial={{ scale: 0.7, opacity: 0.5 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.1 }}
      className={`${styles.root} ${className}`}
      style={style}
    >
      <FontIcon icon={icon} className={styles.icon} />
      {label}
      {children}
    </motion.div>
  )
}

InfoBox.propTypes = {
  label: PropTypes.string,
  children: PropTypes.shape({}),
  className: PropTypes.string,
  style: PropTypes.shape({}),
}

InfoBox.defaultProps = {
  label: null,
  children: null,
  className: '',
  style: {},
}

export default InfoBox
