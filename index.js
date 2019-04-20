const express = require('express')
const bodyParser = require('body-parser')
const authRouter = require('./auth/routes')
const usersRouter = require('./users/routes')
const playlistRouter = require('./playlists/routes')
const songRouter = require('./songs/routes')

const app = express()
const port = process.env.PORT || 4000

app
  .use(bodyParser.json())
  .use(authRouter)
  .use(usersRouter)
  .use(playlistRouter)
  .use(songRouter)
  .listen(port, () => console.log(`Listening on port ${port}`))