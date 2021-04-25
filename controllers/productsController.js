const productsModel = require("../models/productsModel");
const categoryModel = require("../models/categoriesModel")
module.exports = {
    getAll: async function(req, res, next) {
        try {
            let queryFind={};
            if(req.query.buscar){
                queryFind={name:{$regex:".*"+req.query.buscar+".*",$options:"i"}}
            }
            const productos = await productsModel.find({queryFind}).populate('category').select("price name description"); // select de los campos que quiero que traiga
            res.json(productos);
        } catch (e) {
            next(e)
        }
      },

    getDestacados: async function(req,res,next) {
        try{
            const productos = await productsModel.find({"destacado":true});
            if (productos.length > 4) {
                const productos_new = productos.slice(0,4)
                res.json(productos_new)
            } else {
                res.json(productos)
            }
        } catch(e) {
            next(e)
        }
    },

    getAllPaginate: async function(req, res, next) {
    try {
        let queryFind={};
        if(req.query.buscar){
            queryFind={name:{$regex:".*"+req.query.buscar+".*",$options:"i"}}
        }
        const productos = await productsModel.paginate(queryFind, {
            sort:{name:1},
            populate:"category",
            limit:req.query.limit || 3,
            page:req.query.page || 1
        })
        res.json(productos);
    } catch (e) {
        next(e)
    }
    },

    getById: async function(req, res, next) {
        // console.log(req.params.id)
        try {
            const producto = await productsModel.findById(req.params.id);
            res.json(producto);
        } catch (e) {
            next(e)
        }
      },

    getByTags: async function(req,res,next) {
        try{
            const producto = await productsModel.findOne({"tags._id":req.params.id});
            res.json(producto);
        } catch(e){
            next(e)
        }
    },

    create: async function(req, res, next) {
        console.log(req.body)
        try {
            const categoria = await categoryModel.findByIdAndValidate(req.body.category);
            if(categoria.error){
                res.json(categoria);
                return;
            }
            const producto = new productsModel({
                name:req.body.name,
                sku:req.body.sku,
                description:req.body.description,
                price:req.body.price,
                category:req.body.category,
                tags:req.body.tags,
                destacado:req.body.destacado
            })
            const prod = await producto.save()
            res.json(prod);
        } catch (e) {
            next(e)
        }
    },

    update: async function(req, res, next) {
        try {
            let producto = await productsModel.updateOne({_id: req.params.id}, req.body, {multi:false})
            res.json(producto)
        } catch(e) {
            next(e)
        }
    },

    delete: async function(req, res, next) {
        try {
            let producto = await productsModel.deleteOne({_id: req.params.id})
            res.json(producto)
        } catch(e) {
            next(e)
        }
    }
}