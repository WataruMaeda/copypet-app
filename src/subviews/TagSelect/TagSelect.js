import React from 'react'
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

const TagSelect = ({
  value,
  options,
  onChange,
  style,
  disabled,
  className,
}) => {
  const format = v => {
    if (!v) return []
    return v.map(x => ({ label: x, value: x }))
  }
  return (
    <div className={styles.root} style={style}>
      <aside className={styles.label}>タグ</aside>
      <Creatable
        placeholder="タグを選択/入力"
        options={format(options)}
        value={format(value)}
        onChange={x => {
          const res = x && x.map(y => y.value)
          onChange({ target: { name: 'tags', value: res } })
        }}
        isMulti
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
              marginLeft: 5,
            }),
          multiValue: x =>
            rem({
              ...x,
              marginLeft: 5,
              marginRight: 5,
            }),
          multiValueLabel: x =>
            rem({
              ...x,
              background: colors.lightBlue,
              color: colors.blue,
              borderRadius: 4,
            }),
          multiValueRemove: x =>
            rem({
              ...x,
              background: colors.lightBlue,
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
    </div>
  )
}

TagSelect.propTypes = {
  value: PropTypes.arrayOf(PropTypes.string),
  options: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func,
  style: PropTypes.shape({}),
  disabled: PropTypes.bool,
  className: PropTypes.string,
}

TagSelect.defaultProps = {
  value: [],
  options: [],
  onChange: () => {},
  style: {},
  disabled: false,
  className: '',
}

export default TagSelect
