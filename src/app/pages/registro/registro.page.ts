import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { usuarioLog } from 'src/app/interfaces/usuario-log';
import { FirebaseService } from 'src/app/services/firebase.service';

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
    celular: 0,
    id: this.firebase.createId()
  };

  usuarios : usuarioLog [] = [];

  constructor( private alertCtrl:AlertController, private router:Router, private firebase: FirebaseService) {}

  ngOnInit() {
    this.cargarUsuarios()
  }

  agregarUsuario(form: NgForm) {
    if (form.valid) {
      const correoExistente = this.usuarios.some(usuario => usuario.correo === this.nuevoUsuario.correo);
      const rutExistente = this.usuarios.some(usuario => usuario.rut === this.nuevoUsuario.rut);
      
      if (correoExistente || rutExistente) {
 
        console.log("El correo o rut ya están registrados en el sistema.");
        this.mostrarAlerta("El correo o rut ya están registrados en el sistema. Por favor, use uno diferente o pruebe a iniciar sesion.");
        return;
      }
      console.log(this.nuevoUsuario)
      this.firebase.createDocumentID(this.nuevoUsuario, 'usuario', this.nuevoUsuario.id)
      form.resetForm(); 
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



  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: 'Registro Fallido',
      message: mensaje,
      buttons: [{
        text: 'Iniciar sesion',
        handler: () => {
          this.router.navigate(['/inicio']); 
        }
      },{
        text: 'Ok',
        role: 'cancel'
      }
    ] 
    });
    await alert.present();
  }

}
