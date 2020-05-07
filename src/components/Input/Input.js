import React from 'react'
import PropTypes from 'prop-types'
import { styler, colors } from 'styles'
import './input.css'

const styles = styler({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 30,
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    color: colors.darkGray,
    marginBottom: 10,
  },
  input: {
    fontSize: 14,
    height: 44,
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1) !important',
    '&::placeholder': {
      textOverflow: 'ellipsis !important',
      color: colors.gray,
      fontSize: 14,
    },
  },
})

const Input = ({
  id,
  label,
  type,
  name,
  value,
  placeholder,
  onChange,
  maxLength,
  className,
  style,
  error,
  disabled,
  mandatory,
}) => {
  const inputStyle =
    error.length > 0 ? 'form-control is-invalid' : 'form-control'
  const titleLabel = !mandatory ? (
    <aside className={styles.label}>{label}</aside>
  ) : (
    <aside className={styles.label}>
      {label}
      <aside style={{ color: colors.orange, marginLeft: 3 }}>*</aside>
    </aside>
  )
  return (
    <div className={`form-group ${className}`}>
      {label && titleLabel}
      <div className={styles.container}>
        <input
          value={value}
          type={type}
          id={id}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`${inputStyle} ${styles.input}`}
          style={style}
          disabled={disabled}
        />
        <div className="invalid-feedback">{error}</div>
      </div>
    </div>
  )
}

Input.propTypes = {
  id: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  maxLength: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.shape({}),
  error: PropTypes.string,
  disabled: PropTypes.bool,
  mandatory: PropTypes.bool,
}

Input.defaultProps = {
  id: '',
  type: 'text',
  label: '',
  name: '',
  value: '',
  placeholder: '',
  onChange: () => {},
  maxLength: '500',
  className: '',
  style: {},
  error: '',
  disabled: false,
  mandatory: false,
}

export default Input
