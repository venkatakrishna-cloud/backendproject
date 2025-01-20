const express = require("express")
const users = require("./queries/user")
const cors = require('cors')

const app = express()
require('dotenv').config()

app.use(express.urlencoded({extended: false}))
app.use(express.json({extended:false}))
app.use(cors({
    origin:  "http://localhost:3000",
    method:  ["GET", "POST", "PATCH", "DELETE"]
}))

app.use('/user', users);
app.listen(process.env.PORT, () => console.log("server has started...!"))



