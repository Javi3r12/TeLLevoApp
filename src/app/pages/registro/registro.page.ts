import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { usuarioLog } from 'src/app/interfaces/usuario-log';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  nuevoUsuario: usuarioLog = {
    username:'',
    correo:'',
    password:'',
    rut:'',
    celular: 0
  };

  usuarios : usuarioLog [] = [];

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
  }

  agregarUsuario(form: NgForm) {
    if (form.valid) {
      console.log(this.nuevoUsuario)
      this.usuarioService.agregarUsuario({ ...this.nuevoUsuario });
      form.resetForm(); // Resetea el formulario
    }
  }

}
