import React from 'react'
import { PropTypes } from 'prop-types'
import FontIcon from 'components/FontIcon'
import { styler, colors } from 'styles'

const styles = styler({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: `1px solid ${colors.gray}`,
    overflow: 'hidden',
    background: colors.black,
  },
  input: {
    border: 'none',
    boxShadow: 'none',
    padding: '2px 16px 2px 8px',
    background: colors.black,
    color: 'white',
    fontSize: '14px important',
  },
  icon: {
    color: colors.gray,
    fontSize: 14,
    marginLeft: 10,
  },
})

const Search = ({
  value,
  placeholder,
  onChange,
  disabled,
  icon,
  styleInput,
  styleIcon,
  height,
  className,
}) => (
  <div
    className={`${styles.root} ${className}`}
    style={{ borderRadius: height / 2 }}
  >
    <FontIcon icon={icon} className={styles.icon} style={styleIcon} />
    <input
      type="search"
      name="search"
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
      className={styles.input}
      style={styleInput}
    />
  </div>
)

Search.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  styleInput: PropTypes.shape({}),
  styleIcon: PropTypes.shape({}),
  height: PropTypes.number,
  className: PropTypes.string,
}

Search.defaultProps = {
  value: '',
  placeholder: '検索',
  onChange: () => {},
  disabled: false,
  icon: 'search',
  styleInput: {},
  styleIcon: {},
  height: 42,
  className: '',
}

export default Search
