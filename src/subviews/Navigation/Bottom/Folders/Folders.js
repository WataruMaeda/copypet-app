import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import { styler, colors } from 'styles'
import { IconButton } from 'components/Button'
import FolderEditor from 'subviews/FolderEditor'
import Connector from 'utils/connector'

const styles = styler({
  root: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    paddingRight: 40,
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
  addButton: {
    margin: 0,
    padding: 0,
    width: 24,
    height: 24,
    borderRadius: 12,
    position: 'absolute',
    right: 10,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'white',
    boxShadow: '0 3px 7px 1px rgba(0, 0, 0, 0.1)',
  },
  addIcon: {
    fontSize: 14,
    color: colors.darkGray,
    marginRight: 0,
  },
})

const Folders = ({ actions, all, kind, selected }) => {
  // state
  const [isOpen, setOpen] = useState(false)

  // handler
  const handleOpen = () => setOpen(!isOpen)

  // props
  if (kind !== 'folder' || !all) return null
  const { folders } = all

  // rendering
  return (
    <div className={styles.root}>
      <div
        className={styles.container}
        data-tut="reactour__snippet_list_mob"
        h="7"
      >
        {folders &&
          folders.map((x, i) => {
            const isSelected = selected ? x.id === selected.id : false
            return (
              <div className={styles.buttonContainer} key={i.toString()}>
                <IconButton
                  icon="folder"
                  label={x.title}
                  className={isSelected ? styles.buttonSelected : styles.button}
                  iconClassName={isSelected ? styles.iconSelected : styles.icon}
                  onClick={() => actions.setSelected({ selected: x, kind })}
                />
              </div>
            )
          })}
      </div>
      <span h="2" data-tut="reactour__add_mob" />
      <IconButton
        icon="plus"
        className={styles.addButton}
        iconClassName={styles.addIcon}
        onClick={handleOpen}
      />
      <FolderEditor
        isOpen={isOpen}
        toggleModal={handleOpen}
        onComplete={handleOpen}
      />
    </div>
  )
}

Folders.propTypes = {
  actions: PropTypes.shape({}),
  all: PropTypes.shape({}),
  kind: PropTypes.string,
  selected: PropTypes.shape({}),
}

Folders.defaultProps = {
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
    }) => <Folders actions={actions.select} all={all} {...select} {...props} />}
  </Connector>
)
