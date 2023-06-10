var suscriptoresModel = {}

const mongoose = require("mongoose")
const Schema = mongoose.Schema

var suscriptoresSchema = new Schema({
nombre:String,
categoria:String
})

const MyModel = mongoose.model("suscriptores",suscriptoresSchema)

suscriptoresModel.ValidarNombre = function(post,callback){

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

suscriptoresModel.Guardar = function(post,callback){
    const instancia = new MyModel
    instancia.nombre = post.nombre
    instancia.categoria = post.categoria

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

suscriptoresModel.CargarTodas = function(post,callback){
       MyModel.find({},{nombre:1,_id:1,categoria:1},(error,documentos) => {
        if(error){
            console.log(error)
            return callback({state:false})
        }
        else{
            return callback({state:true,datos:documentos})
        }
    })
}

suscriptoresModel.CargarId = function(post,callback){
    MyModel.find({_id:post.id},{nombre:1,_id:1,rol:1},(error,documentos) => {
     if(error){
         console.log(error)
         return callback({state:false})
     }
     else{
         return callback({state:true,datos:documentos})
     }
 })
}

suscriptoresModel.Actualizar = function(post,callback){
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

suscriptoresModel.Eliminar = function(post,callback){
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

module.exports.suscriptoresModel = suscriptoresModel