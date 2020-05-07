import React from 'react'
import { PropTypes } from 'prop-types'
import { styler, colors } from 'styles'
import { IconButton } from 'components/Button'
import Connector from 'utils/connector'
import { extOptions } from 'utils/const'

const styles = styler({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    background: 'white',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    background: 'white',
    overflowX: 'scroll',
    overflowY: 'hidden',
    whiteSpace: 'nowrap',
    position: 'relative',
  },
  buttonContainer: {
    maxWidth: 160,
  },
  button: {
    padding: 8,
    background: 'white',
    color: colors.gray,
    fontSize: 14,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxWidth: 160,
    textAlign: 'left',
  },
  buttonSelected: {
    padding: '10px 15px',
    background: colors.lightBlueGray,
    color: colors.darkGray,
    fontSize: 14,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxWidth: 160,
    textAlign: 'left',
  },
  icon: {
    fontSize: 14,
    color: colors.lightGray,
  },
  iconSelected: {
    fontSize: 14,
    color: colors.darkGray,
  },
})

const Exts = ({ actions, all, kind, selected }) => {
  // props
  if (kind !== 'ext' || !all) return null
  const { exts } = all

  // rendering
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        {exts &&
          Object.keys(exts).map((k, i) => {
            const count = exts[k]
            const { value, label } = extOptions.find(x => x.value === k)
            const isSelected = selected ? label === selected.title : false
            return (
              <div className={styles.buttonContainer} key={i.toString()}>
                <IconButton
                  icon="file"
                  label={label}
                  className={isSelected ? styles.buttonSelected : styles.button}
                  iconClassName={isSelected ? styles.iconSelected : styles.icon}
                  onClick={() =>
                    actions.setSelected({
                      selected: { count, title: label, value },
                      kind,
                    })
                  }
                />
              </div>
            )
          })}
      </div>
    </div>
  )
}

Exts.propTypes = {
  actions: PropTypes.shape({}),
  all: PropTypes.shape({}),
  kind: PropTypes.string,
  selected: PropTypes.shape({}),
}

Exts.defaultProps = {
  actions: {},
  all: null,
  kind: 'folder',
  selected: {},
}

export default props => (
  <Connector>
    {({
      actions,
      state: {
        select,
        data: { all },
      },
    }) => <Exts actions={actions.select} all={all} {...select} {...props} />}
  </Connector>
)
