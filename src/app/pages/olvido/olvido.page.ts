import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-olvido',
  templateUrl: './olvido.page.html',
  styleUrls: ['./olvido.page.scss'],
})
export class OlvidoPage implements OnInit {
  correo: string = ""; // Define la variable para el correo

  constructor() { }

  ngOnInit() {
  }
  
  enviar(form: NgForm) {
    if (form.valid) {
      const email = form.value.correo; // Obtén el valor del input
      console.log("Form Enviado...");
      console.log("Correo ingresado:", email); // Muestra el correo en la consola
    } else {
      console.log("El formulario no es válido");
    }
  }
}
