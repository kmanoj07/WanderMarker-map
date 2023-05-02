const express = require('express')
const mongoose = require('mongoose')
const env = require("dotenv")

const pinRoute = require("./routes/pins")
const userRoute = require("./routes/users")

env.config()

const application = express()
application.use(express.json())

/* mongoose connect to mongodb  */
mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    .then(()=> {
        console.log("\x1b[42m%s\x1b]", "{success} Mongo DB connected !\n")
    })
    .catch((err) => console.log("\x1b[41m%s\x1b]", "{FAILED} Connection to Mongo DB\n")) 

application.use("/api/pins", pinRoute)
application.use("/api/users", userRoute)



application.listen(7800, ()=>{
    // console.log('listening to port 7000')
    console.log("\x1b[42m%s\x1b]", "{success} Backend server started\n")
})



