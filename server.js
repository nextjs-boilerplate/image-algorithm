require("babel-register")({
  presets: ["es2015", "stage-2"]
})

const express = require('express')
const next = require('next')
const spdy = require('spdy')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')


const apiRoute = require('./tools/api-route')
const io = require('./tools/socket.io')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })


//routes
const routes = require('./tools/routes')
const handle = routes.getRequestHandler(app)

app.prepare()
  .then(() => {
    const server = express()

    var httpserver = require('http').Server(server);
    io(httpserver)

    //static
    server.use('/', express.static('static'))
    var bootstrapPath = path.dirname(path.dirname(require.resolve('bootstrap')))
    server.use('/', express.static(bootstrapPath))

    //cookie
    server.use(bodyParser.urlencoded({ extended: true }))
    server.use(bodyParser.json())
    server.use(cookieParser())

    //api
    server.use('/api', apiRoute)

    //next routes
    server.use(handle)

    //http
    httpserver.listen(80, (err) => {
      if (err) throw err
      console.log('> Ready http on http://localhost')
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })