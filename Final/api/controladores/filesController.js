const multer = require("multer")

var filesController = {}

filesController.SubirArchivos = function(request,response){
    var post = {}
    post.nombre = request.params.id + '.png'
    post.carpeta = request.params.carpeta
    post.extensiones = [".png",".jpeg",".gif", ".jpg"]

var upload = multer({
    storage: multer.diskStorage({
        destination: function(req,file,callback){
            callback(null, appRoot + '/' + post.carpeta)
        },
        filename: function(req,file,callback){
            callback(null,post.nombre)
        }
    }),
limits: {fileSize: 1048576}, //10Mb
fileFilter: function(request,file,callback){
    console.log(file.originalname)
    var ext = path.extname(file.originalname)
    var existe = post.extensiones.indexOf(ext)
    if (existe < 0) {
        console.log("Permiso de escritura: Denegado")
        return callback({state:false,mensaje:"solo soporta los siguientes formatos: " + post.extensiones.join(" | ")},null)
    }

console.log("permiso concedido")

return callback(null,true)

}

}).single("userFile")


upload(request,response,function(err){

if (err) {
    console.log(err)
    response.json(err)
}
else{
    console.log('OK')
    response.json({state:true,mensaje:"Archivo Cargado"})
}


})


}
filesController.SubirPdf = function(request,response){
    var post = {}
    post.nombre = request.params.id + '.pdf'
    post.carpeta = request.params.carpeta
    post.extensiones = [".pdf"]

var upload = multer({
    storage: multer.diskStorage({
        destination: function(req,file,callback){
            callback(null, appRoot + '/' + post.carpeta)
        },
        filename: function(req,file,callback){
            callback(null,file.originalname)
        }
    }),
limits: {fileSize: 1048576}, //10Mb
fileFilter: function(request,file,callback){
    var ext = path.extname(file.originalname)
    var existe = post.extensiones.indexOf(ext)
    if (existe < 0) {
        console.log("Permiso de escritura: Denegado")
        return callback({state:false,mensaje:"solo soporta los siguientes formatos: " + post.extensiones.join(" | ")},null)
    }

console.log("permiso concedido")

return callback(null,true)

}

}).single("userFile")


upload(request,response,function(err){

if (err) {
    console.log(err)
    response.json(err)
}
else{
    console.log('OK')
    response.json({state:true,mensaje:"Archivo Cargado"})
}


})


}

module.exports.filesController = filesController