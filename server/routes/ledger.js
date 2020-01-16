const express = require('express')
const firebase = require('firebase')

const router = express.Router()

const firebaseConfig = {
  apiKey: 'AIzaSyAqy8ntkM52HedxRGpm-yIZF5CMKGjJOrI',
  authDomain: 'node-project-dc11c.firebaseapp.com',
  databaseURL: 'https://node-project-dc11c.firebaseio.com',
  projectId: 'node-project-dc11c',
  storageBucket: 'node-project-dc11c.appspot.com',
  messagingSenderId: '940587931446',
  appId: '1:940587931446:web:c12b9694c7ecd31e7e4597',
  measurementId: 'G-00DS5WTD1H'
}

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore().collection('ledger')

router.get('/:account', function (req, res) {
  const ref = db.doc(req.params.account)
  ref.get().then(data => {
    res.json({
      success: true,
      body: data.data()
    })
  }).catch(() => {
    res.json({
      success: false
    })
  })
})

router.post('/:account', function (req, res) {
  const ref = db.doc(req.params.account)
  ref.set({
    ledger: req.body
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
