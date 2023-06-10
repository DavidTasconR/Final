import { HttpEventType } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { SubirarchivosService } from 'src/app/servicios/subirarchivos.service';

@Component({
  selector: 'app-subirarchivos',
  templateUrl: './subirarchivos.component.html',
  styleUrls: ['./subirarchivos.component.css']
})
export class SubirarchivosComponent {

progress:number = 0
selectedFiles:any
archivoseleccionado:any
mensaje:string = ""

constructor(private uploadServices: SubirarchivosService){}

@Input() urldestino:string = ""
@Input() path:string =""
@Input() fileName:string =""


nombrearchivo:string = "Seleccione el Archivo"

selectFile(event:any){
this.selectedFiles = event.target.files
this.nombrearchivo = this.selectedFiles[0].name
console.log(this.selectedFiles[0].name)
}


upload():void{

this.progress = 0
this.archivoseleccionado = this.selectedFiles.item(0)

this.uploadServices.upload(this.archivoseleccionado,this.urldestino + this.path,this.fileName).subscribe(
  (event:any)=>{
    console.log(event)
    console.log(event.body)

    if (event.type === HttpEventType.UploadProgress) {
      this.progress = Math.round(100 * event.loaded / event.total)
      }
      else{
        console.log(event.body)
        this.mensaje=event.body.mensaje
setTimeout(() => {
  this.progress = 0
  this.nombrearchivo = "Selecciona el archivo"
this.mensaje = ""
},2000)


      }


  },err => {
    this.progress = 0
    this.nombrearchivo = "Selecciona el archivo"
    this.mensaje = "se presentó un problema al subir el archivo"
  })

  this.selectedFiles = undefined
}

}
