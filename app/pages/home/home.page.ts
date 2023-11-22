import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { MenuController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/authentication.service';
import { Subscription } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore } from 'firebase/firestore';
import { UsuarioI } from 'src/app/models/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  user: any;
  private userDataSubscription : Subscription
  nombre: any;

  constructor(private router: Router,
              private firestore: FirestoreService,
              private menuController: MenuController,
              private auth : AuthenticationService,
              public afAuth: AngularFireAuth,
              private firestoreService: AngularFirestore
              ) {
                this.auth.stateUser().subscribe(res => {
                    if (res){
                      console.log('Está logueado');
                      this.getDatosUser(res.uid)
                    }else{
                      console.log('No está logueado');
                    }
                })
               }


  ngOnInit() {
    this.getDatosUser;
  }

  getAlumnos(){
    this.firestore.getCollection()
  }

  alumnoMenu(){
    this.menuController.open('third');
  }

  getDatosUser(uid: string){
    const path = 'Usuarios';
    const id = uid;
    this.firestoreService.collection<UsuarioI>(path).doc(id).valueChanges().subscribe (res =>{
      console.log('datos ->', res)
      if (res){
        this.nombre = res.fullname
      }
    })
  }
}
