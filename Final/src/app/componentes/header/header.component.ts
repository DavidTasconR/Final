import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionService } from 'src/app/servicios/peticion.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
   constructor(private peticion:PeticionService, private msg:MensajesService, private route:Router){}

  Logout(){
    var post = {
      host:this.peticion.urllocal,
      path:"/Usuario/Logout",
      payload: {
    
        }
    }
  
        this.peticion.Post(post.host + post.path,post.payload).then((res:any) =>{
        console.log(res)
          if (res.state == false) {
               this.msg.Load(res.mensaje,"danger",5000)
           }else{
            this.msg.Load(res.mensaje,"success",5000) 
            this.route.navigate(['home'])
            }
         })
  }
}
