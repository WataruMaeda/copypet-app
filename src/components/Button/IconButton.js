import React from 'react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { styler } from 'styles'
import Loader from 'components/Loader'
import FontIcon from 'components/FontIcon'
import './button.css'

const styles = styler({
  root: {
    borderRadius: 3,
    background: 'transparent',
    outline: 'none',
    border: 'none',
    '&:focus': {
      outline: 0,
      boxShadow: 'none',
    },
  },
  iconLeft: {
    fontSize: 16,
    marginRight: 5,
  },
  iconRight: {
    fontSize: 16,
    marginLeft: 5,
  },
})

const IconButton = ({
  label,
  className,
  style,
  icon,
  iconPosition,
  iconClassName,
  iconStyle,
  loaderClassName,
  loaderStyle,
  onClick,
  children,
  disabled,
  isLoading,
}) => (
  <motion.button
    type="button"
    whileTap={{ scale: 0.9 }}
    className={`${styles.root} ${className}`}
    style={style}
    onClick={onClick}
    disabled={disabled || isLoading}
  >
    {isLoading ? (
      <Loader loading className={loaderClassName} style={loaderStyle} />
    ) : (
      <>
        {iconPosition === 'left' && (
          <FontIcon
            icon={icon}
            className={`${styles.iconLeft} ${iconClassName}`}
            style={iconStyle}
          />
        )}
        {label}
        {children}
        {iconPosition === 'right' && (
          <FontIcon
            icon={icon}
            className={`${styles.iconRight} ${iconClassName}`}
            style={iconStyle}
          />
        )}
      </>
    )}
  </motion.button>
)

IconButton.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.shape({}),
  icon: PropTypes.string,
  iconPosition: PropTypes.string,
  iconClassName: PropTypes.string,
  iconStyle: PropTypes.shape({}),
  loaderClassName: PropTypes.string,
  loaderStyle: PropTypes.shape({}),
  children: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
}

IconButton.defaultProps = {
  label: '',
  className: '',
  style: {},
  icon: '',
  iconPosition: 'left',
  iconClassName: '',
  iconStyle: {},
  loaderClassName: '',
  loaderStyle: {},
  onClick: () => {},
  children: null,
  disabled: false,
  isLoading: false,
}

export default IconButton
