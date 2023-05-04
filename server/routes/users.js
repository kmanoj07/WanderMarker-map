const router = require("express").Router()

const User = require("../models/User")
const bcrypt = require("bcrypt")

//Regiset user -- User Creation
router.post("/register", async (req, res) => {

    try  {

       // Generate hashed password
       const salt = await bcrypt.genSalt(10)
       const cryptedPass = await bcrypt.hash(req.body.password, salt)

       // Creating user
       const newUser = new User({
            userName:req.body.userName,
            email: req.body.email,
            password: cryptedPass
        })

       // Push the user to db
       const userSaved = await newUser.save()
       console.log("\x1b[42m%s\x1b]", "[SUCCESS] User added to DB !\n")
       res.status(200).json(userSaved._id)
    
    } catch (err) {
        console.log("\x1b[41m%s\x1b]", "{FAILED} Adding User to DB !\n")
        res.status(500).json(err)
    }

})

// Login
router.post("/login", async (req, res) => {
    try {
        //find the user if exists in db
        const user = await User.findOne({userName: req.body.userName})

        if(!user){
            console.log("\x1b[41m%s\x1b]", "{FAILED} Login to user !\n")
            res.status(400).json("Wrong username or password!")
        }
        else {
            // validated password
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            if(!validPassword) {
                console.log("\x1b[41m%s\x1b]", "{FAILED} Login to user !\n")
                res.status(400).json("Wrong username or password!")
            } else {
                console.log("\x1b[42m%s\x1b]", "{SUCCESS} Login to user !\n")
                res.status(200).json(user)
            }        
        }

    }
    catch(err) {
        console.log("\x1b[41m%s\x1b]", "{FAILED} Login to user !\n")
        res.json(500).json(err)    
    }
})

module.exports = router
