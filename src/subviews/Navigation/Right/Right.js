import React from 'react'
import { PropTypes } from 'prop-types'
import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { styler, colors, breakpoints } from 'styles'
import Connector from 'utils/connector'
import { SnippetLoadingState } from 'subviews/LoadingState'

import Item from './Item'

const styles = styler({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 160,
    minHeight: '100%',
    paddingTop: 20,
    boxShadow: '0 0.5px 5px 0 rgba(49, 69, 91, 0.15)',
    borderRight: `solid 1px ${colors.lightGray}`,
    zIndex: 2,
    [breakpoints.phone]: {
      display: 'none',
    },
  },
  title: {
    fontSize: 16,
    fontWeight: 'normal',
    color: colors.black,
    margin: '0 20px 40px',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: 40,
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
  if (selected && selected.snippets) return selected.snippets
  return []
}

const Right = ({ actions, selected, keyword, style }) => {
  // props
  const snippets = getSnippets(selected)
  const snippetsFiltered = actions.filterSnippets({ snippets, keyword })
  snippetsFiltered.sort((a, b) => a.updated - b.updated).reverse()

  // rendering
  return (
    <div
      className={styles.root}
      style={style}
      h="7"
      data-tut="reactour__snippet_list"
    >
      <h3 className={styles.title}>スニペット</h3>
      {!selected && <SnippetLoadingState />}
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        className={styles.container}
      >
        {snippetsFiltered.map((x, i) => (
          <Link
            key={i.toString()}
            to={x.id}
            spy
            smooth
            offset={50}
            duration={500}
          >
            <Item label={x.title} />
          </Link>
        ))}
      </motion.div>
    </div>
  )
}

Right.propTypes = {
  actions: PropTypes.shape({}),
  selected: PropTypes.shape({}),
  keyword: PropTypes.string,
  style: PropTypes.shape({}),
}

Right.defaultProps = {
  actions: {},
  selected: {},
  keyword: '',
  style: {},
}

export default props => (
  <Connector>
    {({
      actions,
      state: {
        search: { keyword },
        select,
      },
    }) => (
      <Right
        actions={actions.select}
        keyword={keyword}
        {...select}
        {...props}
      />
    )}
  </Connector>
)
