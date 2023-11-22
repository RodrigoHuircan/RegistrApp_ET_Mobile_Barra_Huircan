import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthenticationService } from 'src/app/authentication.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { CodigoQRI, UsuarioI } from 'src/app/models/models';
import { InteractionService } from 'src/app/services/interaction.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {

  constructor(private afAuth: AngularFireAuth,
              private firestore: AngularFirestore,
              private authService : AuthenticationService,
              private database : FirestoreService,
              private interaction : InteractionService ) { }

  scanResult: any = '';
  userId: string = '';  //uid usuario
  uid: string = null
  info: UsuarioI = null

    data : CodigoQRI ={
      asignaturaSala: '',
      fechaHora: '',
      estudiante: '',                       
    }


  onCodeResult(asignaturaSala: string) {
    this.scanResult = asignaturaSala;
    this.getInfoUser()
    const path = "CodigoQR"
    const id = this.database.getId()
    this.data.asignaturaSala = asignaturaSala
    this.data.fechaHora = new Date().toISOString();
    this.data.estudiante = this.info.fullname 
    this.database.crearDoc(this.data,path,id).then((resp) => {
      console.log('esta es la respuesta ->', resp);
      this.interaction.closeLoading();
      this.interaction.presentToast('Guardado con éxito')
  });
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
    this.firestore.collection<UsuarioI>(path).doc(id).valueChanges().subscribe( res => {
      if (res){
        this.info = res;
      }
      console.log('datos son: ', res)
    })
  }

  async ngOnInit() {
    this.authService.stateUser().subscribe( resp => {
      console.log('en perfil - estado de autenticación ->', resp)
      this.getUid();
    });

  }
}