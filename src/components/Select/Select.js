import React from 'react'
import Select from 'react-select'
import Creatable from 'react-select/creatable'
import PropTypes from 'prop-types'
import { styler, colors, rem } from 'styles'
import './select.css'

const styles = styler({
  root: {
    flex: 1,
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
  error: {
    marginTop: 4,
    fontSize: 13,
    color: 'red',
  },
  dot: {
    color: colors.purple,
    marginLeft: 3,
  },
})

const Selector = ({
  label,
  value,
  options,
  placeholder,
  onChange,
  style,
  disabled,
  error,
  mandatory,
  isMulti,
  isCreatable,
  className,
}) => {
  const titleLabel = !mandatory ? (
    <aside className={styles.label}>{label}</aside>
  ) : (
    <aside className={styles.label}>
      {label}
      <aside className={styles.dot}>*</aside>
    </aside>
  )

  const props = {
    placeholder,
    value,
    options,
    onChange,
    isMulti,
    className,
    styles: {
      clearIndicator: x =>
        rem({
          ...x,
          height: 'auto',
        }),
      indicatorsContainer: x =>
        rem({
          ...x,
          marginRight: 10,
        }),
      control: (x, { isDisabled }) =>
        rem({
          ...x,
          minHeight: 44,
          backgroundColor: isDisabled ? colors.lightGray : 'white',
          '&:focus': { borderColor: `${colors.darkGray} !important` },
          '&:hover': { borderColor: `${colors.darkGray} !important` },
          boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
          border: `solid 1px ${colors.gray}`,
          borderRadius: 4,
        }),
      option: (x, { isFocused }) =>
        rem({
          ...x,
          color: colors.black,
          backgroundColor: isFocused && colors.lightYellow,
          padding: 10,
          fontSize: 14,
        }),
      placeholder: x =>
        rem({
          ...x,
          color: colors.lightGray,
          fontSize: 14,
        }),
      valueContainer: x =>
        rem({
          ...x,
          marginLeft: 10,
        }),
      multiValue: x =>
        rem({
          ...x,
          marginLeft: 10,
        }),
      multiValueLabel: x =>
        rem({
          ...x,
        }),
      multiValueove: x =>
        rem({
          ...x,
        }),
      indicatorSeparator: x =>
        rem({
          ...x,
          margin: 10,
        }),
      dropdownIndicator: x =>
        rem({
          ...x,
        }),
    },
    theme: t =>
      rem({
        ...t,
        borderRadius: 4,
        colors: {
          ...t.colors,
        },
        spacing: {
          ...t.spacing,
        },
      }),
    isDisabled: disabled,
  }

  return (
    <div className={styles.root} style={style}>
      {label && titleLabel}
      {isCreatable ? <Creatable {...props} /> : <Select {...props} />}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  )
}

Selector.propTypes = {
  label: PropTypes.string,
  value: PropTypes.shape([]),
  options: PropTypes.shape([]),
  placeholder: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.shape({}),
  disabled: PropTypes.bool,
  mandatory: PropTypes.bool,
  isMulti: PropTypes.bool,
  isCreatable: PropTypes.bool,
  className: PropTypes.string,
}

Selector.defaultProps = {
  label: null,
  value: [],
  options: [],
  placeholder: null,
  error: null,
  onChange: () => {},
  style: {},
  disabled: false,
  mandatory: false,
  isMulti: false,
  isCreatable: false,
  className: '',
}

export default Selector
