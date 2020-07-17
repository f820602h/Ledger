const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const redis = require('redis')
let RedisStore = require('connect-redis')(session)
let redisClient = redis.createClient()
const logger = require('morgan')

const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('@vue/cli-service/webpack.config')

const ledgerRouter = require('./routes/ledger')

const app = express()

// webpack config
const compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  stats: { colors: true }
}))
app.use(webpackHotMiddleware(compiler))

app.set('trust proxy', 1)

// middleware
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(session({
  store: new RedisStore({ client: redisClient }),
  name: 'ledger_login',
  secret: 'ilovemoney',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 1000 * 30, sameSite: true }
}))
app.use(express.static(path.join(__dirname, '../public')))

app.use('/ledger', ledgerRouter)

app.use(function (req, res, next) {
  if (!req.session) {
    return next(new Error('Oh no')) // handle error
  }
  next() // otherwise continue
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
