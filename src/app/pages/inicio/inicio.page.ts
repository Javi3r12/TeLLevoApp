import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { usuarioLog } from 'src/app/interfaces/usuario-log';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  mensaje:string=""

  usr:usuarioLog={
    username:'',
    correo:'',
    password:'',
    rut:'',
    celular:0
  }

  constructor(private alertctrl:AlertController, private router:Router) { }

  ngOnInit() {
  }

  enviar(){


    console.log("Form Enviado...");
    console.log(this.usr);
    if(this.usr.username=="waco" && this.usr.password=="123"){
      this.mensaje="ok"
      this.usr.username='';
      this.usr.password=''
      this.router.navigate(['/home'])
    }
    else{
      this.mensaje="Acceso denegado"
      this.alerta()
    }
  
  }
  
  async alerta(){
    console.log("Alerta desde controller");
    const alert = await this.alertctrl.create({
      header: 'Acceso denegado',
      subHeader: 'usuario y/o password incorrecto',
      message: 'eso!!',
      buttons: [{
        id:'aceptar del alert controller',
        text:'Aceptar',
        cssClass:'color-aceptar',
        handler:()=>{
          console.log(event);
        }
      },{
        text:'Cancelar',
        cssClass:'color-cancelar'
      }],
    });

    await alert.present();
  }


}
