var pqrsModel = {}

const mongoose = require("mongoose")
const Schema = mongoose.Schema

var pqrsSchema = new Schema({
nombre:String,
telefono:String,
correo:String,
mensaje:String,
estado:String
})

const MyModel = mongoose.model("pqrs",pqrsSchema)



pqrsModel.Guardar = function(post,callback){
    const instancia = new MyModel
    instancia.nombre = post.nombre
    instancia.telefono = post.telefono
    instancia.mensaje = post.mensaje
    instancia.estado = post.estado
    instancia.correo = "Abierto"
    

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

pqrsModel.CargarTodas = function(post,callback){
       MyModel.find({},{nombre:1,correo:1,_id:1,mensaje:1},(error,documentos) => {
        if(error){
            console.log(error)
            return callback({state:false})
        }
        else{
            return callback({state:true,datos:documentos})
        }
    })
}

pqrsModel.CargarId = function(post,callback){
    MyModel.find({_id:post.id},{nombre:1,correo:1,mensaje:1,estado:1,_id:1,telefonol:1},(error,documentos) => {
     if(error){
         console.log(error)
         return callback({state:false})
     }
     else{
         return callback({state:true,datos:documentos})
     }
 })
}

pqrsModel.Actualizar = function(post,callback){
    MyModel.findByIdAndUpdate(post.id,
        {   estado: post.estado
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

pqrsModel.Eliminar = function(post,callback){
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

module.exports.pqrsModel = pqrsModel