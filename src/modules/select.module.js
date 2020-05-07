// eslint-disable-next-line import/no-cycle
import { getAll } from 'utils/store'
import { extOptions } from 'utils/const'

// ------------------------------------
// Constants
// ------------------------------------

const SET_SELECTED = 'SET_SELECTED'

const initialState = {
  kind: 'folder', // folder, tag, ext, search
  selected: null,
}

// ------------------------------------
// Helper
// ------------------------------------

const getFirstFolder = ({ folders }) => {
  if (!folders) return null
  if (Array.isArray(folders) && folders.length > 0) return folders[0]
  return null
}

const getFirstExt = ({ exts }) => {
  if (!exts) return null
  const keys = Object.keys(exts)
  if (keys.length === 0) return null
  const key = keys[0]
  const count = exts[key]
  const option = extOptions.find(x => x.value === key)
  return {
    count,
    title: option.label,
    value: option.value,
  }
}

const getFirstTag = ({ tags }) => {
  if (!tags) return null
  const keys = Object.keys(tags)
  if (keys.length === 0) return null
  const key = keys[0]
  return {
    title: key,
    count: tags[key],
  }
}

const hasKeyword = (data, keyword) => {
  if (!data) return false
  if (typeof data === 'string')
    return data.toLowerCase().includes(keyword.toLowerCase())
  if (Array.isArray(data)) {
    const value = data.find(x =>
      x.toLowerCase().includes(keyword.toLowerCase()),
    )
    if (value) return true
  }
  return false
}

const filter = (snippets, keyword) => {
  return snippets.filter(x => {
    if (
      hasKeyword(x.title, keyword) ||
      hasKeyword(x.desc, keyword) ||
      hasKeyword(x.contents, keyword) ||
      hasKeyword(x.ext, keyword) ||
      hasKeyword(x.tags, keyword)
    )
      return true
    return false
  })
}

const getSnippets = (selected, kind, keyword) => {
  let snippets = []
  const { folders } = getAll()

  if (kind === 'search' && keyword) {
    folders.forEach(x => {
      const snippetsFiltered = filter(x.snippets, keyword)
      snippets = [...snippets, ...snippetsFiltered]
    })
  }

  if (kind === 'ext') {
    const { value, title } = selected
    const ext = value || extOptions.find(x => x.label === title).value
    folders.forEach(x => {
      x.snippets.forEach(y => {
        if (y.ext === ext) snippets.push(y)
      })
    })
  }

  if (kind === 'tag') {
    const { title } = selected
    folders.forEach(x => {
      x.snippets.forEach(y => {
        if (y.tags && y.tags.includes(title)) {
          snippets.push(y)
        }
      })
    })
  }

  return snippets
}

// ------------------------------------
// Actions
// ------------------------------------

const setSelected = ({ selected, kind, keyword }) => dispatch => {
  if (kind === 'folder') {
    return dispatch({
      type: SET_SELECTED,
      selected,
      kind,
    })
  }

  // search
  if (kind === 'search') {
    const snippets = getSnippets(selected, kind, keyword)
    return dispatch({
      type: SET_SELECTED,
      selected: {
        title: keyword,
        desc: `キーワード「${keyword}」を含むスニペット一覧`,
        snippets,
      },
      kind,
    })
  }

  // tag / ext
  const snippets = getSnippets(selected, kind)
  const { title } = selected
  const desc =
    kind === 'tag'
      ? `タグ「${title}」を含むスニペット一覧`
      : `拡張子「${title}」のスニペット一覧`
  return dispatch({
    type: SET_SELECTED,
    selected: {
      title,
      desc,
      snippets,
    },
    kind,
  })
}

const filterSnippets = ({ snippets, keyword }) => () => {
  if (!snippets) return []
  return keyword ? filter(snippets, keyword) : snippets
}

const setDefaultFolder = all => dispatch => {
  const folder = getFirstFolder(all)
  if (!folder) return

  dispatch({
    type: SET_SELECTED,
    selected: folder,
    kind: 'folder',
  })
}

const setDefaultExt = all => dispatch => {
  const ext = getFirstExt(all)
  if (!ext) return

  dispatch(
    setSelected({
      type: SET_SELECTED,
      selected: ext,
      kind: 'ext',
    }),
  )
}

const setDefaultTag = all => dispatch => {
  const tag = getFirstTag(all)
  if (!tag) return

  dispatch(
    setSelected({
      type: SET_SELECTED,
      selected: tag,
      kind: 'tag',
    }),
  )
}

export const actions = {
  setSelected,
  filterSnippets,
  setDefaultFolder,
  setDefaultExt,
  setDefaultTag,
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [SET_SELECTED]: (state, { selected, kind }) => ({
    ...state,
    selected,
    kind,
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
