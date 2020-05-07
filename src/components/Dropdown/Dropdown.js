import React from 'react'
import { PropTypes } from 'prop-types'
import { motion } from 'framer-motion'
import { IconButton, Button } from 'components/Button'
import { styler, colors, rem } from 'styles'

const styles = styler({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    zIndex: 2,
  },
  dropdown: {
    position: 'absolute',
    top: 30,
    right: -10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0 0.5px 5px 0 rgba(49, 69, 91, 0.15)',
    border: `solid 1px ${colors.lightGray}`,
  },
  dropdownItem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
    padding: '8px 16px',
    background: 'white',
  },
  dropdownItemIcon: {
    color: colors.black,
    fontSize: 12,
    marginRight: 5,
  },
})

const Dropdown = ({
  isOpen,
  toggleModal,
  children,
  options,
  onClick,
  style,
}) => {
  // props
  const initial = isOpen ? { scale: 1 } : { scale: 0, rotate: -90 }
  const animate = isOpen ? { rotate: 0, scale: 1 } : { rotate: 90, scale: 0 }

  // rendering
  return (
    <div className={styles.root} style={style}>
      <Button onClick={toggleModal}>{children}</Button>
      <motion.div
        initial={initial}
        animate={animate}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
        className={styles.dropdown}
      >
        {options.map((x, i) => (
          <IconButton
            key={i.toString()}
            icon={x.icon}
            label={x.label}
            iconClassName={styles.dropdownItemIcon}
            iconStyle={rem(x.iconStyle)}
            className={styles.dropdownItem}
            style={rem(x.style)}
            onClick={() => onClick(x, i)}
          />
        ))}
      </motion.div>
    </div>
  )
}

Dropdown.propTypes = {
  isOpen: PropTypes.bool,
  toggleModal: PropTypes.func,
  children: PropTypes.node,
  options: PropTypes.arrayOf(PropTypes.shape({})),
  style: PropTypes.shape({}),
  onClick: PropTypes.func,
}

Dropdown.defaultProps = {
  isOpen: false,
  toggleModal: () => {},
  children: null,
  options: [],
  style: {},
  onClick: () => {},
}

export default Dropdown
