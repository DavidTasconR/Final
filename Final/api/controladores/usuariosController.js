var usuariosModel = require("../modelos/ususariosModel.js").usuariosModel

var usuariosController ={}

const { response, request } = require("express")



usuariosController.Guardar = function(request,response){
    var post = {
    nombre:request.body.nombre,
    email:request.body.email,
    password:request.body.password,
    rol:request.body.rol,
    }

    if (post.nombre == undefined || post.nombre == null || post.nombre.trim()=="") {
    response.json({state:false,mensaje:"elcampo nombre es obligatorio"})    
    return false

    }

    if (post.email == undefined || post.email == null || post.email.trim()=="") {
    response.json({state:false,mensaje:"elcampo email es obligatorio"})    
    return false

    }

    if (post.password == undefined || post.password == null || post.password.trim()=="") {
        response.json({state:false,mensaje:"elcampo password es obligatorio"})    
        return false 

    }
    if (post.rol == undefined || post.rol == null || post.rol.trim()=="") {
        response.json({state:false,mensaje:"elcampo rol es obligatorio, Cliente o Proveedor"})    
        return false 

    }


    usuariosModel.ValidarEmail(post,function(existe){
    if (existe.state == false) {
        response.json({state:false,mensaje:"Usuario ya registrado"})
        
    }
    else{
        usuariosModel.Guardar(post,function(resultado){
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

usuariosController.CargarTodas = function(request, response) {
    var post = {}
    usuariosModel.CargarTodas(post, function(respuesta) {
      response.json(respuesta)
    })
}

usuariosController.Actualizar = function(request,response){
    var post = {
        nombre:request.body.nombre,
        email:request.body.email,
        password:request.body.password,
        id:request.body.id,
        rol:request.body.rol
        }
    
        if (post.nombre == undefined || post.nombre == null || post.nombre.trim()=="") {
        response.json({state:false,mensaje:"elcampo nombre es obligatorio"})    
        return false
    
        }
        
        if (post.rol == undefined || post.rol == null || post.rol.trim()=="") {
            response.json({state:false,mensaje:"elcampo rol es obligatorio"})    
            return false
        
            }
    
        if (post.email == undefined || post.email == null || post.email.trim()=="") {
        response.json({state:false,mensaje:"elcampo email es obligatorio"})    
        return false
    
        }
    
        if (post.password == undefined || post.password == null || post.password.trim()=="") {
            response.json({state:false,mensaje:"elcampo password es obligatorio"})    
            return false 
    
        }
        
        usuariosModel.Actualizar(post,function(respuesta){
            if (respuesta.state == false) {
                response.json({state:false,mensaje:"Se presentó un error al Actualizar"})
            }
            else{
                response.json({state:true,mensaje:"Se actualizó correctamente"})
            
            }
        })
}
usuariosController.Eliminar = function(request,response){
    var post = {
        id:request.body.id
        }

        if (post.id == undefined || post.id == null || post.id.trim()=="") {
            response.json({state:false,mensaje:"elcampo id es obligatorio"})    
            return false 
    
        }
        usuariosModel.Eliminar(post,function(respuesta){
            if (respuesta.state == false) {
                response.json({state:false,mensaje:"Se presentó un error al Eliminar"})
            }
            else{
                response.json({state:true,mensaje:"Se eliminó correctamente"})
            
            }
        })
}
usuariosController.CargarId = function(request, response) {
        
    var post = {        
        id:request.body.id
        
        }
    
        if (post.id == undefined || post.id == null || post.id.trim()=="") {
        response.json({state:false,mensaje:"elcampo id es obligatorio"})    
        return false    
        }    
        
    usuariosModel.CargarId(post, function(respuesta) {
      response.json(respuesta)
    })
}

usuariosController.login = function(request, response) {
        
    var post = {        
        email:request.body.email,
        password:request.body.password,
        rol:request.body.rol
        
        }
    
        if (post.email == undefined || post.email == null || post.email.trim()=="") {
        response.json({state:false,mensaje:"elcampo email es obligatorio"})    
        return false    
        }    
        
        if (post.password == undefined || post.password == null || post.password.trim()=="") {
            response.json({state:false,mensaje:"elcampo password es obligatorio"})    
            return false    
            }    
            
    usuariosModel.login(post, function(respuesta) {
        if(respuesta.state == false){
      response.json({state:false,mensaje:"Ups lo siento algo no va bien :("})
        }else{
            if (respuesta.datos.length == 0) {
                response.json({state:false,mensaje:"Usuario o contraseña inválidos"})
            }else{
                console.log(respuesta.datos[0])
                request.session.nombre = respuesta.datos[0].nombre
                request.session.email = respuesta.datos[0].email
                request.session.rol = respuesta.datos[0].rol
                response.json({state:true,nombre:respuesta.datos[0].nombre,rol:respuesta.datos[0].rol,mensaje:"sessión iniciada"})
                
            }
        }
    })
}



module.exports.usuariosController = usuariosController