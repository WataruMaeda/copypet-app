import React from 'react'
import { PropTypes } from 'prop-types'
import { motion } from 'framer-motion'
import FontIcon from 'components/FontIcon'
import { Button } from 'components/Button'
import { styler, colors } from 'styles'

const styles = styler({
  root: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 20px',
    '&:hover': {
      background: colors.lightYellow,
    },
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    padding: '12px 0',
    width: '100%',
  },
  icon: {
    fontSize: 10,
    color: colors.black,
    marginRight: 10,
  },
  label: {
    fontSize: 12,
    color: colors.black,
    textAlign: 'left',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    width: 120,
    '&:hover': {
      textDecorationColor: 'red',
    },
  },
})

const variants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

const Item = ({ label, style, onClick }) => {
  return (
    <motion.div variants={variants} className={styles.root} style={style}>
      <Button className={styles.button} onClick={onClick}>
        <FontIcon icon="code" className={styles.icon} />
        <p className={styles.label}>{label}</p>
      </Button>
    </motion.div>
  )
}

Item.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  style: PropTypes.shape({}),
}

Item.defaultProps = {
  label: '',
  onClick: () => {},
  style: {},
}

export default Item
