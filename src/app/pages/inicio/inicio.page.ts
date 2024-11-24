import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { usuarioLog } from 'src/app/interfaces/usuario-log';
import { FirebaseService } from 'src/app/services/firebase.service';
import { sesionService } from '../../services/sesion.service';
import { ConnectivityService } from 'src/app/services/connectivity.service';

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
  isOnline = false;

  constructor(private alertctrl:AlertController, public router:Router, private firebase: FirebaseService,
    public sesion: sesionService, private MenuController: MenuController, private connectivityService: ConnectivityService,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.connectivityService.isOnline().then(isOnline => {
      console.log('¿Está en línea?', isOnline);
      this.isOnline = isOnline; 
      this.changeDetectorRef.detectChanges();
    });

    this.isOnline = this.connectivityService.isBrowserOnline();

    if (this.isOnline){
      if (this.sesion.isLoggedIn()) {
        this.cargarUsuarios()
        // this.router.navigate(['/perfil']);
      } else {
        this.cargarUsuarios()
      }
    } else {

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
  
  logout() {
    this.sesion.logout(); 

    this.router.navigate(['/inicio']).then(() => {
      this.router.routeReuseStrategy.shouldReuseRoute = () => false; 
      this.router.onSameUrlNavigation = 'reload'; 
      this.router.navigate(['/inicio']); 
    });
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
