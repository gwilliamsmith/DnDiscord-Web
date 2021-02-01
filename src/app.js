require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001

app.get('/', (req, res) =>{
    res.send(`Hello world!`)
})

app.listen(PORT, () => {
    console.log(`Now listening on port: ${PORT}`)
})