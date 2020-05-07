import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { Element, animateScroll } from 'react-scroll'
import { IconButton } from 'components/Button'
import Placeholder from 'components/Placeholder'
import Error from 'components/Error'
import SnippetEditor from 'subviews/SnippetEditor'
import ConfirmDelete from 'subviews/ConfirmDelete'
import FolderEditor from 'subviews/FolderEditor'
import Connector from 'utils/connector'
import { styler, colors, breakpoints } from 'styles'

import Welcome from './Welcome'
import Header from './Header'
import Snippet from './Snippet'

const styles = styler({
  root: {
    flex: 1,
    flexDirection: 'column',
    background: colors.lightGray,
    position: 'relative',
    [breakpoints.phone]: {
      paddingBottom: 120,
    },
  },
  error: {
    margin: '45px 30px',
    width: 'calc(100% - 60px)',
  },
  snippets: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: '0 15px',
  },
  scrollUpBottom: {
    color: 'white',
    fontSize: 16,
    background: colors.lightBlack,
    width: 32,
    height: 32,
    borderRadius: 16,
    position: 'fixed',
    right: 20,
    bottom: 20,
    left: 'auto',
    [breakpoints.phone]: {
      bottom: 110,
    },
  },
  scrollUpButtonIcon: {
    marginRight: '0 !important',
  },
})

const variants = {
  hidden: { opacity: 0, scale: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.3,
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
}

const getSnippets = selected => {
  if (
    selected &&
    selected.snippets &&
    Array.isArray(selected.snippets) &&
    selected.snippets.length > 0
  )
    return selected.snippets
  return null
}

const Home = ({ actions, selected, kind, needTour, isLoading, keyword }) => {
  // props
  const snippets = getSnippets(selected)
  const snippetsFiltered = actions.filterSnippets({ snippets, keyword })

  // state
  const [isOpenAdd, setOpenAdd] = useState(false)
  const [isOpenEdit, setOpenEdit] = useState(false)
  const [isOpenDel, setOpenDel] = useState(false)
  const [isOpenScrollUp, setOpenScrollUp] = useState(false)
  const [isLoadingDel, setLoadingDel] = useState(false)
  const [resErr, setResErr] = useState('')

  // handler
  const handleOpenAdd = () => setOpenAdd(!isOpenAdd)
  const handleOpenEdit = () => setOpenEdit(!isOpenEdit)
  const handleOpenDel = () => setOpenDel(!isOpenDel)
  const handleDefaultSelect = async () => {
    try {
      const all = await actions.fetchAll()
      actions.setDefaultFolder(all)
    } catch (err) {
      setResErr(err.message)
    }
  }
  const handleDeleteFolder = async () => {
    try {
      setLoadingDel(true)
      const { id } = selected
      const newAll = await actions.deleteFolder(id)
      actions.setDefaultFolder(newAll)
      setLoadingDel(false)
      handleOpenDel()
    } catch (err) {
      setLoadingDel(false)
      setResErr(err.message)
    }
  }
  const handleOpenScrollUp = () => {
    if (window.pageYOffset >= 300) {
      setOpenScrollUp(true)
    } else if (window.pageYOffset < 300) {
      setOpenScrollUp(false)
    }
  }

  // lifecycle
  useEffect(() => {
    handleDefaultSelect()
    window.addEventListener('scroll', handleOpenScrollUp)
  }, [])

  // rendering
  if (needTour) return <Welcome />
  return (
    <div className={styles.root}>
      <Error label={resErr} className={styles.error} />
      <Header
        kind={kind}
        data={selected}
        onAdd={handleOpenAdd}
        onEdit={handleOpenEdit}
        onDelete={handleOpenDel}
      />
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        className={styles.snippets}
      >
        {snippetsFiltered.map(x => (
          <Element key={x.id} name={x.id}>
            <Snippet data={x} />
          </Element>
        ))}
      </motion.div>
      {!isLoading && snippetsFiltered.length === 0 && (
        <Placeholder icon="kiwi-bird" title="スニペットはありません。" />
      )}
      <SnippetEditor isOpen={isOpenAdd} toggleModal={handleOpenAdd} />
      <FolderEditor
        isOpen={isOpenEdit}
        folder={selected}
        toggleModal={handleOpenEdit}
        onComplete={handleOpenEdit}
      />
      <ConfirmDelete
        name={selected && selected.title}
        isOpen={isOpenDel}
        toggleModal={handleOpenDel}
        onDelete={handleDeleteFolder}
        isLoading={isLoadingDel}
      />
      {isOpenScrollUp && (
        <IconButton
          icon="angle-double-up"
          className={styles.scrollUpBottom}
          iconClassName={styles.scrollUpButtonIcon}
          onClick={() => animateScroll.scrollToTop()}
        />
      )}
    </div>
  )
}

Home.propTypes = {
  actions: PropTypes.shape({}),
  selected: PropTypes.shape({}),
  kind: PropTypes.string,
  needTour: PropTypes.bool,
  isLoading: PropTypes.bool,
  keyword: PropTypes.string,
}

Home.defaultProps = {
  actions: {},
  selected: {},
  kind: 'folder',
  needTour: false,
  isLoading: false,
  keyword: '',
}

export default props => (
  <Connector>
    {({
      actions,
      state: {
        app: { needTour },
        data: { isLoading },
        select: { selected, kind },
        search: { keyword },
      },
    }) => (
      <Home
        actions={{ ...actions.data, ...actions.select }}
        selected={selected}
        needTour={needTour}
        isLoading={isLoading}
        keyword={keyword}
        kind={kind}
        {...props}
      />
    )}
  </Connector>
)
