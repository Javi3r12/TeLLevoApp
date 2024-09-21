import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { usuarioLog } from 'src/app/interfaces/usuario-log';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-olvido',
  templateUrl: './olvido.page.html',
  styleUrls: ['./olvido.page.scss'],
})
export class OlvidoPage implements OnInit {
  codigo: number | null = null; 
  confirmPass: string = ""; 
  errorMensaje: string = "";
  mensaje:string="";
  cambio:boolean=false;
  usr:usuarioLog={
    username:'',
    correo:'',
    password:'',
    rut:'',
    celular:0
  }
  usuarios: usuarioLog[] = [] ;

  private codigoGenerado: number | null = null;



  constructor(private alertctrl:AlertController, private router:Router, private usuarioService: UsuarioService) { }

  ngOnInit() {
  }
  
  enviar(form: NgForm) {

    const usuarios = this.usuarioService.obtenerUsuarios();

    const usuarioEncontrado = usuarios.find(user => 
      user.correo.trim() === this.usr.correo.trim() 
    );

    if (usuarioEncontrado) {
      this.usr.username = '';
      this.usr.password = '';
      this.codigoGenerado = 123456;
      this.cambio = true;
      console.log(this.codigoGenerado)
      // this.router.navigate(['/home']); 
    } else {
      this.mensaje = "Acceso denegado";
      this.alerta();
    }
    
  }

  cambiarContrasena() {
    const codigoIngresado = this.codigo;

    if (codigoIngresado !== this.codigoGenerado) {
      this.errorMensaje = "Código incorrecto.";
      return;
    }

    if (this.usr.password === '' || this.confirmPass === '') {
      this.errorMensaje = "La contraseñasno puede estar vacía.";
      return;
    }
    
    if (this.usr.password !== this.confirmPass) {
      this.errorMensaje = "Las contraseñas no coinciden.";
      return;
    }

    this.errorMensaje = ""; 
    console.log("Contraseña cambiada con éxito!");
    this.usuarioService.actualizarPassword(this.usr.correo, this.confirmPass)
  }

  async alerta(){
    console.log("Alerta desde controller");
    const alert = await this.alertctrl.create({
      header: 'Acceso denegado',
      subHeader: 'Correo no registrado',
      message: 'ingrese un correo valido',
      buttons: [{
        id:'aceptar del alert controller',
        text:'Aceptar',
        cssClass:'color-aceptar',
        handler:()=>{
          console.log(event);
        }
      }],
    });

    await alert.present();
  }
}
