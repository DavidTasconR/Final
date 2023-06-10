import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionService } from 'src/app/servicios/peticion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

constructor (private peticion:PeticionService, private msg:MensajesService, private route:Router){}

email:string = "" 
password:string =""

IniciarSesion(){

  var post = {
    host:this.peticion.urllocal,
    path:"/Usuario/login",
    payload: {
     email:this.email,
     password:this.password

      }
  }

      this.peticion.Post(post.host + post.path,post.payload).then((res:any) =>{
      console.log(res)
        if (res.state == false) {
             this.msg.Load(res.mensaje,"danger",5000)
         }else{
          this.msg.Load(res.mensaje,"success",5000) 
         if (res.rol =="Administrador") {
          this.route.navigate(['usuarios'])
          }else{
            this.route.navigate(['home'])
          
          }
         }
       })
}

}
