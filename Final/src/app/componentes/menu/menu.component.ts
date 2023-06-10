import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionService } from 'src/app/servicios/peticion.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private peticion:PeticionService, private msg:MensajesService, private route:Router){}

ngOnInit(): void {
  this.midata()
}

nombre:string=""
rol:string=""

  midata(){
    var post = {
    host:this.peticion.urllocal,
    path:"/midata",
    payload: {
  
      }
  }

      this.peticion.Post(post.host + post.path,post.payload).then((res:any) =>{
      console.log(res)
       this.nombre=res.nombre
       this.rol=res.rol
       })
  }

  
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
