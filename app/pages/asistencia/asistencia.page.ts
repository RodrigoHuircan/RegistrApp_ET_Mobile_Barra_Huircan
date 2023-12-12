import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/authentication.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  asistencias : any[]= [];
  constructor(private firestore: AngularFirestore,
              private authService: AuthenticationService,
              private auth: AngularFireAuth,
              private menuController: MenuController) {}

  getAsistenciasByUserId(userId: string): Observable<any[]> {
    return this.firestore.collection('asistencias', ref => ref.where('userId', '==', userId)).valueChanges();
  }

  ngOnInit() {
    // Obtén el objeto de usuario actual
    this.auth.authState.subscribe(user => {
      if (user) {
        const userId = user.uid;

        console.log('User ID:', userId);

        // Realiza la consulta directamente en Angular Firestore
        this.firestore
          .collection('Asistencias', ref => ref.where('userId', '==', userId))
          .valueChanges()
          .subscribe((Asistencias: any[]) => {
            this.asistencias = Asistencias;
          });
      }
    });
  }

  alumnoMenu(){
    this.menuController.open('third');
  }

}
