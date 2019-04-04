require('dotenv').config()

const express = require('express')
const app = express()
const port = 3000
const user = require('./routes/user')
const cors = require('cors')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/hacktivgit', { useNewUrlParser: true })

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/users', user)

app.listen(port, () => {
  console.log(`listen on port ${port}`)
})