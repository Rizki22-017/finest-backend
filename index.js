const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const {testconnection} = require('./database/db')
const  Router  = require('./routes/index.js')

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use(Router)

//write here
app.get('/', (req,res)=>{
    return res.status(200).json({msg:"Muncul"})
})

app.listen(process.env.APP_PORT, async ()=>{
    await testconnection()
    console.log(`Server is running on http://localhost:${process.env.APP_PORT}`)
})