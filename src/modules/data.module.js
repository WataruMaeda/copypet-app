/* eslint-disable import/no-cycle */
import moment from 'moment'
import uuid from 'uuid/v4'
import { firestore } from 'utils/firebase'
import { getUserId, getAll } from 'utils/store'
import { data } from 'utils/const'
import { countTagsAndExts } from 'utils/count'

// import demo from '../assets/demo.data'

// ------------------------------------
// Constants
// ------------------------------------

const SET_DATA_ALL_START = 'SET_DATA_ALL_START'
const SET_DATA_ALL = 'SET_DATA_ALL'

const initialState = {
  all: null,
  isLoading: true,
}

// ------------------------------------
// Actions
// ------------------------------------

const getFolderId = snippetId => {
  const { folders } = getAll()
  const folder = folders.find(({ snippets }) => {
    return snippets && snippets.find(x => x.id === snippetId)
  })
  return folder && folder.id ? folder.id : null
}

const addSnippetToFolder = ({ folderId, snippet }) => {
  const all = getAll()
  const timestamp = moment().unix()
  const snippetWithKeys = {
    id: uuid(),
    ...snippet,
    created: timestamp,
    updated: timestamp,
  }
  return all.folders.map(x =>
    x.id === folderId
      ? {
          ...x,
          snippets: [snippetWithKeys, ...x.snippets],
          updated: timestamp,
        }
      : x,
  )
}

const updateSnippetInFolder = ({ folderId, snippetId, snippet }) => {
  const all = getAll()
  const timestamp = moment().unix()
  const fid = folderId || getFolderId(snippetId)
  return all.folders.map(x =>
    x.id === fid
      ? {
          ...x,
          snippets: x.snippets.map(y =>
            y.id === snippetId ? { ...snippet, updated: timestamp } : y,
          ),
          updated: timestamp,
        }
      : x,
  )
}

const deleteSnippetInFolder = ({ folderId, snippetId }) => {
  const all = getAll()
  const timestamp = moment().unix()
  const fid = folderId || getFolderId(snippetId)
  return all.folders.map(x =>
    x.id === fid
      ? {
          ...x,
          snippets: x.snippets.filter(y => y.id !== snippetId),
          updated: timestamp,
        }
      : x,
  )
}

const setAll = (folders, dispatch) =>
  new Promise(async (resolve, reject) => {
    const uid = getUserId()
    const { tags, exts } = countTagsAndExts({ folders })
    const newAll = { folders, tags, exts }
    try {
      await firestore
        .collection('v1')
        .doc(uid)
        .set(newAll)
      dispatch({
        type: SET_DATA_ALL,
        all: newAll,
      })
      resolve(newAll)
    } catch (err) {
      reject(err)
    }
  })

// ------------------------------------
// Actions
// ------------------------------------

const fetchAll = () => dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      dispatch({ type: SET_DATA_ALL_START })

      // fetch all
      const uid = getUserId()
      const res = await firestore
        .collection('v1')
        .doc(uid)
        .get()

      // store all contents to redux store
      const all = res.exists ? res.data() : data()
      dispatch({
        type: SET_DATA_ALL,
        all,
      })
      // dispatch({ type: SET_DATA_ALL, all: demo })
      resolve(all)
    } catch (err) {
      dispatch({
        type: SET_DATA_ALL,
        all: {},
      })
      reject(err)
    }
  })

const addSnippet = ({ folderId, snippet }) => dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      const folders = addSnippetToFolder({ folderId, snippet })
      const newAll = await setAll(folders, dispatch)
      resolve(newAll)
    } catch (err) {
      reject(err)
    }
  })

const updateSnippet = ({ folderId, snippetId, snippet }) => dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      const folders = updateSnippetInFolder({ folderId, snippetId, snippet })
      const newAll = await setAll(folders, dispatch)
      resolve(newAll)
    } catch (err) {
      reject(err)
    }
  })

const deleteSnippet = ({ folderId, snippetId }) => dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      const folders = deleteSnippetInFolder({ folderId, snippetId })
      const newAll = await setAll(folders, dispatch)
      resolve(newAll)
    } catch (err) {
      reject(err)
    }
  })

const addFolder = ({ title, desc }) => dispatch =>
  new Promise(async (resolve, reject) => {
    const timestamp = moment().unix()
    const all = getAll()
    const folders = all.folders || []
    const newFolders = [
      {
        id: uuid(),
        title,
        desc,
        created: timestamp,
        updated: timestamp,
        snippets: [],
      },
      ...folders,
    ]
    try {
      const newAll = await setAll(newFolders, dispatch)
      resolve(newAll)
    } catch (err) {
      reject(err)
    }
  })

const editFolder = folder => dispatch =>
  new Promise(async (resolve, reject) => {
    const timestamp = moment().unix()
    const all = getAll()
    const folders = all.folders || []
    const folderEdited = {
      ...folder,
      updated: timestamp,
    }
    const newFolders = [
      folderEdited,
      ...folders.filter(x => x.id !== folder.id),
    ]
    try {
      const newAll = await setAll(newFolders, dispatch)
      resolve(newAll)
    } catch (err) {
      reject(err)
    }
  })

const deleteFolder = id => dispatch =>
  new Promise(async (resolve, reject) => {
    const all = getAll()
    const folders = all.folders || []
    const newFolders = [...folders.filter(x => x.id !== id)]
    try {
      const newAll = await setAll(newFolders, dispatch)
      resolve(newAll)
    } catch (err) {
      reject(err)
    }
  })

export const actions = {
  fetchAll,
  addSnippet,
  updateSnippet,
  deleteSnippet,
  addFolder,
  editFolder,
  deleteFolder,
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [SET_DATA_ALL_START]: state => ({
    ...state,
    isLoading: true,
  }),
  [SET_DATA_ALL]: (state, { all }) => ({
    ...state,
    all,
    isLoading: false,
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
