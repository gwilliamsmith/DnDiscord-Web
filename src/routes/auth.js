const router = require('express').Router()
const passport = require('passport')
require('dotenv').config()

router.get('/', passport.authenticate('discord'))

//

router.get('/redirect', passport.authenticate('discord',{
    failureRedirect: '/forbidden'
}), (req, res) => {
    console.log('redirect')
    res.send(req.user)
})

module.exports = router