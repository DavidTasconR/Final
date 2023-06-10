import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MensajesService } from './mensajes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PeticionService {

  constructor(private http:HttpClient,private  msg:MensajesService, private route:Router) { }
  
  urllocal:String = "http://localhost:3000"




Post(url:string,data:{}){
  let promise = new Promise((resolve,reject) =>{

this.http.post(url,data)
.toPromise()
.then((res:any) =>{
  
  if(res.error == true){
    this.msg.Load(res.mensaje,"danger",10000)
  this.route.navigate(['login'])
  }
    resolve(res)
}
)

  })

  return promise
}


Get(url:string,data:{}){
  let promise = new Promise((resolve,reject) =>{
    this.http.get(url)
    .toPromise()
    .then((res:any) =>{
    
      if(res.error == true){
        this.msg.Load(res.mensaje,"danger",10000)
        this.route.navigate(['login'])
      }
      resolve(res)
    }
    )
  })
  return promise
}


}
