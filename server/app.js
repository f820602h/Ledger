const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const logger = require("morgan");

const history = require("connect-history-api-fallback");

const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const config = require("@vue/cli-service/webpack.config");

const ledgerRouter = require("./routes/ledger");

const app = express();

// webpack config
const compiler = webpack(config);
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: { colors: true }
  })
);
app.use(webpackHotMiddleware(compiler));

// middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(history());
app.use(express.static(path.join(__dirname, "./dist")));

app.set("trust proxy", 1); // trust first proxy
app.use(
  cookieSession({
    name: "ledger_login",
    keys: ["ilovemoney"],
    maxAge: 24 * 60 * 60 * 1000
  })
);

app.use("/ledger", ledgerRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
