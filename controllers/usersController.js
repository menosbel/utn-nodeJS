const usersModel = require("../models/usersModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports = {
    create: async function (req,res,next) {
        try {
            console.log(req.body);
            const user = new usersModel({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            const document = await user.save();
            res.json(document);
        } catch(e){
            res.json({message:e.message})
        }
    },

    getAll: async (req,res,next) => {
        console.log(req.query)
        const user = await usersModel.find({});
        res.json(user);
    },

    login: async (req,res,next) => {
        try {
            const user = await usersModel.findOne({email:req.body.email})
            if (!user){
                res.json({error:true, message:"Email incorrecto"})
                return
            }
            if(bcrypt.compareSync(req.body.password, user.password)){
                const token = jwt.sign({userId:user._id}, req.app.get("secretKey"),{expiresIn:"1h"})
                res.json({error:false, message:"Login ok", token:token})
                return
            } else {
                res.json({error:true, message:"Contraseña incorrecta"})
                return
            }
        }catch(e){
            res.json({message:e.message})
        }
    }
}