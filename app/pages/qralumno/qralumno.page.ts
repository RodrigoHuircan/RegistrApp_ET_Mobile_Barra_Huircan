import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/authentication.service';
import { Router } from '@angular/router';
import { FirestoreService } from 'src/app/services/firestore.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { InteractionService } from 'src/app/services/interaction.service';


@Component({
  selector: 'app-qralumno',
  templateUrl: './qralumno.page.html',
  styleUrls: ['./qralumno.page.scss'],
})

export class QralumnoPage implements OnInit {
  constructor(private firestore: FirestoreService,
              private fireauth: AngularFireAuth,
              private interaction: InteractionService,
              private router: Router){}
  
  scanResult: any='';


  ngOnInit(): void {
  }

  onCodeResult(result:string)
  {
    this.scanResult=result;
  }

  // Agrega una variable de control en tu componente
  guardarAsistencia: boolean = false;

  // Modifica el método registrar para que utilice la variable de control
  registrar() {
    // Obtén el UID del usuario logueado
    this.fireauth.authState.subscribe(user => {
      if (user && this.guardarAsistencia) {
        const uid = user.uid;

        // Obtiene la fecha y hora actual
        const fechaHoraActual = new Date();

        // Crea un objeto con los datos a guardar, incluyendo la fecha y hora por separado
        const asistenciaData = {
          codigo: this.scanResult,
          userId: uid,
          fecha: fechaHoraActual.toISOString().split('T')[0], // Obtén la fecha como string 'YYYY-MM-DD'
          hora: fechaHoraActual.toTimeString().split(' ')[0], // Obtén la hora como string 'HH:MM:SS'
          // Otros campos que quieras almacenar
        };

        // Llama al servicio de Firestore para guardar los datos
        this.firestore.guardarAsistencia(asistenciaData)
          .then(() => {
            // La asistencia se guardó exitosamente, puedes realizar acciones adicionales si es necesario
            console.log('Asistencia guardada correctamente');
            this.interaction.presentToast('¡Asistencia guardada correctamente!');
            // Reinicia la variable de control después de guardar la asistencia
            this.guardarAsistencia = false;
          })
          .catch(error => {
            // Maneja errores en caso de que la operación falle
            console.error('Error al guardar la asistencia', error);
          });
      }
    });
  }

  // En tu componente, llama a registrar() solo cuando se hace clic en el botón
  onGuardarAsistenciaClick() {
    // Establece la variable de control a true al hacer clic en el botón
    this.guardarAsistencia = true;
    this.registrar();
    this.router.navigate(['/home'])
  }


}