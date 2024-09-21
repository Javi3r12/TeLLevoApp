import { Injectable } from '@angular/core';
import { usuarioLog } from '../interfaces/usuario-log';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
    private usuarios: usuarioLog[] = [];

    constructor() {}

    agregarUsuario(usuario: usuarioLog) {
        this.usuarios.push(usuario);
    }
    
    obtenerUsuarios(): usuarioLog[] {
        return this.usuarios;
    }

    agregarEj() {
        this.usuarios.push( {username:'Javier ',correo:'Ja.sa@gmail.com', password:'Hola1234', rut:'21.842.442-2', celular: 912345678}
        );
      }
}