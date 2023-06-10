import { Component } from '@angular/core';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionService } from 'src/app/servicios/peticion.service';

declare var $:any

@Component({
  selector: 'app-pqrs',
  templateUrl: './pqrs.component.html',
  styleUrls: ['./pqrs.component.css']
})
export class PqrsComponent {



  constructor(private peticion:PeticionService, private msg:MensajesService){}


  nombre:string = ""
  categoria:string = ""
  mensaje:string = ""
  correo:string =""
  telefono:string = ""
  estado:string="Abierto"
  
  datos:any[] =[]
  id:string = ""
  
     ngOnInit(){
      this.CargarTodas()
    }
  
     Nuevo(){
    $('#exampleModal').modal('show')
    this.categoria = ""
    this.nombre=""
    this.correo=""
    this.telefono=""
    this.mensaje=""
    this.estado="Abierto"

    }
  
     Eliminar(id:string){
       console.log(id)
       var post = {
       host:this.peticion.urllocal,
       path:"/pqrs/Eliminar",
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
        path:"/pqrs/CargarTodas",
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
          path:"/pqrs/Guardar",
          payload: {
            nombre:this.nombre,
            categoria:this.categoria,
            correo: this.correo,
            telefono:this.telefono,
            mensaje:this.mensaje,

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
        path:"/pqrs/Actualizar",
        payload: {
          estado:this.estado,
          
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
            path:"/pqrs/CargarId",
            payload: {
              id:this.id
            }
          }
      
          this.peticion.Post(post.host + post.path,post.payload).then((res:any) => {
          
            console.log(res.datos[0])
            this.nombre = res.datos[0].nombre
            this.correo = res.datos[0].correo
            this.telefono = res.datos[0].telefono
            this.mensaje = res.datos[0].mensaje
            this.estado = res.datos[0].estado
            this.categoria = res.datos[0].categoria
  
            $('#exampleModal').modal('show')
          })
  
          
         
        
  
  }  
  
  }
  

