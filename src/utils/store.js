/* eslint-disable import/no-cycle */
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import app from '../modules/app.module'
import data from '../modules/data.module'
import select from '../modules/select.module'
import search from '../modules/search.module'

const analytics = () => next => action => {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event: action.type,
    payload: action.payload,
  })

  return next(action)
}

// Redux store config
const configureStore = (initialState = {}) => {
  const reducers = combineReducers({
    app,
    data,
    select,
    search,
  })

  // Middleware and store enhancers
  const middlewares = [
    thunk,
    process.env.NODE_ENV !== 'production' && logger,
    analytics,
  ].filter(Boolean)
  const enhancer = compose(applyMiddleware(...middlewares))
  const store = createStore(reducers, initialState, enhancer)

  return store
}

const store = configureStore()

export const getUserId = () => {
  const {
    app: { me },
  } = store.getState()
  if (!me || (me && !me.uid)) return null
  return me.uid
}

export const getAll = () => {
  const {
    data: { all },
  } = store.getState()
  return all
}

export const getSelectedFolderId = () => {
  const {
    select: { selected },
  } = store.getState()
  if (!selected || (selected && !selected.id)) return null
  return selected.id
}

export default store
