const { Router } = require('express')
const User = require('./model')
const bcrypt = require('bcrypt')

const router = new Router()
  // I know the password_confirmation doesnt work this way, but I couldnt figure it out.
  router.post('/users', (req, res, next) => {
    const user = {
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        password_confirmation: bcrypt.hashSync(req.body.password_confirmation, 10)
    }
    User
      .create(user)
      .then(user => {
        if (!user) {
          return res.status(404).send({
            message: `user does not exist`
          })
        }
        return res.status(201).send(user)
      })
      .catch(error => next(error))
  })

  module.exports = router