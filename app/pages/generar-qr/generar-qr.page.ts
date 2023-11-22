import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generar-qr',
  templateUrl: 'generar-qr.page.html',
  styleUrls: ['generar-qr.page.scss'],
})
export class GenerarQrPage {
  texto: string = '';
  mostrarQR: boolean = false; // Variable para controlar la visibilidad del código QR
  mostrarError: boolean = false;
  constructor (private router: Router){}

  generarQR() {
    // Validar que el campo no esté vacío
    if (this.texto.trim() === '') {
      this.mostrarError = true;
    } else {
      this.mostrarError = false;

      // Aquí puedes agregar lógica adicional si es necesario antes de generar el código QR
      console.log('Generando QR para: ', this.texto);

      // Puedes agregar aquí la lógica para guardar la información en Firebase si es necesario

      // Cambia el valor de mostrarQR para hacer visible el código QR y deshabilitar la edición del input
      this.mostrarQR = true;
    }
  }

  regresar() {
    // Redirige a la página que desees al presionar el botón "Regresar"
    this.router.navigate(['/home']); // Ajusta la ruta según tu configuración
  }
}
