import React from 'react'
import { PropTypes } from 'prop-types'
import { IconButton } from 'components/Button'
import { styler, colors } from 'styles'

const styles = styler({
  root: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 40,
  },
  section: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0 20px 20px',
  },
  label: {
    fontSize: 14,
    color: colors.gray,
  },
  icon: {
    fontSize: 14,
    color: 'white',
    marginRight: 0,
  },
  iconButton: {
    margin: 0,
    padding: 0,
  },
})

const Section = ({ label, onClick, children, className, style }) => {
  return (
    <div className={`${styles.root} ${className}`} style={style}>
      <div className={styles.section}>
        <p className={styles.label}>{label}</p>
        {onClick ? (
          <span h="2" data-tut="reactour__add">
            <IconButton
              icon="plus"
              onClick={onClick}
              iconClassName={styles.icon}
              className={styles.iconButton}
            />
          </span>
        ) : (
          <span />
        )}
      </div>
      {children}
    </div>
  )
}

Section.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({})),
    PropTypes.shape({}),
  ]),
  className: PropTypes.string,
  style: PropTypes.shape({}),
}

Section.defaultProps = {
  label: '',
  onClick: null,
  children: [],
  className: '',
  style: {},
}

export default Section
