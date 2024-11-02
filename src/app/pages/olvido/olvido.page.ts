import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { usuarioLog } from 'src/app/interfaces/usuario-log';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

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
    celular:0,
    id:''
  }
  usuario:usuarioLog={
    username:'',
    correo:'',
    password:'',
    rut:'',
    celular:0,
    id:''
  }
  usuarios: usuarioLog[] = [] ;

  private codigoGenerado: number | null = null;



  constructor(private alertctrl:AlertController, private router:Router,  private firebase: FirebaseService) { }

  ngOnInit() {
    this.cargarUsuarios()
  
  }
  
  enviar(form: NgForm) {
    if (form.valid) {

      const usuarioEncontrado = this.usuarios.find(user => 
        user.correo.trim() === this.usr.correo.trim() 
        
      )
      

      if (usuarioEncontrado) {
        console.log(usuarioEncontrado)
        this.cargarUsuario(usuarioEncontrado.id)
        this.codigoGenerado = 123456;
        this.cambio = true;
        console.log(this.codigoGenerado)

      } else {
        this.mensaje = "Acceso denegado";
        this.alerta();
      }
    }
  }

  cambiarContrasena(form: NgForm) {
    if (form.valid) {

      const codigoIngresado = this.codigo;

      if (codigoIngresado !== this.codigoGenerado) {
        this.errorMensaje = "Código incorrecto.";
        return;
      }

      if (this.usr.password === '' || this.confirmPass === '') {
        this.errorMensaje = "La contraseñas no pueden estar vacías.";
        return;
      }

      if (this.usr.password !== this.confirmPass) {
        this.errorMensaje = "Las contraseñas no coinciden.";
        return;
      }

      this.errorMensaje = ""; 
      console.log("Contraseña cambiada con éxito!");
      this.editarContraseña(this.usr.password)
      this.cambio = false;
    }
  }

  editarContraseña(contraseña: string) {
    this.usuario.password = contraseña;
    this.firebase.createDocumentID(this.usuario, 'usuario', this.usuario.id).then(() => {
      console.log("Contraseña cambiada exitosamente", this.usuario);
      if (this.usuario.password = contraseña){
        this.router.navigate(['/inicio'])
      }
    });
    
  }

  cargarUsuario(id: string) {
    this.firebase.getDocument<usuarioLog>('usuario', id).subscribe(usuario => {
      if (usuario) {
        console.log('cargarUsuario:',usuario )
        this.usuario = usuario;
      }
    });
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

  cargarUsuarios(){
    this.firebase.getCollectionChanges<usuarioLog>('usuario').subscribe(data =>{
      console.log(data)
      if(data){
        console.log(this.usuarios)
        this.usuarios = data
      }
    })
  }
}
