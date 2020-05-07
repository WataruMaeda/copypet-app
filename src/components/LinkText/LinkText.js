import React from 'react'
import { PropTypes } from 'prop-types'
import Linkify from 'react-linkify'

const LinkText = ({ children, className, style }) => {
  const renderLink = (href, text, key) => (
    <a href={href} key={key} target="_blank" rel="noopener noreferrer">
      {text}
    </a>
  )
  return (
    <Linkify componentDecorator={renderLink}>
      <p className={className} style={style}>
        {children}
      </p>
    </Linkify>
  )
}

LinkText.propTypes = {
  className: PropTypes.string,
  style: PropTypes.shape({}),
}

LinkText.defaultProps = {
  className: '',
  style: {},
}

export default LinkText
