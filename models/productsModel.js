const mongoose = require("../bin/mongodb"); // leer docu de mongoose
const errorMessage = require("../util/errorMessage")

const tagsSchema = new mongoose.Schema({
    name:String
})

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, errorMessage.GENERAL.campo_obligatorio],
        minlength:[1, errorMessage.GENERAL.minlength],
        maxlength:[10, errorMessage.GENERAL.maxlength],
    },
    sku:{
        type:String,
        unique:true,
        index:true
    },
    description:String,
    price:{
        type:Number,
        required:[true, errorMessage.GENERAL.campo_obligatorio],
        get:function(price){
            return price*1.21
        },
    },
    category:{
        type:mongoose.Schema.ObjectId,
        ref:"categories" // la colección
    },
    tags:[tagsSchema],
    destacado:{
        type:Boolean,
        required:true
    }
})

productSchema.virtual("price_currency").get(function(){
    return '$'+this.price
})
productSchema.set("toJSON", {getters:true,virtuals:true}) //getter modifica cuando lo muestra, setter modifica en db cdo lo inserta
productSchema.plugin(mongoose.mongoosePaginate);
module.exports = mongoose.model("products", productSchema)