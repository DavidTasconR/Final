var usuariosModel = require("../modelos/ususariosModel.js").usuariosModel

var usuariosController ={}
const nodemailer = require("nodemailer")

const { response, request } = require("express")
const { text } = require("body-parser")



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

            var transporter = nodemailer.createTransport({
                host:"smtp.gmail.com",
                port:587,
                secure:false,
                requireTLS:true,
                auth:{
                    user:config.correogmail,
                    pass:config.passgmail
                    //en password de config se colocará la clave de google que solo muestra una vez 
                }
            });

        var mailOptions = {
                from:config.correogmail,
                to:post.email,
                subject :"Activar cuenta",
                html:`html:<div style="font-family: Arial, sans-serif;line-height: 1.6;background-color: #4CAF50;margin: 0;padding: 42px;">

                <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                  <h1 style="font-size: 24px; color: #333333; margin-bottom: 20px;">Activación de cuenta</h1>
                  <p>Hola,</p>
                  <p>Gracias por registrarte en nuestro sitio. Para activar tu cuenta, haz clic en el siguiente enlace:</p>
                  <p><a style="display: inline-block; padding: 10px 20px; background-color: #337ab7; color: #ffffff; text-decoration: none; border-radius: 3px;" href="http://localhost:4200/activarcuenta/${post.email}/${resultado.azar}">Activar cuenta</a></p>
                  <p>Si el enlace no funciona, copia y pega la siguiente URL en tu navegador:</p>
                  <p>http://localhost:4200/activarcuenta/${post.email}/${resultado.azar}</p>
                  <p>Si no has creado una cuenta en nuestro sitio, puedes ignorar este correo electrónico.</p>
                  <p>Saludos,</p>
                  <p>El equipo de [Troubleless]</p>
                </div>
              
              </div>`
        }


        transporter.sendMail(mailOptions,(error,info)=> {
            if (error) {
                console.log(error)
                response.json(error)
            }
                console-log(info)
                response.json(    response.json({state:true,mensaje:"Registro satisfactorio"})
                )

        })

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


usuariosController.ActivarCuenta = function(request, response) {
        
    var post = {        
        email:request.body.email,
       codigo:request.body.codigo
        
        }
    
        if (post.email == undefined || post.email == null || post.email.trim()=="") {
        response.json({state:false,mensaje:"elcampo email es obligatorio"})    
        return false    
        }    
        
        if (post.codigo == undefined || post.codigo == null || post.codigo.trim()=="") {
            response.json({state:false,mensaje:"elcampo codigo es obligatorio"})    
            return false    
            }    
            
usuariosModel.ValidarEstado(post,function(estadoactual){
console.log(estadoactual)

if(estadoactual.datos[0].estado == 1){
    response.json({state:false,mensaje:"cuenta ya activada inicie session "})
    return false
}

usuariosModel.ActivarCuenta(post, function(respuesta) {
    if(respuesta.state == null){
  response.json({state:false,mensaje:"Por favor valide los datos"})
    }else{
            response.json({state:true,mensaje:"cuenta validada correctamente "})
        
    }
})
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
            
usuariosModel.ValidarEstado(post,function(estadoactual){
console.log(estadoactual)

if(estadoactual.datos[0].estado == 0){
    response.json({state:false,mensaje:"Debe activar la cuenta"})
    return false
}

    
})
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