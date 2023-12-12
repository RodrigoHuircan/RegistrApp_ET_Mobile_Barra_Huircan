import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage'; 
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service'; // Asegúrate de importar tu servicio
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AjustesComponent } from './ajustes/ajustes.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { QralumnoPage } from './pages/qralumno/qralumno.page';

@NgModule({
  declarations: [AppComponent, AjustesComponent, QralumnoPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ZXingScannerModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy  },
    AuthenticationService // Asegúrate de agregar tu servicio aquí
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
