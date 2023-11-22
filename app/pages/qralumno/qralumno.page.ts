import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-qralumno',
  templateUrl: './qralumno.page.html',
  styleUrls: ['./qralumno.page.scss'],
})
export class QralumnoPage implements OnInit {

  constructor(private menuController: MenuController,private alertController: AlertController) { }

  ngOnInit() {
  }


  alumnoMenu(){
    this.menuController.open('third');
  }

  async Enviar() {
    const alert = await this.alertController.create({
      header: 'Asistencia Registrada!',
      message: "Se ha registrado con éxito la asistencia en el curso a las 12:42 PM - 05/09/2023.",
      buttons: ['OK'],
    });

    await alert.present();



  }

 
}