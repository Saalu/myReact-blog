const express =require('express')
const router = express.Router()

const User = require('../models/user')
const auth = require('../middleware/auth')

//=========Get Authenticated User   ==========
router.get('/api/user/auth', auth, (req,res) => {
    res.status(200).json({
        _id:req._id,
        isAuth:true,
        email:req.user.email,
        name:req.user.name,
        lastname:req.user.lastname,
        role:req.user.role
    })  
})

//=========Fetch All Users   ==========
router.get('/users', async (req,res) => {
    try {
        const user = await User.find()
        res.json(user)
    } catch (err) {
        res.json(err)
    }
})


//=========Update a User info   ==========
router.put('/:id', async (req,res) => {
    const userInfo = {
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        lastname: req.body.lastname
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set:userInfo}, {new:true})
        res.json(updatedUser)
    } catch (err) {
        res.json(err)
    }
})

//=========Delete a User  ==========
router.delete('/:id', async (req,res) => {
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id)
        res.json(deleteUser)
    } catch (err) {
        res.json(err)
    }
})

//=========Register Users   ==========
router.post('/users/register', async (req,res) => {
    const user = new User(req.body)
    try {
        const savedUser = await user.save()
        res.json(savedUser)
    } catch (err) {
        res.json(err)
    }
})

//========= User Login   ==========
router.post('/user/login', (req,res) =>{
    //find the email
    User.findOne({email: req.body.email}, (err, user) => {
        if(!user)
        return res.json({
            loginSuccess:false, 
            message: "Auth failed, email not found"
        })
        //=comparePassword=//
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch){
            return res.json({loginSuccess:false, message: "Auth failed, password not found"})
            }
        })
        //=generateToken=//
        user.generateToken((err, user) => {
            if(err) return res.status(400).send(err);
            res.cookie('x_auth', user.token)
                .status(200)
                .json({
                    loginSuccess: true
                })
        })
    })

})

router.get('/user/logout', auth, (req,res) =>{
    User.findOneAndUpdate({_id: req.user._id}, {token:""}, (err, doc) =>{
        if(err) return res.json({success: false, err})
        return res.status(200).send({
            success:true
        })
    })
})

module.exports = router
