const express = require("express")
const app = express()
const {connection}= require('./src/db/connection')
require('dotenv').config()
const port = process.env.PORT
const r = require('./src/routers/enterprise.router')

connection()
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use('/api', r)


app.listen(port, () =>{
    console.log(`el servidor funciona en el puerto: ${port}`)
})
