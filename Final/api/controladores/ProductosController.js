var ProductosModel = require("../modelos/ProductosModel.js").ProductosModel

var ProductosController ={}

const { response, request } = require("express")
const { text } = require("body-parser")



ProductosController.Guardar = function(request,response){
    var post = {
    nombre:request.body.nombre,
    categoria:request.body.categoria,
    presupuesto:request.body.presupuesto,
    descripcion:request.body.descripcion,
    }

    if (post.nombre == undefined || post.nombre == null || post.nombre.trim()=="") {
    response.json({state:false,mensaje:"el campo nombre es obligatorio"})    
    return false

    }

   


    ProductosModel.ValidarNombre(post,function(existe){
    if (existe.state == false) {
        response.json({state:false,mensaje:"dato ya registrado"})
        
    }
    else{
        ProductosModel.Guardar(post,function(resultado){
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

ProductosController.CargarTodas = function(request, response) {
    var post = {}
    ProductosModel.CargarTodas(post, function(respuesta) {
      response.json(respuesta)
    })
}

ProductosController.Actualizar = function(request,response){
    var post = {
        nombre:request.body.nombre,
        categoria:request.body.categoria,
        descripcion:request.body.descripcion
        }
    
        if (post.nombre == undefined || post.nombre == null || post.nombre.trim()=="") {
        response.json({state:false,mensaje:"elcampo nombre es obligatorio"})    
        return false
    
        }
        
        if (post.categoria == undefined || post.categoria == null || post.categoria.trim()=="") {
            response.json({state:false,mensaje:"elcampo categoria es obligatorio"})    
            return false
        
            }
    
        
        
        ProductosModel.Actualizar(post,function(respuesta){
            if (respuesta.state == false) {
                response.json({state:false,mensaje:"Se presentó un error al Actualizar"})
            }
            else{
                response.json({state:true,mensaje:"Se actualizó correctamente"})
            
            }
        })
}
ProductosController.Eliminar = function(request,response){
    var post = {
        id:request.body.id
        }

        if (post.id == undefined || post.id == null || post.id.trim()=="") {
            response.json({state:false,mensaje:"elcampo id es obligatorio"})    
            return false 
    
        }
        ProductosModel.Eliminar(post,function(respuesta){
            if (respuesta.state == false) {
                response.json({state:false,mensaje:"Se presentó un error al Eliminar"})
            }
            else{
                response.json({state:true,mensaje:"Se eliminó correctamente"})
            
            }
        })
}
ProductosController.CargarId = function(request, response) {
        
    var post = {        
        id:request.body.id
        
        }
    
        if (post.id == undefined || post.id == null || post.id.trim()=="") {
        response.json({state:false,mensaje:"elcampo id es obligatorio"})    
        return false    
        }    
        
    ProductosModel.CargarId(post, function(respuesta) {
      response.json(respuesta)
    })
}


module.exports.ProductosController = ProductosController