import React, { useState } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import Connector from 'utils/connector'
import FolderEditor from 'subviews/FolderEditor'
import { styler, colors, breakpoints } from 'styles'

import Section from './Section'
import Item from './Item'

const styles = styler({
  root: {
    display: 'flex',
    flexDirection: 'column',
    background: colors.black,
    width: 217,
    minHeight: '100%',
    paddingTop: 20,
    [breakpoints.phone]: {
      display: 'none',
    },
  },
  title: {
    fontSize: 16,
    fontWeight: 'normal',
    color: 'white',
    margin: '0 20px 40px',
  },
})

const Center = ({ actions, all, keyword }) => {
  // props
  const folders = actions.getFolders(all, keyword)
  const exts = actions.getExts(all, keyword)
  const tags = actions.getTags(all, keyword)

  // sorting
  folders.sort((a, b) => a.updated - b.updated).reverse()
  const extsSorted = _.sortBy(exts, ['count']).reverse()
  const tagsSorted = _.sortBy(tags, ['count']).reverse()

  // state
  const [isOpen, setOpen] = useState(false)

  // handler
  const handleOpenState = () => setOpen(!isOpen)

  // rendering
  return (
    <div className={styles.root}>
      <h3 className={styles.title}>カテゴリ</h3>
      <span h="1" data-tut="reactour__folder">
        <Section label="フォルダ" onClick={handleOpenState}>
          {folders.map((x, i) => {
            const snippets = actions.filterSnippets({
              snippets: x.snippets,
              keyword,
            })
            return (
              <Item
                data={x}
                type="folder"
                label={x.title}
                key={i.toString()}
                count={`${snippets.length}`}
              />
            )
          })}
        </Section>
      </span>
      <span h="3" data-tut="reactour__ext">
        <Section label="拡張子">
          {extsSorted.map((x, i) => (
            <Item
              data={x}
              type="ext"
              label={x.title}
              key={i.toString()}
              count={x.count}
            />
          ))}
        </Section>
      </span>
      <span h="4" data-tut="reactour__tag">
        <Section label="タグ">
          {tagsSorted.map((x, i) => (
            <Item
              data={x}
              type="tag"
              label={x.title}
              key={i.toString()}
              count={x.count}
            />
          ))}
        </Section>
      </span>
      <FolderEditor
        isOpen={isOpen}
        toggleModal={handleOpenState}
        onComplete={handleOpenState}
      />
    </div>
  )
}

Center.propTypes = {
  actions: PropTypes.shape({}),
  all: PropTypes.shape({}),
  keyword: PropTypes.string,
}

Center.defaultProps = {
  actions: {},
  all: {},
  keyword: '',
}

export default props => (
  <Connector>
    {({
      actions,
      state: {
        data: { all },
        search: { keyword },
      },
    }) => (
      <Center
        actions={{ ...actions.search, ...actions.select }}
        all={all}
        keyword={keyword}
        {...props}
      />
    )}
  </Connector>
)
