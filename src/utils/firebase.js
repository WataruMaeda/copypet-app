import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/firestore'
import 'firebase/performance'
import 'firebase/analytics'

const config = {
  apiKey: 'AIzaSyCIqTzb_yCRABuIV3i1uD9plIF5uYIlG1I',
  authDomain: 'copypet-demo.firebaseapp.com',
  databaseURL: 'https://copypet-demo.firebaseio.com',
  projectId: 'copypet-demo',
  storageBucket: 'copypet-demo.appspot.com',
  messagingSenderId: '972443365053',
  appId: '1:972443365053:web:9582b1839c0f0e37dd91d4',
  measurementId: 'G-TMC24RBT96',
}

firebase.initializeApp(config)
firebase.analytics()

export const auth = firebase.auth()
export const storage = firebase.storage().ref()
export const firestore = firebase.firestore()
export const performance = firebase.performance()

export default firebase
