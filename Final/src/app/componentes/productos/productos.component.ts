import { Component } from '@angular/core';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionService } from 'src/app/servicios/peticion.service';
import { SubirarchivosService } from 'src/app/servicios/subirarchivos.service';

declare var $:any

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent {



constructor(private peticion:PeticionService, private msg:MensajesService, private subirarchivos:SubirarchivosService){}

destino:string=""
path:string=""
nombre:string = ""
categoria:string = ""
presupuesto:string = ""
descripcion:string =""
datos:any[] =[]
id:string = ""



   ngOnInit(){
    this.destino =this.subirarchivos.urllocal
    this.CargarTodas()
  }

   Nuevo(){
  $('#exampleModal').modal('show')
  this.categoria = ""
  this.nombre = ""
  this.id = ""
  this.presupuesto =""
  this.descripcion ="" 
   
  }

   Eliminar(id:string){
     console.log(id)
     var post = {
     host:this.peticion.urllocal,
     path:"/Producto/Eliminar",
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
      path:"/Producto/CargarTodas",
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
        path:"/Producto/Guardar",
        payload: {
          nombre:this.nombre,
          categoria:this.categoria,
          presupuesto:this.presupuesto,
          descripcion:this.descripcion
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
      path:"/Producto/Actualizar",
      payload: {
        nombre:this.nombre,
        categoria:this.categoria,
        id:this.id,        
        presupuesto:this.presupuesto,
        descripcion:this.descripcion
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

        this.path = 'files/Productos/'+ identificador  

        var post = {
          host:this.peticion.urllocal,
          path:"/Producto/CargarId",
          payload: {
            id:this.id
          }
        }
    
        this.peticion.Post(post.host + post.path,post.payload).then((res:any) => {
        
          console.log(res.datos[0])
          this.nombre = res.datos[0].nombre
          this.categoria = res.datos[0].categoria
          this.presupuesto = res.datos[0].presupuesto
          this.descripcion = res.datos[0].descripcion

          $('#exampleModal').modal('show')
        })

        
       
      

}  

}
