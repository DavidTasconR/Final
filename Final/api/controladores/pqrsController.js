var pqrsModel = require("../modelos/pqrsModel.js").pqrsModel

var pqrsController ={}

const { response, request } = require("express")



pqrsController.Guardar = function(request,response){
    var post = {
    nombre:request.body.nombre,
    telefono:request.body.telefono,
    mensaje:request.body.mensaje,
    correo:request.body.correo,
    }

    if (post.nombre == undefined || post.nombre == null || post.nombre.trim()=="") {
    response.json({state:false,mensaje:"elcampo nombre es obligatorio"})    
    return false

    }

        pqrsModel.Guardar(post,function(resultado){
            if (resultado.state == true) {
                response.json({state:true,mensaje:"Registro satisfactorio"})
            }
            else{
                response.json({state:false,mensaje:"UPS intenta mas tarde"})
            }
        })
    }


pqrsController.CargarTodas = function(request, response) {
    var post = {}
    pqrsModel.CargarTodas(post, function(respuesta) {
      response.json(respuesta)
    })
}

pqrsController.Actualizar = function(request,response){
    var post = {
        estado:request.body.estado,
        id:request.body.id
        }
    
        
        
        pqrsModel.Actualizar(post,function(respuesta){
            if (respuesta.state == false) {
                response.json({state:false,mensaje:"Se presentó un error al Actualizar"})
            }
            else{
                response.json({state:true,mensaje:"Se actualizó correctamente"})
            
            }
        })
}
pqrsController.Eliminar = function(request,response){
    var post = {
        id:request.body.id
        }

        if (post.id == undefined || post.id == null || post.id.trim()=="") {
            response.json({state:false,mensaje:"elcampo id es obligatorio"})    
            return false 
    
        }
        pqrsModel.Eliminar(post,function(respuesta){
            if (respuesta.state == false) {
                response.json({state:false,mensaje:"Se presentó un error al Eliminar"})
            }
            else{
                response.json({state:true,mensaje:"Se eliminó correctamente"})
            
            }
        })
}
pqrsController.CargarId = function(request, response) {
        
    var post = {        
        id:request.body.id
        
        }
    
        if (post.id == undefined || post.id == null || post.id.trim()=="") {
        response.json({state:false,mensaje:"elcampo id es obligatorio"})    
        return false    
        }    
        
    pqrsModel.CargarId(post, function(respuesta) {
      response.json(respuesta)
    })
}


module.exports.pqrsController = pqrsController