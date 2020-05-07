import React from 'react'
import { PropTypes } from 'prop-types'
import { styler, colors } from 'styles'
import { IconButton } from 'components/Button'
import Connector from 'utils/connector'

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

const Tags = ({ actions, all, kind, selected }) => {
  // props
  if (kind !== 'tag' || !all) return null
  const { tags } = all

  // rendering
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        {tags &&
          Object.keys(tags).map((k, i) => {
            const count = tags[k]
            const isSelected = selected ? k === selected.title : false
            return (
              <div className={styles.buttonContainer} key={i.toString()}>
                <IconButton
                  icon="file"
                  label={k}
                  className={isSelected ? styles.buttonSelected : styles.button}
                  iconClassName={isSelected ? styles.iconSelected : styles.icon}
                  onClick={() =>
                    actions.setSelected({
                      selected: { count, title: k },
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

Tags.propTypes = {
  actions: PropTypes.shape({}),
  all: PropTypes.shape({}),
  kind: PropTypes.string,
  selected: PropTypes.shape({}),
}

Tags.defaultProps = {
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
    }) => <Tags actions={actions.select} all={all} {...select} {...props} />}
  </Connector>
)
