import React from 'react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { styler, colors } from 'styles'
import Loader from 'components/Loader'
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
})

const Button = ({
  label,
  className,
  style,
  loaderClassName,
  loaderStyle,
  loaderColor,
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
      <Loader
        color={loaderColor}
        loading
        className={loaderClassName}
        style={loaderStyle}
      />
    ) : (
      <>
        {label}
        {children}
      </>
    )}
  </motion.button>
)

Button.propTypes = {
  label: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.objectOf(PropTypes.object),
  loaderClassName: PropTypes.string,
  loaderStyle: PropTypes.objectOf(PropTypes.object),
  loaderColor: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
}

Button.defaultProps = {
  label: '',
  className: '',
  style: {},
  loaderClassName: '',
  loaderStyle: {},
  loaderColor: colors.yellow,
  onClick: () => {},
  children: null,
  disabled: false,
  isLoading: false,
}

export default Button
