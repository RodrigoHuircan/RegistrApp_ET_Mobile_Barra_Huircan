
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms'; // Importa NgForm
import { FirestoreService } from 'src/app/services/firestore.service';
import { UsuarioI } from 'src/app/models/models';
import { InteractionService } from 'src/app/services/interaction.service';
import { Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/authentication.service';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-registro-docente',
  templateUrl: './registro-docente.page.html',
  styleUrls: ['./registro-docente.page.scss'],
})
export class RegistroDocentePage implements OnInit {

  data: UsuarioI = {
    fullname: '',
    email: '',
    uid: '',
    password: '',
    usuario: ''
  }

  registroForm: FormGroup
  constructor(private database: FirestoreService,
              private interaction: InteractionService,
              private formBuilder: FormBuilder,
              private auth : AuthenticationService ) { }

  ngOnInit() {
    this.registroForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  crearUsuario(form: FormGroup) {
    if (form.valid) {
      this.data = form.value; // Aquí actualizas this.data con los valores del formulario
      console.log(this.data)
      this.interaction.presentLoading('Guardando...')
      const path = 'Usuarios';
      const id = this.database.getId();
      this.data.uid = id;
      this.data.usuario = 'docente'
      this.database.crearDoc(this.data, path, id).then((resp) => {
        console.log('esta es la respuesta ->', resp);
        this.interaction.closeLoading();
        this.interaction.presentToast('Guardado con éxito')
      })
    } else {
      // El formulario no es válido, puedes mostrar mensajes de error o realizar acciones adicionales.
    }
  }

  async registrar(form : FormGroup){
    this.interaction.presentLoading('Registrando')
    if (form.valid) {
      this.data = form.value;
      console.log('datos ->', this.data);
      const res = await this.auth.registrarUser(this.data).catch( error => {
        this.interaction.closeLoading();
        this.interaction.presentToast('error')
        console.log('error');
      })
      if (res){
        console.log('Exito');
        const path = 'Usuarios';
        const id = res.user.uid;
        this.data.uid = id;
        this.data.usuario = 'docente'
        await this.database.crearDoc(this.data,path,id)
        this.interaction.closeLoading();
        this.interaction.presentToast('Registrado')
      } 
    }
  }


}