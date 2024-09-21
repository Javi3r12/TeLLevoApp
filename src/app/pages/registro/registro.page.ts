import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
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

  constructor(private usuarioService: UsuarioService, private alertCtrl:AlertController, private router:Router ) {}

  ngOnInit() {
    console.log(this.usuarioService.agregarEj());
  }

  async agregarUsuario(form: NgForm) {
    if (form.valid) {
      const mensaje = this.usuarioService.agregarUsuario({ ...this.nuevoUsuario });

      if (mensaje === 'Usuario agregado exitosamente.') {
        form.resetForm(); // Resetea el formulario
        console.log(mensaje)
        console.log(this.usuarioService.obtenerUsuarios)
        // Aquí podrías mostrar un mensaje de éxito, si lo deseas
      } else {
        console.log(mensaje)
        console.log(this.usuarioService.obtenerUsuarios)
        await this.mostrarAlerta(mensaje);
        
      }
    }
  }
  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: 'Registro Fallido',
      message: mensaje,
      buttons: [{
        text: 'Iniciar sesion',
        handler: () => {
          this.router.navigate(['/inicio']); // Redirige a la página de inicio
        }
      }]
    });
    await alert.present();
  }

}
