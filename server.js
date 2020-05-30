const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const path = require('path')
const PORT = process.env.PORT||5050
const app = express()

const db = require('./dev')

mongoose.connect(db.MONGODB_URI, {useNewUrlParser:true, useUnifiedTopology:true , useFindAndModify:false})
.then(()=>console.log('MongoDB connected'))
.catch(err=>console.log('Error: ', err))


app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('tiny'))




app.listen(PORT, console.log(`Server start on port: ${PORT}`))