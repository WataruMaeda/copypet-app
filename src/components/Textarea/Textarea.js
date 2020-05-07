import React from 'react'
import { PropTypes } from 'prop-types'
import { colors, styler } from 'styles'

const styles = styler({
  root: {
    paddingBottom: 30,
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    color: colors.darkGray,
    marginBottom: 10,
  },
  text: {
    fontSize: 14,
    color: colors.black,
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1) !important',
    '&::placeholder': {
      textOverflow: 'ellipsis !important',
      color: colors.gray,
      fontSize: 14,
    },
  },
})

const Textarea = ({
  label,
  name,
  value,
  error,
  rows,
  style,
  onChange,
  placeholder,
  mandatory,
  disabled,
  maxLength,
}) => {
  const className =
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
    <div className={`form-group ${styles.root}`}>
      {label && titleLabel}
      <textarea
        name={name}
        rows={rows}
        maxLength={maxLength}
        value={value}
        className={`${styles.text} ${className}`}
        style={style}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
      />
      <aside className="invalid-feedback">{error}</aside>
    </div>
  )
}

Textarea.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  rows: PropTypes.number,
  style: PropTypes.shape({}),
  onChange: PropTypes.func,
  mandatory: PropTypes.bool,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
}

Textarea.defaultProps = {
  label: '',
  name: '',
  value: '',
  error: '',
  rows: 3,
  style: {},
  onChange: () => {},
  placeholder: '',
  mandatory: false,
  disabled: false,
  maxLength: 1000,
}

export default Textarea
