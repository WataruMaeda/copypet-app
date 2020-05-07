import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const InView = ({ children, variants, className, style }) => {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={variants}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

InView.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf([PropTypes.shape({})]),
    PropTypes.shape({}),
  ]),
  variants: PropTypes.shape({}),
  className: PropTypes.string,
  style: PropTypes.shape({}),
}

InView.defaultProps = {
  children: null,
  variants: {},
  className: '',
  style: {},
}

export default InView
