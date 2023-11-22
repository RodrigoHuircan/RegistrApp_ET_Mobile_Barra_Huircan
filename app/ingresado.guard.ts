import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs/operators';
import { InteractionService } from './services/interaction.service';

@Injectable({
  providedIn: 'root'
})
export class IngresadoGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth, private router: Router,
              private interactionService: InteractionService) {}

  canActivate(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(user => {
        if (user) {
          // Usuario autenticado, permitir acceso
          return true;
        } else {
          this.interactionService.presentAlert('Es necesario ingresar a tu cuenta para acceder a esta vista')
          // Usuario no autenticado, redirigir a la página de inicio de sesión
          this.router.navigate(['/login']);
          return false;
          

        }
      })
    );
  }
}
