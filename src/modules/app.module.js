import { auth, storage } from 'utils/firebase'

// ------------------------------------
// Constants
// ------------------------------------

const SAVE_ME = 'SAVE_ME'
const LOGGED_IN = 'LOGGED_IN'
const SET_TOUR = 'SET_TOUR'
const SET_OPEN_TOUR = 'SET_OPEN_TOUR'

const initialState = {
  checked: false,
  loggedIn: false,
  needTour: false,
  isOpenTour: false,
  me: {},
}

// ------------------------------------
// Actions
// ------------------------------------

export const authenticate = () => dispatch =>
  new Promise(async resolve => {
    auth.onAuthStateChanged(me => {
      dispatch({
        type: LOGGED_IN,
        loggedIn: me && me.emailVerified && me.displayName,
        me: me || {},
        checked: true,
      })
      resolve(me)
    })
  })

const saveMe = me => dispatch =>
  dispatch({
    type: SAVE_ME,
    me,
  })

const signup = (email, password) => dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password,
      )
      if (user && !user.emailVerified) {
        await user.sendEmailVerification()
        dispatch(saveMe(user))
        resolve(user)
      } else if (user) {
        dispatch(saveMe(user))
        resolve(user)
      }
      reject(
        new Error(
          'アカウントの作成に失敗しました。時間を置いて再度お試しください。',
        ),
      )
    } catch (err) {
      reject(err)
    }
  })

const login = (email, password) => dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password)
      if (!user) {
        reject(
          new Error('ログインに失敗しました。時間を置いて再度お試しください。'),
        )
      }
      if (!user.emailVerified) {
        await user.sendEmailVerification()
      }
      dispatch(saveMe(user))
      resolve(user)
    } catch (err) {
      reject(err)
    }
  })

const logout = () => dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      await auth.signOut()
      dispatch(saveMe(null))
      resolve()
    } catch (err) {
      reject(err)
    }
  })

const resetPassword = email => () =>
  new Promise(async (resolve, reject) => {
    try {
      await auth.sendPasswordResetEmail(email)
      resolve()
    } catch (err) {
      reject(err)
    }
  })

const updateMe = (name, file) => dispatch =>
  new Promise(async (resolve, reject) => {
    try {
      // get current user
      const me = auth.currentUser
      if (!me) return

      // if the image is file, upload to firebase storage
      let path
      if (file && typeof file === 'object') {
        path = `users/${me.uid}`
        await storage.child(path).put(file)
      } else {
        path = 'default/profile.png'
      }

      // update me
      await me.updateProfile({ displayName: name, photoURL: path })
      dispatch(authenticate())
      resolve()
    } catch (err) {
      reject(err)
    }
  })

const deleteMe = (email, password) => () =>
  new Promise(async (resolve, reject) => {
    try {
      // update me
      await auth.signOut()
      await auth.signInWithEmailAndPassword(email, password)
      await auth.currentUser.delete()
      window.location.reload()
      resolve()
    } catch (err) {
      reject(err)
    }
  })

const setTour = needTour => dispatch =>
  dispatch({
    type: SET_TOUR,
    needTour,
  })

const setOpenTour = isOpenTour => dispatch =>
  dispatch({
    type: SET_OPEN_TOUR,
    isOpenTour,
  })

export const actions = {
  authenticate,
  saveMe,
  updateMe,
  deleteMe,
  signup,
  login,
  logout,
  resetPassword,
  setTour,
  setOpenTour,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGGED_IN]: (state, { loggedIn, me, checked }) => ({
    ...state,
    loggedIn,
    me,
    checked,
  }),
  [SAVE_ME]: (state, { me }) => ({
    ...state,
    me,
  }),
  [SET_TOUR]: (state, { needTour }) => ({
    ...state,
    needTour,
  }),
  [SET_OPEN_TOUR]: (state, { isOpenTour }) => ({
    ...state,
    isOpenTour,
  }),
}

// ------------------------------------
// Reducer
// ------------------------------------

export default function reducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
