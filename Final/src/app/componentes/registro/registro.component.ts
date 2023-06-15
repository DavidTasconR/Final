import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionService } from 'src/app/servicios/peticion.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {


  constructor (private peticion:PeticionService, private msg:MensajesService, private route:Router){}

  nombre:string = ""
  email:string = ""
  password:string = ""
  rol:string = ""
  datos:any[] =[]
  id:string = ""
  
  Guardar(){
  
    var post = {
      host:this.peticion.urllocal,
      path:"/Usuario/Guardar",
      payload: {
       email:this.email,
       password:this.password,
       rol:this.rol,
       nombre:this.nombre
  
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

