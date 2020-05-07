import React, { useState } from 'react'
import { PropTypes } from 'prop-types'
import { motion } from 'framer-motion'
import LinkText from 'components/LinkText'
import Dropdown from 'components/Dropdown'
import FontIcon from 'components/FontIcon'
import Editor from 'components/Editor'
import Error from 'components/Error'
import { CopyButton } from 'components/Button'
import Tag from 'subviews/Tag'
import ConfirmDelete from 'subviews/ConfirmDelete'
import SnippetEditor from 'subviews/SnippetEditor'
import { styler, images, colors, breakpoints } from 'styles'
import Connector from 'utils/connector'

const styles = styler({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: 'calc(100vw - 30px)',
    background: 'white',
    marginBottom: 15,
    padding: 30,
    borderRadius: 4,
    boxShadow: '0 0.5px 5px 0 rgba(49, 69, 91, 0.15)',
    border: `solid 1px ${colors.lightGray}`,
    [breakpoints.phone]: {
      padding: '30px 15px',
    },
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    borderBottom: `1px solid ${colors.lightGray}`,
    paddingBottom: 17,
  },
  headerTop: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  headerTopLeft: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTopLogo: {
    width: 18,
    height: 15,
    objectFit: 'contain',
    marginRight: 5,
  },
  headerTopTitle: {
    flex: 1,
    fontSize: 16,
    color: colors.black,
  },
  headerTopDesc: {
    fontSize: 10,
    color: colors.lightDarkGray,
    whiteSpace: 'pre-line',
  },
  headerTopEllipsis: {
    fontSize: 14,
  },
  tags: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: '10px 0 15px',
  },
  editorContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
})

const variants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

const options = [
  {
    value: 'edit',
    label: '編集',
    icon: 'edit',
    style: { width: 90 },
  },
  {
    value: 'delete',
    label: '削除',
    icon: 'trash-alt',
    iconStyle: { color: colors.red },
    style: { background: colors.lightGray, color: colors.red, width: 90 },
  },
]

const Snippet = ({ actions, folderId, selected, kind, data }) => {
  // props
  const { id, title, desc, ext, contents, tags } = data

  // state
  const [isOpenEdit, setOpenEdit] = useState(false)
  const [isOpenDelete, setOpenDelete] = useState(false)
  const [isOpenDropdown, setOpenDropdown] = useState(false)
  const [isLoadingDelete, setLoadingDelete] = useState(false)
  const [resErr, setResErr] = useState('')

  // handler
  const handleOpenEdit = () => setOpenEdit(!isOpenEdit)
  const handleOpenDelete = () => setOpenDelete(!isOpenDelete)
  const handleOpenDropdown = () => setOpenDropdown(!isOpenDropdown)
  const handleDropdownAction = x => {
    if (x.value === 'edit') handleOpenEdit()
    else handleOpenDelete()
    handleOpenDropdown()
  }
  const handleDeleteSnippet = async () => {
    try {
      setLoadingDelete(true)
      handleOpenDelete()

      const newAll = await actions.deleteSnippet({ folderId, snippetId: id })
      if (kind === 'folder') {
        const selectedFolder = newAll.folders.find(x => x.id === folderId)
        actions.setSelected({ selected: selectedFolder, kind: 'folder' })
      } else if (kind === 'ext' || kind === 'tag') {
        actions.setSelected({ selected, kind })
      }

      setLoadingDelete(false)
    } catch (err) {
      setLoadingDelete(false)
      setResErr(err.message)
    }
  }

  // header
  const renderHeader = () => (
    <div className={styles.header}>
      <div className={styles.headerTop}>
        <div className={styles.headerTopLeft}>
          <img
            src={images.logo}
            className={styles.headerTopLogo}
            alt="snippet"
          />
          <p className={styles.headerTopTitle}>{title}</p>
        </div>
        <span h="11" data-tut="reactour__snippet_snippet_menu">
          <Dropdown
            isOpen={isOpenDropdown}
            options={options}
            toggleModal={handleOpenDropdown}
            onClick={handleDropdownAction}
          >
            <FontIcon icon="ellipsis-v" className={styles.headerTopEllipsis} />
          </Dropdown>
        </span>
      </div>
      <LinkText className={styles.headerTopDesc}>{desc}</LinkText>
      <ConfirmDelete
        name={title}
        isOpen={isOpenDelete}
        toggleModal={handleOpenDelete}
        onDelete={handleDeleteSnippet}
        isLoading={isLoadingDelete}
      />
      <SnippetEditor
        data={data}
        isOpen={isOpenEdit}
        toggleModal={handleOpenEdit}
      />
    </div>
  )

  // tags
  const renderTags = () => (
    <div className={styles.tags}>
      {tags && tags.map((x, i) => <Tag key={i.toString()} label={x} />)}
    </div>
  )

  const renderEditor = () => (
    <div className={styles.editorContainer}>
      <Editor
        ext={ext}
        value={contents}
        textareaStyle={{
          marginBottom: 15,
        }}
        maxHeight={300}
      />
      <span h="13" data-tut="reactour__snippet_snippet_copy">
        <CopyButton text={contents} />
      </span>
    </div>
  )

  return (
    <motion.div variants={variants} className={styles.root}>
      <Error label={resErr} />
      {renderHeader()}
      {renderTags()}
      {renderEditor()}
    </motion.div>
  )
}

Snippet.propTypes = {
  actions: PropTypes.shape({}),
  folderId: PropTypes.string,
  selected: PropTypes.shape({}),
  kind: PropTypes.string,
  data: PropTypes.shape({}),
}

Snippet.defaultProps = {
  actions: {},
  folderId: null,
  selected: null,
  kind: 'folder',
  data: {},
}

export default props => (
  <Connector>
    {({
      actions,
      state: {
        select: { selected, kind },
      },
    }) => (
      <Snippet
        actions={{ ...actions.data, ...actions.select }}
        folderId={selected && selected.id}
        selected={selected}
        kind={kind}
        {...props}
      />
    )}
  </Connector>
)
