const express = require ('express')
const colors = require ('colors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')
const port = process.env.PORT || 5000
const {errorHandler} = require('./MiddleWare/ErrorHandler')


connectDB()

const app = express()
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });



app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/items', require('./routes/Itemroutes'))
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`serever started on ${port}`))