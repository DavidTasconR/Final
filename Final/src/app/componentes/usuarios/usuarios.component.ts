import { Component, OnInit } from '@angular/core';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionService } from 'src/app/servicios/peticion.service';

declare var $:any

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  constructor(private peticion:PeticionService, private msg:MensajesService){

  }


  nombre:string = ""
  email:string = ""
  password:string = ""
  rol:string = ""
  datos:any[] =[]
  id:string = ""


     ngOnInit(){
  this.CargarTodas()
    }

     Nuevo(){
    $('#exampleModal').modal('show')
    this.id = ""
    this.nombre=""
    this.email=""
    this.password=""
    }

     Eliminar(id:string){
    console.log(id)
    var post = {
      host:this.peticion.urllocal,
      path:"/Usuario/Eliminar",
      payload: {
        id:id
      }
    }

    this.peticion.Post(post.host + post.path,post.payload).then((res:any) =>{
     console.log(res)
     if (res.state == false) {
      this.msg.Load(res.mensaje,"danger",5000)
    }else{
      this.msg.Load(res.mensaje,"success",5000) 
      this.CargarTodas()
      }

    })
    }

     CargarTodas(){

    var post = {
      host:this.peticion.urllocal,
      path:"/Usuario/CargarTodas",
      payload: {
      
      }
    }

    this.peticion.Post(post.host + post.path,post.payload).then((res:any) =>{
   
     this.datos = res.datos
    })

    }

     Guardar(){

        var post = {
          host:this.peticion.urllocal,
          path:"/Usuario/Guardar",
          payload: {
           nombre:this.nombre,
           email:this.email,
           password:this.password,
           rol:this.rol,
          }
        }

            this.peticion.Post(post.host + post.path,post.payload).then((res:any) =>{
            console.log(res)
              if (res.state == false) {
                   this.msg.Load(res.mensaje,"danger",5000)
               }else{
                this.msg.Load(res.mensaje,"success",5000) 
                this.CargarTodas()
                $('#exampleModal').modal('hide')
                }
             })

    }

     Actualizar(){
      var post = {
        host:this.peticion.urllocal,
        path:"/Usuario/Actualizar",
        payload: {
          nombre:this.nombre,
          email:this.email,
          password:this.password,
          rol:this.rol,
          id:this.id
        }
      }
  
        this.peticion.Post(post.host + post.path,post.payload).then((res:any) =>{
        console.log(res)
          if (res.state == false) {
            this.msg.Load(res.mensaje,"danger",5000)
          }else{
            this.msg.Load(res.mensaje,"success",5000) 
            this.CargarTodas()
            $('#exampleModal').modal('hide')
          }
        })
  
    }
    
     EditarId(identificador:string){
          console.log(identificador)
          this.id = identificador

          var post = {
            host:this.peticion.urllocal,
            path:"/Usuario/CargarId",
            payload: {
              id:this.id
            }
          }
      
          this.peticion.Post(post.host + post.path,post.payload).then((res:any) => {
          
            if (res.datos != undefined) {
              console.log(res.datos[0])
              this.nombre = res.datos[0].nombre
              this.email = res.datos[0].email
              this.password = res.datos[0].password
              this.rol = res.datos[0].rol
  
              $('#exampleModal').modal('show')
           
            }
     })

          
         
        

    }  

}
