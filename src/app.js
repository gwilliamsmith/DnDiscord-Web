require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = process.env.PORT || 3001
const session = require('express-session')
const passport = require('passport')
const DiscordStrategy = require('./strategies/discordStrategy')
const db = require('./database/database')

db.then(() => console.log('Connected to MongoDB')).catch(err => console.log(err))

//Routes
const authRoute = require('./routes/auth')
const dashboardRoute = require('./routes/dashboard')

app.use(cors())
app.use(express.json())

app.use(session({
    secret : 'some random secret',
    cookie : {
        maxAge: 60000 * 60 * 24
    },
    saveUninitialized: false,
    name: 'D&Discord.Discord.OAuth2'
}))



//Passport
app.use(passport.initialize())
app.use(passport.session())

//Middleware
app.use('/auth', authRoute)
app.use('/dashboard', dashboardRoute)

app.get('/', (req, res) => {
    res.send('Homepage')
})

app.listen(PORT, () => {
    console.log(`Now listening on port: ${PORT}`)
})