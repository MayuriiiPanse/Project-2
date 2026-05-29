const userModel = require('../models/auth.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function registerController(req,res){
    const{
        username,password
    } = req.body;

    const isuserExist = await userModel.findOne({
        username: username
    })
    if(isuserExist){
        return res.status(400).json({
            message:"User already exists"
        })
    }
    const user = await userModel.create({
        username,
        password: await bcrypt.hash(password, 10)
    })

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY);

    res.cookie('token',token);

    return res.status(201).json({
        message:"user registered successfully!"
    })

}


async function loginController(req,res){
    const {username,password} = req.body;

    const user = await userModel.findOne({
        username
    })

    if(!user){
        return res.status(400).json({
            message:"user not found"
        })
    }

    const ispasswordValid = await bcrypt.compare(password, user.password);

    if(!ispasswordValid){
        return res.status(400).json({
            message:"Invalid Password"
        })
    }

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET_KEY);

    res.cookie('token',token);

    return res.status(200).json({
        message:"Login successful!"
    })

}


module.exports = {
    registerController, 
    loginController
};