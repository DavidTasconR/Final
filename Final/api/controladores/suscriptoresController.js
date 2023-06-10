var suscriptoresModel = require("../modelos/suscriptoresModel.js").suscriptoresModel

var suscriptoresController ={}

const { response, request } = require("express")



suscriptoresController.Guardar = function(request,response){
    var post = {
    nombre:request.body.nombre,
    categoria:request.body.categoria,
    }

    if (post.nombre == undefined || post.nombre == null || post.nombre.trim()=="") {
    response.json({state:false,mensaje:"elcampo nombre es obligatorio"})    
    return false

    }

   


    suscriptoresModel.ValidarNombre(post,function(existe){
    if (existe.state == false) {
        response.json({state:false,mensaje:"dato ya registrado"})
        
    }
    else{
        suscriptoresModel.Guardar(post,function(resultado){
            if (resultado.state == true) {
                response.json({state:true,mensaje:"Registro satisfactorio"})
            }
            else{
                response.json({state:false,mensaje:"UPS intenta mas tarde"})
            }
        })
    }
})
}

suscriptoresController.CargarTodas = function(request, response) {
    var post = {}
    suscriptoresModel.CargarTodas(post, function(respuesta) {
      response.json(respuesta)
    })
}

suscriptoresController.Actualizar = function(request,response){
    var post = {
        nombre:request.body.nombre,
        categoria:request.body.categoria,
        rol:request.body.rol
        }
    
        if (post.nombre == undefined || post.nombre == null || post.nombre.trim()=="") {
        response.json({state:false,mensaje:"elcampo nombre es obligatorio"})    
        return false
    
        }
        
        if (post.categoria == undefined || post.categoria == null || post.categoria.trim()=="") {
            response.json({state:false,mensaje:"elcampo categoria es obligatorio"})    
            return false
        
            }
    
        
        
        suscriptoresModel.Actualizar(post,function(respuesta){
            if (respuesta.state == false) {
                response.json({state:false,mensaje:"Se presentó un error al Actualizar"})
            }
            else{
                response.json({state:true,mensaje:"Se actualizó correctamente"})
            
            }
        })
}
suscriptoresController.Eliminar = function(request,response){
    var post = {
        id:request.body.id
        }

        if (post.id == undefined || post.id == null || post.id.trim()=="") {
            response.json({state:false,mensaje:"elcampo id es obligatorio"})    
            return false 
    
        }
        suscriptoresModel.Eliminar(post,function(respuesta){
            if (respuesta.state == false) {
                response.json({state:false,mensaje:"Se presentó un error al Eliminar"})
            }
            else{
                response.json({state:true,mensaje:"Se eliminó correctamente"})
            
            }
        })
}
suscriptoresController.CargarId = function(request, response) {
        
    var post = {        
        id:request.body.id
        
        }
    
        if (post.id == undefined || post.id == null || post.id.trim()=="") {
        response.json({state:false,mensaje:"elcampo id es obligatorio"})    
        return false    
        }    
        
    suscriptoresModel.CargarId(post, function(respuesta) {
      response.json(respuesta)
    })
}


module.exports.suscriptoresController = suscriptoresController