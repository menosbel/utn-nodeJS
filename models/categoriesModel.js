const mongoose = require("../bin/mongodb");

const categorySchema = new mongoose.Schema({
    name:String
});

categorySchema.statics.findByIdAndValidate = async function(id) { // crear propio metodo. METHOD sobre el objeto y STATICS sobre la clase
    const document = await this.findById(id);
    if(!document){
        return{
            error:true,
            message:"No existe la categoría"
        }
    }
    return document;
}
module.exports = mongoose.model("categories", categorySchema)