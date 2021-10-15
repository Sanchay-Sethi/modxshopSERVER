const router = require("express").Router();
const User = require("../models/User")
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//Register
router.post("/register", async (req, res) => {
    const newUser = new User({
        firstname : req.body.firstname,
        lastname : req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET_KEY).toString(),
    });
    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
        console.log(savedUser);
    } catch (error) {
        res.status(500).json(error)
        console.log(error);
    } 
})

//Login
router.post("/login", async (req, res) => {
    try {    
        const user = await User.findOne({
            username: req.body.username
        })
        !user && res.status(401).json("Invalid Credentials")
        const hashPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET_KEY).toString(CryptoJS.enc.Utf8);
        hashPassword !== req.body.password && res.status(401).json("Invalid Credentials")
        //Create json web token for valid user authentication
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        }, process.env.JWT_SECRET_KEY, {expiresIn:"5d"})

        const {password, ...restDetails} = user._doc;
        res.status(200).json({...restDetails, accessToken}); 
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router;