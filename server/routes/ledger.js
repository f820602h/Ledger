const express = require('express')
const firebase = require('firebase')
require('dotenv').config()

const router = express.Router()
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId
}

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore().collection('ledger')

router.post('/signup', function (req, res) {
  firebase.auth().createUserWithEmailAndPassword(req.body.account, req.body.password)
    .then((user) => {
      res.json({
        success: true
      })
    })
    .catch(function (error) {
      res.json({
        success: false,
        code: error.code,
        msg: error.message
      })
    })
})

router.post('/login', function (req, res) {
  firebase.auth().signInWithEmailAndPassword(req.body.account, req.body.password)
    .then(() => {
      req.session.uid = firebase.auth().currentUser.uid
      if (req.body.init) {
        const uid = req.session.uid
        const ref = db.doc(uid)
        ref.set({
          ledger: [],
          name: req.body.name,
          save: req.body.save,
          type: {
            income: ['薪資', '獎金', '投資'],
            pay: ['伙食', '交通', '房租', '娛樂', '購物']
          }
        }).then(() => {
          res.json({
            success: true
          })
        }).catch(function (err) {
          res.json({
            success: false,
            body: err
          })
        })
      }
      res.json({
        success: true
      })
    })
    .catch(function (error) {
      res.json({
        success: false,
        msg: error.message
      })
    })
})

router.get('/login', function (req, res) {
  const uid = req.session.uid
  if (uid) {
    res.json({
      success: true
    })
  } else {
    res.json({
      success: false
    })
  }
})

router.get('/logout', function (req, res) {
  firebase.auth().signOut()
    .then(() => {
      res.clearCookie('ledger_login', { path: '/' })
      req.session = null
      res.json({
        success: true
      })
    })
    .catch(function (error) {
      res.json({
        success: false,
        msg: error.message
      })
    })
})

router.get('/', function (req, res) {
  const uid = req.session.uid
  const ref = db.doc(uid)
  ref.get().then(data => {
    if (data.data()) {
      res.json({
        success: true,
        body: data.data()
      })
    } else {
      res.json({
        success: false
      })
    }
  }).catch((err) => {
    res.json({
      success: false,
      body: err
    })
  })
})

router.post('/', function (req, res) {
  const uid = req.session.uid
  const ref = db.doc(uid)
  ref.set({
    ledger: req.body.newLedger,
    save: req.body.newSave
  }, { merge: true })
    .then(() => {
      res.json({
        success: true
      })
    }).catch(() => {
      res.json({
        success: false
      })
    })
})

router.post('/save', function (req, res) {
  const uid = req.session.uid
  const ref = db.doc(uid)
  ref.set({
    save: req.body.newSave
  }, { merge: true })
    .then(() => {
      res.json({
        success: true
      })
    }).catch(() => {
      res.json({
        success: false
      })
    })
})

module.exports = router
