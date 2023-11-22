import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { InteractionService } from 'src/app/services/interaction.service';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-login-docente',
  templateUrl: './login-docente.page.html',
  styleUrls: ['./login-docente.page.scss'],
})
export class LoginDocentePage implements OnInit {


  credenciales = {
    email: null,
    password: null,


  };

  constructor(private auth: AuthenticationService,
              private interaction : InteractionService,
              private router : Router) {}

  ngOnInit() {}


    async login(){
      await this.interaction.presentLoading('Iniciando sesión')
      console.log('credenciales -> ', this.credenciales);
      const res = await this.auth.loginUser(this.credenciales.email , this.credenciales.password).catch( error => {
        console.log('error');
        this.interaction.closeLoading();
        this.interaction.presentToast('El email o contraseña inválido')
      })
      if (res){
        console.log('res ->', res);
        this.interaction.closeLoading();
        this.interaction.presentToast('Ingreso exitoso');
        this.router.navigate(['/home'])
      }
  }

}