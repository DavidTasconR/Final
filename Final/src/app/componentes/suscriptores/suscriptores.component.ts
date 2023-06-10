import { Component } from '@angular/core';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionService } from 'src/app/servicios/peticion.service';

declare var $:any

@Component({
  selector: 'app-suscriptores',
  templateUrl: './suscriptores.component.html',
  styleUrls: ['./suscriptores.component.css']
})
export class SuscriptoresComponent {

  

constructor(private peticion:PeticionService, private msg:MensajesService){}


nombre:string = ""
categoria:string = ""
datos:any[] =[]
id:string = ""


   ngOnInit(){
    this.CargarTodas()
  }

   Nuevo(){
  $('#exampleModal').modal('show')
  this.categoria = ""
  this.nombre=""
  
  }

   Eliminar(id:string){
     console.log(id)
     var post = {
     host:this.peticion.urllocal,
     path:"/suscriptores/Eliminar",
     payload: {
      id:id
      }
     }

     this.peticion.Post(post.host + post.path,post.payload).then((res:any) =>{
     console.log(res)
     if (res.state == false) {
     this.msg.Load(res.mensaje,"danger",5000)
     }
     else{
     this.msg.Load(res.mensaje,"success",5000) 
     this.CargarTodas()
     }
     })
    }

   CargarTodas(){

     var post = {
      host:this.peticion.urllocal,
      path:"/suscriptores/CargarTodas",
      payload: {
    
         }
       }

       this.peticion.Post(post.host + post.path,post.payload).then((res:any) =>{
       console.log(res)
       this.datos = res.datos
       })

     }

   Guardar(){

      var post = {
        host:this.peticion.urllocal,
        path:"/suscriptores/Guardar",
        payload: {
          nombre:this.nombre,
          categoria:this.categoria,
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
      path:"/suscriptores/Actualizar",
      payload: {
        nombre:this.nombre,
        categoria:this.categoria,
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
          path:"/suscriptores/CargarId",
          payload: {
            id:this.id
          }
        }
    
        this.peticion.Post(post.host + post.path,post.payload).then((res:any) => {
        
          console.log(res.datos[0])
          this.nombre = res.datos[0].nombre
          this.categoria = res.datos[0].categoria

          $('#exampleModal').modal('show')
        })

        
       
      

}  

}


