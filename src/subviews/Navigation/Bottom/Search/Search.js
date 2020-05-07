import React from 'react'
import { PropTypes } from 'prop-types'
import FontIcon from 'components/FontIcon'
import { styler, colors } from 'styles'
import Connector from 'utils/connector'

const styles = styler({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'white',
  },
  icon: {
    color: colors.gray,
    fontSize: 14,
    marginLeft: 10,
  },
  input: {
    border: 'none',
    boxShadow: 'none',
    padding: '2px 16px 2px 8px',
    width: '100%',
    fontSize: 14,
    height: 44,
    color: colors.darkGray,
  },
})

const Search = ({ actions, keyword, kind }) => {
  // props
  if (kind !== 'search') return null

  // handler
  const handleInputChange = ({ target: { value } }) => {
    actions.setKeyword(value)
    actions.setSelected({ kind: 'search', keyword: value })
  }

  // rendering
  return (
    <div className={styles.root}>
      <FontIcon icon="search" className={styles.icon} />
      <input
        type="text"
        name="search"
        value={keyword}
        placeholder="キーワード"
        onChange={handleInputChange}
        className={styles.input}
      />
    </div>
  )
}

Search.propTypes = {
  actions: PropTypes.shape({}),
  keyword: PropTypes.string,
  kind: PropTypes.string,
}

Search.defaultProps = {
  actions: {},
  keyword: '',
  kind: 'folder',
}

export default props => (
  <Connector>
    {({
      actions,
      state: {
        select,
        search: { keyword },
      },
    }) => (
      <Search
        actions={{ ...actions.search, ...actions.select }}
        {...select}
        keyword={keyword}
        {...props}
      />
    )}
  </Connector>
)
