const DiscordStrategy = require('passport-discord').Strategy
const passport = require('passport')
const DiscordUser = require('../models/DiscordUser')

passport.serializeUser((user, done) => {
    console.log('Serialize')
    done(null, user.id)
    console.log(user)
})

passport.deserializeUser( async (id, done) => {
    console.log('Deserialize')
    const user = await DiscordUser.findById(id)
    if(user){
        console.log(user)
        done(null, user)
    }
})

passport.use(new DiscordStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CLIENT_REDIRECT,
    scope: ['identify','email','guilds']
}, async (accessToken, refreshToken, profile, done) =>{
    try{
        const user = await DiscordUser.findOne({ discordId : profile.id})
        if(user){
            done(null, user)
        } else {
            const newUser = await DiscordUser.create({
                discordId: profile.id,
                username: profile.username
            })
            const savedUser = await newUser.save()
            done(null, savedUser)
        }
    } catch (err) { 
        done(err, null)
    }
}))