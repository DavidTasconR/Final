const session = require("express-session")

var usuariosController = require("./api/controladores/usuariosController.js").usuariosController

 var ADministradorylogin = function(request,response,next){
    console.log('------------:v------:v')
    if (request.session.rol == undefined) {
        response.json({state:false,error:true,mensaje:"Para hacer uso de esta session debes loguearte"})        
        return false
    }
    if (request.session.rol != "Administrador") {
        response.json({state:false,error:true,mensaje:"te falta nivel papu"})
    return false



    }
    next()
}

app.post('/Usuario/Guardar', function(request, response){
usuariosController.Guardar(request, response)
})

app.post('/Usuario/CargarTodas', function(request, response){
    usuariosController.CargarTodas(request, response)
})

app.post('/Usuario/Actualizar',ADministradorylogin, function(request, response){
    usuariosController.Actualizar(request, response) 
})

app.post('/Usuario/Eliminar',ADministradorylogin, function(request, response){
    usuariosController.Eliminar(request, response)
})

app.post('/Usuario/CargarId',ADministradorylogin, function(request, response){
    usuariosController.CargarId(request, response)
})

app.post('/midata', function(request, response){
   response.json({nombre:request.session.nombre,rol:request.session.rol})
})

app.post('/Usuario/login', function(request, response){
    usuariosController.login(request, response)
})

app.post('/state', function(request, response){
    response.json(request.session)
})
app.post('/Usuario/Logout', function(request, response){
    request.session.destroy()
    response.json({state:true,mensaje:"Hasta la vista bby B|"})
})



// productos


var ProductosController = require("./api/controladores/ProductosController.js").ProductosController


app.post('/Producto/Guardar', function(request, response){
ProductosController.Guardar(request, response)
})

app.post('/Producto/CargarTodas', function(request, response){
    ProductosController.CargarTodas(request, response)
})

app.post('/Producto/Actualizar', function(request, response){
    ProductosController.Actualizar(request, response) 
})

app.post('/Producto/Eliminar', function(request, response){
    ProductosController.Eliminar(request, response)
})

app.post('/Producto/CargarId', function(request, response){
    ProductosController.CargarId(request, response)
})

 //imagenes y archivos

var filesController = require("./api/controladores/filesController.js").filesController

app.get('/files/:carpeta/:id', function(request, response){
filesController.SubirArchivos(request, response)
})
app.get('/filesPdf/:carpeta/:id', function(request, response){
filesController.SubirPdf(request, response)
})




//suscriptores

var suscriptoresController = require("./api/controladores/suscriptoresController.js").suscriptoresController


app.post('/suscriptores/Guardar', function(request, response){
suscriptoresController.Guardar(request, response)
})

app.post('/suscriptores/CargarTodas', function(request, response){
    suscriptoresController.CargarTodas(request, response)
})

app.post('/suscriptores/Actualizar', function(request, response){
    suscriptoresController.Actualizar(request, response) 
})

app.post('/suscriptores/Eliminar', function(request, response){
    suscriptoresController.Eliminar(request, response)
})

app.post('/suscriptores/CargarId', function(request, response){
    suscriptoresController.CargarId(request, response)
})


//PQR
var pqrsController = require("./api/controladores/pqrsController.js").pqrsController


app.post('/pqrs/Guardar', function(request, response){
pqrsController.Guardar(request, response)
})

app.post('/pqrs/CargarTodas', function(request, response){
    pqrsController.CargarTodas(request, response)
})

app.post('/pqrs/Actualizar', function(request, response){
    pqrsController.Actualizar(request, response) 
})

app.post('/pqrs/Eliminar', function(request, response){
    pqrsController.Eliminar(request, response)
})

app.post('/pqrs/CargarId', function(request, response){
    pqrsController.CargarId(request, response)
})
