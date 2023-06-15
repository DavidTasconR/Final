import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { HomeComponent } from './componentes/home/home.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { ContactenosComponent } from './componentes/contactenos/contactenos.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { MensajesComponent } from './componentes/mensajes/mensajes.component';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { ProductosComponent } from './componentes/productos/productos.component';
import { SuscriptoresComponent } from './componentes/suscriptores/suscriptores.component';
import { PqrsComponent } from './componentes/pqrs/pqrs.component';
import { ClientepqrsComponent } from './componentes/clientepqrs/clientepqrs.component'
import { InterceptorService } from './interceptor/interceptor.service';
import { SubirarchivosComponent } from './componentes/subirarchivos/subirarchivos.component';
import { ActivarcuentaComponent } from './componentes/activarcuenta/activarcuenta.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    UsuariosComponent,
    ContactenosComponent,
    MenuComponent,
    LoginComponent,
    RegistroComponent,
    MensajesComponent,
    ProductosComponent,
    SuscriptoresComponent,
    PqrsComponent,
    ClientepqrsComponent,
    SubirarchivosComponent,
    ActivarcuentaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
