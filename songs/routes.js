const { Router } = require('express')
const Song = require('./model')
const Playlist = require('../playlists/model')

const router = new Router()

router.post('playlists/:id/songs', (req, res, next) => {
    Song
    .findByPk(req.params.id)
    .create(req.body)
    .then(songs => {
      if (!songs) {
        return res.status(404).send({
          message: `song does not exist`
        })
      }
      return res.status(201).send(songs)
    })
    .catch(error => next(error))
})

module.exports = router