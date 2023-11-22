import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class InteractionService {

  loading: any;

  constructor(public toastController: ToastController, 
              public loadingController: LoadingController,
              public alertController : AlertController) { }

  async presentToast(mensaje: string){
    const toast = await this.toastController.create({
      message: mensaje, //no es necesario poner msj 'hola mundo' ya que es un variable general, lo q entre sirve 
      duration: 2000
    });
    toast.present();
  }

  async presentLoading(mensaje: string) {
    this.loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: mensaje,
    });
    await this.loading.present();

  }

  async closeLoading() {
    await this.loading.dismiss();
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: message,
      buttons: ['OK'],
    });
    alert.present();
}

}
