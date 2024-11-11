import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { usuarioLog } from 'src/app/interfaces/usuario-log';
import { FirebaseService } from 'src/app/services/firebase.service';
import { sesionService } from '../../services/sesion.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  mensaje:string="";

  usr:usuarioLog={
    username:'',
    correo:'',
    password:'',
    rut:'',
    celular:0,
    id:''
  }

  usuarios : usuarioLog [] = [];

  constructor(private alertctrl:AlertController, public router:Router, private firebase: FirebaseService,public sesion: sesionService, private MenuController: MenuController) { }

  ngOnInit() {
    if (this.sesion.isLoggedIn()) {
      // this.router.navigate(['/perfil']);
    } else {
      this.cargarUsuarios()
    }
  }

  enviar(form: NgForm){
    if (form.valid) {
      console.log("Form Enviado...");
      if (this.usr.username && this.usr.password) {
 
        const usuarioEncontrado = this.usuarios.find(user => 
          user.username?.trim() === this.usr.username?.trim() && user.password?.trim() === this.usr.password?.trim()
        );



        if (usuarioEncontrado) {
          this.sesion.login(usuarioEncontrado);
          //this.router.navigate(['/perfil']);
          this.router.navigate(['/home']);
        } else {
          this.mensaje = "Acceso denegado";
          this.alerta();
        }
      } else {
        this.mensaje = "Complete todos los campos";
      } 
    }
  }
  cargarUsuarios(){
    this.firebase.getCollectionChanges<usuarioLog>('usuario').subscribe(data =>{
      console.log(data)
      if(data){
        console.log(this.usuarios)
        this.usuarios = data
      }
    })
  }
  
  async alerta(){
    console.log("Alerta desde controller");
    const alert = await this.alertctrl.create({
      header: 'Acceso denegado',
      subHeader: 'usuario y/o password incorrecto',
      message: 'ingrese usuario y/o password validos',
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
