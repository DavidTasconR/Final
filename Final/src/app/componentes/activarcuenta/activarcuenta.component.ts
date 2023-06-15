import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MensajesService } from 'src/app/servicios/mensajes.service';
import { PeticionService } from 'src/app/servicios/peticion.service';

@Component({
  selector: 'app-activarcuenta',
  templateUrl: './activarcuenta.component.html',
  styleUrls: ['./activarcuenta.component.css']
})
export class ActivarcuentaComponent implements OnInit{
  constructor(private actroute:ActivatedRoute,private route:Router ,private peticion:PeticionService, private msg:MensajesService){}

codigo:string=""
email:string=""

ngOnInit(): void {
 this.email = this.actroute.snapshot.params["email"]
 this.codigo = this.actroute.snapshot.params["codigo"]
}


ActivarCuenta(){
  var post = {
    host:this.peticion.urllocal,
    path:"/Usuario/ActivarCuenta",
    payload: {
     email:this.email,
    codigo:this.codigo

      }
  }

      this.peticion.Post(post.host + post.path,post.payload).then((res:any) =>{
      console.log(res)
        if (res.state == false) {
             this.msg.Load(res.mensaje,"danger",5000)
         }else{
          
          this.msg.Load(res.mensaje,"succes",5000)
          this.route.navigate(['login'])
         }
       })
}
}
