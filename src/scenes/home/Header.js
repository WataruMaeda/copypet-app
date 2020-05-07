import React from 'react'
import { PropTypes } from 'prop-types'
import LinkText from 'components/LinkText'
import FontIcon from 'components/FontIcon'
import { IconButton } from 'components/Button'
import { styler, colors, breakpoints } from 'styles'
import { HeaderLoadingState } from 'subviews/LoadingState'

const styles = styler({
  root: {
    display: 'flex',
    flexDirection: 'column',
    borderBottom: `1px solid ${colors.lightGray}`,
    marginBottom: 15,
    background: 'white',
    width: '100%',
    padding: '40px 30px',
    [breakpoints.phone]: {
      padding: '40px 15px',
    },
  },
  top: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 8,
  },
  topLeft: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topLeftIcon: {
    fontSize: 14,
    color: colors.yellow,
    marginRight: 10,
  },
  topLeftTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
  },
  topRight: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topRightEditButton: {
    marginLeft: 10,
  },
  topRightEditIcon: {
    margin: 0,
    fontSize: 14,
    color: colors.darkGray,
  },
  topRightDeleteButton: {
    marginLeft: 10,
  },
  topRightDeleteIcon: {
    margin: 0,
    fontSize: 14,
    color: colors.darkGray,
  },
  topRightAddButton: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    background: colors.green,
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  topRightAddIcon: {
    margin: 0,
    fontSize: 14,
    color: 'white',
  },
  bottomDesc: {
    fontSize: 12,
    color: colors.lightDarkGray,
    whiteSpace: 'pre-line',
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
    case 'search':
      return 'search'
    default:
      return 'folder'
  }
}

const Header = ({ kind, data, onEdit, onDelete, onAdd, style }) => {
  if (!data) return <HeaderLoadingState />

  // props
  const { title, desc } = data

  // rendering
  return (
    <div
      className={styles.root}
      style={style}
      h="6"
      data-tut="reactour__snippet_snippet_header"
    >
      <div className={styles.top}>
        <div className={styles.topLeft}>
          <FontIcon icon={getIcon(kind)} className={styles.topLeftIcon} />
          <h4 className={styles.topLeftTitle}>{title}</h4>
        </div>
        {kind === 'folder' && (
          <div className={styles.topRight}>
            <span h="8" data-tut="reactour__snippet_snippet_header_edit">
              <IconButton
                icon="edit"
                className={styles.topRightEditButton}
                iconClassName={styles.topRightEditIcon}
                onClick={onEdit}
              />
            </span>
            <span h="9" data-tut="reactour__snippet_snippet_header_del">
              <IconButton
                icon="trash-alt"
                className={styles.topRightDeleteButton}
                iconClassName={styles.topRightDeleteIcon}
                onClick={onDelete}
              />
            </span>
            <span h="10" data-tut="reactour__snippet_snippet_header_add">
              <IconButton
                icon="plus"
                className={styles.topRightAddButton}
                iconClassName={styles.topRightAddIcon}
                onClick={onAdd}
              />
            </span>
          </div>
        )}
      </div>
      <LinkText className={styles.bottomDesc}>{desc}</LinkText>
    </div>
  )
}

Header.propTypes = {
  kind: PropTypes.string,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onAdd: PropTypes.func,
  style: PropTypes.shape({}),
}

Header.defaultProps = {
  kind: 'folder',
  onEdit: () => {},
  onDelete: () => {},
  onAdd: () => {},
  style: {},
}

export default Header
