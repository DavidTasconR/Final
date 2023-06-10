var ProductosModel = {}

const mongoose = require("mongoose")
const Schema = mongoose.Schema

var ProductosSchema = new Schema({
nombre:String,
categoria:String,
presupuesto:String,
descripcion:String
})

const MyModel = mongoose.model("Productos",ProductosSchema)

ProductosModel.ValidarNombre = function(post,callback){

MyModel.find({nombre: post.nombre},{nombre:1,_id:0},(error,documento) =>{
    if (error) {
        console.log(error)
        return callback({state:false})
    }
    else{
        if(documento.length == 0){
            return callback({state:true})
        }
        else{
            return callback({state:false})
        }
    }
})
}

ProductosModel.Guardar = function(post,callback){
    const instancia = new MyModel
    instancia.nombre = post.nombre
    instancia.categoria = post.categoria
    instancia.presupuesto = post.presupuesto
    instancia.descripcion = post.descripcion

    instancia.save((error,_creado) => {
        if(error){
            console.log(error)
            return callback({state:false})
        }
        else{
            return callback({state:true})
        }
    })
}

ProductosModel.CargarTodas = function(post,callback){
       MyModel.find({},{nombre:1,_id:1,categoria:1,presupuesto:1,descripcion:1},(error,documentos) => {
        if(error){
            console.log(error)
            return callback({state:false})
        }
        else{
            return callback({state:true,datos:documentos})
        }
    })
}

ProductosModel.CargarId = function(post,callback){
    MyModel.find({_id:post.id},{nombre:1,_id:1,rol:1,presupuesto:1,descripcion:1},(error,documentos) => {
     if(error){
         console.log(error)
         return callback({state:false})
     }
     else{
         return callback({state:true,datos:documentos})
     }
 })
}

ProductosModel.Actualizar = function(post,callback){
    MyModel.findByIdAndUpdate(post.id,
        {   nombre:post.nombre,
            categoria:post.categoria
        },(error,respuesta) =>{
            if(error){
                console.log(error)
                return callback({state:false})
            }
            else{
                return callback({state:true})
            }
        })
}

ProductosModel.Eliminar = function(post,callback){
    MyModel.findByIdAndDelete(post.id,(error,respuesta) =>{
        if(error){
            console.log(error)
            return callback({state:false})
        }
        else{
            return callback({state:true})
        }
    })
}

module.exports.ProductosModel = ProductosModel