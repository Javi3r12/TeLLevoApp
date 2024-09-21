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
  correo: string = ""; 

  mensaje:string="";

  usr:usuarioLog={
    username:'',
    correo:'',
    password:'',
    rut:'',
    celular:0
  }


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
      this.router.navigate(['/home']);
    } else {
      this.mensaje = "Acceso denegado";
      this.alerta();
    }
    
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
