const mongoose = require("../bin/mongodb");
const errorMessage = require("../util/errorMessage")
const validators = require("../util/validators")
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, errorMessage.GENERAL.campo_obligatorio]
    },
    email:{
        type:String,
        required:[true, errorMessage.GENERAL.campo_obligatorio],
        unique:true,
        validate:{
            validator: function(v){
                return validators.emailValidate(v)
            },
            message: errorMessage.USERS.emailIncorrect
        }
    },
    password:{
        type:String,
        required:[true, errorMessage.GENERAL.campo_obligatorio],
        validate:{
            validator: function(v){
                return validators.isGoodPassword(v)
            },
            message: errorMessage.USERS.passwordIncorrect
        }
    }
});

userSchema.pre("save", function(next){ // pre previo al guardaro, post es dsp del guardado
    this.password = bcrypt.hashSync(this.password,10);
    next();
})

userSchema.statics.findByIdAndValidate = async function(id) { // crear propio metodo. METHOD sobre el objeto y STATICS sobre la clase
    const document = await this.findById(id);
    if(!document){
        return{
            error:true,
            message:"No existe el usuario"
        }
    }
    return document;
}
module.exports = mongoose.model("users", userSchema)