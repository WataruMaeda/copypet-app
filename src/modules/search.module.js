import { extOptions } from 'utils/const'

// ------------------------------------
// Constants
// ------------------------------------

const SET_SEARCH_KEYWORD = 'SET_SEARCH_KEYWORD'

const initialState = {
  keyword: '',
}

// ------------------------------------
// Helpers
// ------------------------------------

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

const findSnippets = (snippets, keyword) => {
  return snippets.find(x => {
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

const formatExts = exts =>
  Object.keys(exts).map(k => {
    const option = extOptions.find(x => x.value === k)
    const count = `${exts[k]}`
    return {
      count,
      title: option.label,
      value: option.value,
    }
  })

const formatTags = tags =>
  Object.keys(tags).map(k => ({
    title: k,
    count: tags[k],
  }))

// ------------------------------------
// Actions
// ------------------------------------

const setKeyword = keyword => dispatch =>
  dispatch({
    type: SET_SEARCH_KEYWORD,
    keyword,
  })

const getFolders = (all, keyword) => () => {
  if (all && all.folders && !keyword) return all.folders
  if (all && all.folders && keyword) {
    return all.folders.filter(x => {
      if (
        hasKeyword(x.title, keyword) ||
        hasKeyword(x.desc, keyword) ||
        findSnippets(x.snippets, keyword)
      )
        return true
      return false
    })
  }
  return []
}

const getExts = (all, keyword) => () => {
  if (all && all.exts) {
    const extsFormatted = formatExts(all.exts)
    if (!keyword) return extsFormatted
    return extsFormatted.filter(x => {
      if (hasKeyword(x.title, keyword) || hasKeyword(x.value, keyword))
        return true
      return false
    })
  }
  return []
}

const getTags = (all, keyword) => () => {
  if (all && all.tags) {
    const tagsFormatted = formatTags(all.tags)
    if (!keyword) return tagsFormatted
    return tagsFormatted.filter(x => {
      if (hasKeyword(x.title, keyword)) return true
      return false
    })
  }
  return []
}

export const actions = {
  setKeyword,
  getFolders,
  getExts,
  getTags,
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [SET_SEARCH_KEYWORD]: (state, { keyword }) => ({
    ...state,
    keyword,
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
