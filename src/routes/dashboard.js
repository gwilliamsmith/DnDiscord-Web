const router = require('express').Router()

function authed(req, res, next){
    if(req.user) {
        console.log(`logged in`)
        //console.log(req.user)
        next()
    } else {
        console.log(`User is not logged in`)
        res.redirect(`/`)
    }
}
router.get('/', authed, (req, res) =>{
    res.send(req.user)
})

module.exports = router