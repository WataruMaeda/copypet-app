import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Search from 'components/Search'
import Connector from 'utils/connector'
import { Button } from 'components/Button'
import { styler, images, colors, breakpoints } from 'styles'
import { storage } from 'utils/firebase'

import Profile from './Profile'

const styles = styler({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
    padding: '10px 20px',
    background: 'white',
    width: '100%',
    zIndex: 3,
    [breakpoints.phone]: {
      padding: '15px 10px',
    },
  },
  top: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
    width: '100%',
    padding: '15px 30px',
    [breakpoints.phone]: {
      padding: '30px 10px 15px',
    },
  },
  leftContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    color: colors.yellow,
    fontWeight: 'normal',
  },
  rightContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  search: {
    marginRight: 20,
    height: 30,
    [breakpoints.phone]: {
      display: 'none',
    },
  },
  profile: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'none',
    objectFit: 'cover',
    background: colors.lightBlueGray,
  },
})

const Top = ({ actions, me, keyword, all }) => {
  // state
  const [isOpen, setOpen] = useState(false)
  const [useImage, setUserImage] = useState(images.profile)

  // handler
  const handleOpen = () => setOpen(!isOpen)
  const handleInputChange = ({ target: { value } }) => {
    actions.setKeyword(value)
    if (value) actions.setSelected({ kind: 'search', keyword: value })
    else actions.setDefaultFolder(all)
  }

  // lifecycle
  useEffect(() => {
    storage
      .child(me.photoURL)
      .getDownloadURL()
      .then(url => setUserImage(url))
  }, [])

  // rendering
  return (
    <div className={styles.root}>
      <div className={styles.leftContainer}>
        <img src={images.logo} className={styles.logo} alt="logo" />
        <h1 className={styles.title}>
          コピペ
          <span style={{ color: colors.darkGray, fontWeight: 'normal' }}>
            っと
          </span>
        </h1>
      </div>
      <div className={styles.rightContainer}>
        <span h="5" data-tut="reactour__search">
          <Search
            icon="search"
            value={keyword}
            onChange={handleInputChange}
            className={styles.search}
          />
        </span>
        <Button onClick={handleOpen}>
          <img src={useImage} className={styles.profile} alt="profile" />
        </Button>
      </div>
      <Profile isOpen={isOpen} toggleModal={handleOpen} />
    </div>
  )
}

Top.propTypes = {
  actions: PropTypes.shape({}),
  me: PropTypes.shape({}),
  keyword: PropTypes.string,
  all: PropTypes.shape({}),
}

Top.defaultProps = {
  actions: {},
  me: {},
  keyword: '',
  all: {},
}

export default props => (
  <Connector>
    {({
      actions,
      state: {
        app: { me },
        data: { all },
        search: { keyword },
      },
    }) => (
      <Top
        actions={{ ...actions.search, ...actions.select }}
        me={me}
        keyword={keyword}
        all={all}
        {...props}
      />
    )}
  </Connector>
)
