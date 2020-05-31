const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const path = require('path')
const PORT = process.env.PORT||5050
const app = express()
const bodyParser =require('body-parser')
const cookieParser = require('cookie-parser')
const db = require('./config/keys')
const userRoutes = require('./routes/api')

mongoose.connect(db.MONGODB_URI, {useCreateIndex: true, useNewUrlParser:true, 
useUnifiedTopology:true , useFindAndModify:false}, () => {console.log('DB connected..!')})


// app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(morgan('tiny'))


app.use('/api', userRoutes)


app.listen(PORT, () => console.log(`Server start on port: ${PORT}`))