const proxy = require('express-http-proxy')
const express = require("express");
const config = require("config");
const { proxyErrorHandler,auth} = require('./proxy.utils');

const app = express();

console.log(config.get("app.routes.booking"))

app.all('/v1/idp/**',proxy(config.get("app.routes.idp"),{proxyErrorHandler}))
app.all('/v1/api-docs/', proxy(config.get("app.routes.booking"),{proxyErrorHandler}))
app.all('/v1/facilities**', auth, proxy(config.get("app.routes.booking"),{proxyErrorHandler}))
app.all('/v1/preferences', auth, proxy(config.get("app.routes.preferences"),{proxyErrorHandler}))
app.all('/v1/preferences/**', auth, proxy(config.get("app.routes.preferences"),{proxyErrorHandler}))
app.all('/v1/booking/**', auth, proxy(config.get("app.routes.booking"),{proxyErrorHandler}))

const port = process.env.PORT || 4500;

app.listen(port, () =>
  console.log(`API Gateway listening on port ${port}`)
);
