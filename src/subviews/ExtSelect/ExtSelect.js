import React from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'
import { colors, rem } from 'styles'
import { extOptions } from 'utils/const'
import './select.css'

const ExtSelect = ({ value, placeholder, onChange, className, disabled }) => (
  <Select
    placeholder={placeholder}
    value={extOptions.find(x => x.value === value)}
    options={extOptions}
    onChange={x => onChange({ target: { name: 'ext', value: x.value } })}
    className={className}
    styles={{
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
          minHeight: 21,
          width: 110,
          backgroundColor: isDisabled ? colors.lightGray : 'white',
          '&:focus': { borderColor: `${colors.darkGray} !important` },
          '&:hover': { borderColor: `${colors.darkGray} !important` },
          boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
          border: `solid 1px ${colors.gray}`,
          borderRadius: 4,
          fontSize: 14,
        }),
      option: (x, { isFocused }) =>
        rem({
          ...x,
          color: colors.black,
          backgroundColor: isFocused && colors.lightYellow,
          padding: '5px 10px',
          fontSize: 12,
        }),
      placeholder: x =>
        rem({
          ...x,
          color: colors.lightGray,
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
          display: 'none',
        }),
      dropdownIndicator: x =>
        rem({
          ...x,
        }),
    }}
    theme={t =>
      rem({
        ...t,
        borderRadius: 4,
        colors: {
          ...t.colors,
        },
        spacing: {
          ...t.spacing,
        },
      })
    }
    isDisabled={disabled}
  />
)

ExtSelect.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.string,
  ]),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.shape({}),
  disabled: PropTypes.bool,
  className: PropTypes.string,
}

ExtSelect.defaultProps = {
  value: [],
  placeholder: null,
  onChange: () => {},
  style: {},
  disabled: false,
  className: '',
}

export default ExtSelect
