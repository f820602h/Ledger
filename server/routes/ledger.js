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

router.post('/login', function (req, res) {
  const ref = db.doc(req.body.account)
  ref.get().then(data => {
    if (data.data().account.password === req.body.password) {
      res.json({
        success: true
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

router.get('/:account', function (req, res) {
  const ref = db.doc(req.params.account)
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

router.post('/:account', function (req, res) {
  const ref = db.doc(req.params.account)
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

router.post('/save/:account', function (req, res) {
  const ref = db.doc(req.params.account)
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
