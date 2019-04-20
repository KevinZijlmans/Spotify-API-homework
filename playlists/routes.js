const { Router } = require('express')
const Playlist = require('./model')

const router = new Router()

router.get('/playlists', (req, res, next) => {
  const limit = req.query.limit || 20
  const offset = req.query.offset || 0

  Promise.all([
    Playlist.count(),
    Playlist.findAll({ limit, offset })
  ])
    .then(([total, playlists]) => {
      res.send({
        playlists, total
      })
    })
    .catch(error => next(error))
})
  
  router.get('/playlists/:id', (req, res, next) => {
    Playlist
      .findByPk(req.params.id)
      .then(playlist => {
        if (!playlist) {
          return res.status(404).send({
            message: `playlist does not exist`
          })
        }
        return res.send(playlist)
      })
      .catch(error => next(error))
  })
  
  router.post('/playlists', (req, res, next) => {
    Playlist
      .create(req.body)
      .then(playlist => {
        if (!playlist) {
          return res.status(404).send({
            message: `playlist does not exist`
          })
        }
        return res.status(201).send(playlist)
      })
      .catch(error => next(error))
  })
  
  router.delete('/playlists/:id', (req, res, next) => {
    Playlist
      .findByPk(req.params.id)
      .then(playlist => {
        if (!playlist) {
          return res.status(404).send({
            message: `playlist does not exist`
          })
        }
        return playlist.destroy()
          .then(() => res.send({
            message: `playlist was deleted`
          }))
      })
      .catch(error => next(error))
  })
  
  module.exports = router