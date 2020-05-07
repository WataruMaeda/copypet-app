import React from 'react'
import { PropTypes } from 'prop-types'
import FontIcon from 'components/FontIcon'
import { Button } from 'components/Button'
import { styler, colors } from 'styles'
import Connector from 'utils/connector'

const styles = styler({
  root: {
    display: 'flex',
    '&:hover': {
      background: colors.lightBlack,
    },
  },
  button: {
    display: 'flex',
    justifyContent: 'space-between',
    background: 'transparent',
    alignItems: 'center',
    padding: '12px 20px 12px 0',
    width: '100%',
  },
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  icon: {
    fontSize: 14,
    color: colors.yellow,
  },
  label: {
    fontSize: 12,
    color: colors.gray,
    marginLeft: 10,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    width: 120,
    textAlign: 'left',
  },
  count: {
    fontSize: 12,
    color: colors.gray,
  },
})

const getIcon = type => {
  switch (type) {
    case 'folder':
      return 'folder'
    case 'ext':
      return 'file'
    case 'tag':
      return 'tags'
    default:
      return 'folder'
  }
}

const didSelect = (type, data, selected, kind) => {
  if (!selected) return false
  if (kind === 'search') return false
  if (type === 'folder') return selected.id === data.id
  return selected.title === data.title
}

const Item = ({
  actions,
  selected,
  kind,
  data,
  type,
  label,
  count,
  className,
}) => {
  const border = didSelect(type, data, selected, kind)
    ? { background: colors.lightYellow }
    : {}
  return (
    <div className={`${styles.root} ${className}`} style={border}>
      <Button
        className={styles.button}
        onClick={() => actions.setSelected({ selected: data, kind: type })}
      >
        <div className={styles.container}>
          <FontIcon icon={getIcon(type)} className={styles.icon} />
          <p className={styles.label}>{label}</p>
        </div>
        <aside className={styles.count}>{count}</aside>
      </Button>
    </div>
  )
}

Item.propTypes = {
  actions: PropTypes.shape({}),
  selected: PropTypes.shape({}),
  kind: PropTypes.string,
  data: PropTypes.shape({}),
  type: PropTypes.string,
  label: PropTypes.string,
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
}

Item.defaultProps = {
  actions: {},
  selected: {},
  kind: 'folder',
  data: {},
  type: '',
  label: '',
  count: 0,
  className: '',
}

export default props => (
  <Connector>
    {({ actions, state: { select } }) => (
      <Item actions={actions.select} {...select} {...props} />
    )}
  </Connector>
)
