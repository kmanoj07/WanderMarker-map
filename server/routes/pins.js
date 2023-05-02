const router = require("express").Router()

const Pin = require('../models/Pin')

// Creating a pin.
router.post("/", async(req, res) => {
    const pinCandidate = new Pin(req.body)
    
    try {
        const savedPin = await pinCandidate.save()
        res.status(200).json(savedPin)
        console.log("\x1b[42m%s\x1b]", "[SUCCESS] Pin added to DB !\n")

    } catch(err) {
        console.log("\x1b[41m%s\x1b]", "{FAILED} Adding Pin to DB !\n")
        res.status(500).json(err)
    }
}) 

// Get all pins.
router.get("/", async (req, res) => {

    try {
        const pins = await Pin.find()
        console.log("\x1b[42m%s\x1b]", "[SUCCESS] Finding all pins !\n")
        res.status(200).json(pins)
    } catch (err) {
        console.log("\x1b[41m%s\x1b]", "{FAILED} Finding all pins !\n")
        res.status(500).json(err)
    }
})

module.exports = router