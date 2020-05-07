import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import { IconButton } from 'components/Button'
import { styler, colors, breakpoints } from 'styles'
import Connector from 'utils/connector'
import DeleteAccount from 'subviews/DeleteAccount'
import Settings from 'subviews/Settings'

import Folders from './Folders'
import Exts from './Exts'
import Tags from './Tags'
import Search from './Search'

const styles = styler({
  root: {
    display: 'none',
    flexDirection: 'column',
    width: '100%',
    borderTop: `1px solid ${colors.lightGray}`,
    [breakpoints.phone]: {
      display: 'flex',
    },
  },
  tab: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    background: 'white',
    borderTop: `1px solid ${colors.lightGray}`,
  },
  tabItem: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    color: colors.yellow,
    padding: 10,
  },
})

const menus = [
  { type: 'folder', icon: 'folder', h: '1', dataTut: 'reactour__folder_mob' },
  { type: 'ext', icon: 'file', h: '2', dataTut: 'reactour__ext_mob' },
  { type: 'tag', icon: 'tags', h: '3', dataTut: 'reactour__tag_mob' },
  { type: 'search', icon: 'search', h: '4', dataTut: 'reactour__search_mob' },
  { type: 'settings', icon: 'cog', h: '', dataTut: '' },
]

const Tab = ({ kind, type, icon, onClick, h, dataTut }) => {
  const isSelected = kind === type
  const tabStyle = { background: isSelected ? colors.yellow : 'white' }
  const iconStyle = { color: isSelected ? 'white' : colors.yellow }
  return (
    <div className={styles.tabItem} style={tabStyle} h={h} data-tut={dataTut}>
      <IconButton
        icon={icon}
        onClick={onClick}
        className={styles.icon}
        style={iconStyle}
      />
    </div>
  )
}

const Bottom = ({ actions, all, kind, keyword }) => {
  // state
  const [isOpenSettings, setOpenSettings] = useState(false)
  const [isOpenDelAccount, setOpenDelAccount] = useState(false)

  // handler
  const handleOpenSettings = () => setOpenSettings(!isOpenSettings)
  const handleOpenDelAccount = () => setOpenDelAccount(!isOpenDelAccount)

  // handler
  const handleTabChange = ({ type }) => {
    switch (type) {
      case 'folder':
        actions.setDefaultFolder(all)
        actions.setKeyword('')
        break
      case 'ext':
        actions.setDefaultExt(all)
        actions.setKeyword('')
        break
      case 'tag':
        actions.setDefaultTag(all)
        actions.setKeyword('')
        break
      case 'search':
        actions.setSelected({ kind: type, keyword })
        break
      case 'settings':
        handleOpenSettings()
        break
      default:
        break
    }
  }

  // rendering
  return (
    <div className={`${styles.root} fixed-bottom`}>
      <Folders />
      <Exts />
      <Tags />
      <Search />
      <div className={styles.tab}>
        {menus.map((x, i) => (
          <Tab
            key={i.toString()}
            {...x}
            kind={kind}
            onClick={() => handleTabChange(x)}
          />
        ))}
      </div>
      <Settings
        isOpen={isOpenSettings}
        toggleModal={handleOpenSettings}
        onDelete={() => {
          handleOpenSettings()
          handleOpenDelAccount()
        }}
      />
      <DeleteAccount
        isOpen={isOpenDelAccount}
        toggleModal={handleOpenDelAccount}
      />
    </div>
  )
}

Bottom.propTypes = {
  actions: PropTypes.shape({}),
  all: PropTypes.shape({}),
  kind: PropTypes.string,
  keyword: PropTypes.string,
}

Bottom.defaultProps = {
  actions: {},
  all: null,
  kind: 'folder',
  keyword: '',
}

export default props => (
  <Connector>
    {({ actions, state: { select, data, search } }) => (
      <Bottom
        actions={{ ...actions.select, ...actions.search }}
        {...select}
        {...data}
        {...search}
        {...props}
      />
    )}
  </Connector>
)
