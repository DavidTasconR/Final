import { Component } from '@angular/core';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionService } from 'src/app/servicios/peticion.service';

@Component({
  selector: 'app-clientepqrs',
  templateUrl: './clientepqrs.component.html',
  styleUrls: ['./clientepqrs.component.css']
})
export class ClientepqrsComponent {


  constructor(private peticion:PeticionService, private msg:MensajesService){}


  nombre:string = ""
  categoria:string = ""
  mensaje:string = ""
  correo:string =""
  telefono:string = ""

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
           
            }
         })

}

}
