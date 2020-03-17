const express = require('express')
const firebase = require('firebase')
require('dotenv').config()

// 載入 jwt
// var jwt = require('jsonwebtoken')

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
  firebase.auth().signInWithEmailAndPassword(req.body.account, req.body.password)
    .then(() => {
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

router.post('/login', function (req, res) {
  firebase.auth().signInWithEmailAndPassword(req.body.account, req.body.password)
    .then(() => {
      req.session.uid = firebase.auth().currentUser.uid
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

router.get('/logout', function (req, res) {
  firebase.auth().signOut()
    .then(() => {
      res.clearCookie('ledger_login', { path: '/' })
      delete req.session.uid
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
  }).catch(() => {
    res.json({
      success: false
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
