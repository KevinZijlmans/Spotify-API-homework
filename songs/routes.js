const { Router } = require('express')
const Song = require('./model')
const Playlist = require('../playlists/model')
// Posting songs should work like this, but I get a 404 don't know why.
const router = new Router()
router.get('playlists/:id/songs', (req, res, next) => {
  Song
  .findByPk(req.params.id, {include:Playlist})
    .then(song => {
      if(!song) {
        return res.status(404).send({
          message: `song does not exist`
        })
      }
      return res.status(200).send(song)
    })
    .catch(error => next(error))
})

router.post('playlists/:id/songs', (req, res, next) => {
    Song
    .create(req.body)
    .then(song => {
      if (!song) {
        return res.status(404).send({
          message: `song does not exist`
        })
      }
      return res.status(201).send(song)
    })
    .catch(error => next(error))
})

module.exports = router