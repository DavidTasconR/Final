import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { ContactenosComponent } from './componentes/contactenos/contactenos.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { LoginComponent } from './componentes/login/login.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { SuscriptoresComponent } from './componentes/suscriptores/suscriptores.component';
import { PqrsComponent } from './componentes/pqrs/pqrs.component';
import { ClientepqrsComponent } from './componentes/clientepqrs/clientepqrs.component';
import { ActivarcuentaComponent } from './componentes/activarcuenta/activarcuenta.component';

const routes: Routes = [
  {path:"", redirectTo:"/home", pathMatch:"full"},
  {path:"home",component:HomeComponent, pathMatch:"full"},
  {path:"contactenos",component:ContactenosComponent, pathMatch:"full"},
  {path:"registro",component:RegistroComponent, pathMatch:"full"},
  {path:"usuarios",component:UsuariosComponent, pathMatch:"full"},
  {path:"productos",component:ProductosComponent, pathMatch:"full"},
  {path:"suscriptores",component:SuscriptoresComponent, pathMatch:"full"},  
  {path:"pqrs",component:PqrsComponent, pathMatch:"full"},
  {path:"clientepqrs",component:ClientepqrsComponent, pathMatch:"full"},
  {path: "activarcuenta/:email/:codigo",component:ActivarcuentaComponent,pathMatch:"full"},
  {path:"login",component:LoginComponent, pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
