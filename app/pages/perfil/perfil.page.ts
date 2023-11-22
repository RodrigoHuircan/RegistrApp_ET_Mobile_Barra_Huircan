import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AlertController, MenuController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/authentication.service';
import { UsuarioI } from 'src/app/models/models';
import { FirestoreService } from 'src/app/services/firestore.service';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  uid: string = null
  info: UsuarioI = null
  constructor(private menuController: MenuController,
              private authService: AuthenticationService,
              private firestoreService: AngularFirestore,
              private alertController: AlertController,
              private firestore: FirestoreService,
              private interactionService: InteractionService) { }

  async ngOnInit() {
    this.authService.stateUser().subscribe( resp => {
      console.log('en perfil - estado de autenticación ->', resp)
      this.getUid();
    });

  }

  alumnoMenu(){
    this.menuController.open('third');
  }

  async getUid(){
    const uid  = await this.authService.getUid();
    if (uid) {
      this.uid = uid;
      console.log('uid ->', this.uid)
      this.getInfoUser();
    }
    else {
      console.log('no existe uid')
    }
  }

  getInfoUser(){
    const path = 'Usuarios';
    const id = this.uid;
    this.firestoreService.collection<UsuarioI>(path).doc(id).valueChanges().subscribe( res => {
      if (res){
        this.info = res;
      }
      console.log('datos son: ', res)
    })

  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Editar Nombre',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Ingresa tu nuevo nombre y apellido',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Confirmar Cambios',
          handler: (ev) => {
            console.log('Confirm Ok', ev);
            this.saveNombre(ev.nombre)
          },
        },
      ],
    });

    await alert.present();
  }

  async saveNombre(nombreInput: string){
    await this.interactionService.presentLoading('Actualizando...')
    const path = 'Usuarios';
    const id = this.uid;
    const updateDoc = {
      fullname: nombreInput
    };
    this.firestore.updateDoc(path, id, updateDoc).then(() => {
      this.interactionService.presentToast('Actualizado con éxito')
      this.interactionService.closeLoading()

    })
  }
  
  async saveEmail(emailInput: string){
    await this.interactionService.presentLoading('Actualizando...')
    const path = 'Usuarios';
    const id = this.uid;
    const updateDoc = {
      email: emailInput
    };
    await this.authService.updateUserProfile(id, updateDoc)
    this.firestore.updateDoc(path, id, updateDoc).then(() => {
      this.interactionService.presentToast('Actualizado con éxito')
      this.interactionService.closeLoading()
    })
  }

  async actualizarEmail() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Editar Email',
      inputs: [
        {
          name: 'email',
          type: 'text',
          placeholder: 'Ingresa tu nuevo correo',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Confirmar Cambios',
          handler: (ev) => {
            console.log('Confirm Ok', ev);
            this.saveEmail(ev.email)
          },
        },
      ],
    });

    await alert.present();
  }

}
