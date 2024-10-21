import { Injectable } from '@angular/core';
import { usuarioLog } from '../interfaces/usuario-log';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
    private usuarios: usuarioLog[] = [];

    constructor() {}

    agregarUsuario(usuario: usuarioLog) {
      const existeUsuario = this.usuarios.some(user => user.username === usuario.username);
      const existeCorreo = this.usuarios.some(user => user.correo === usuario.correo);
      const existeRut = this.usuarios.some(user => user.rut === usuario.rut);

    
      if (existeUsuario) {
        return 'El nombre de usuario ya está en uso.';
      }
    
      if (existeCorreo) {
        return 'El correo ya está registrado.';
      }

      if (existeRut) {
        return 'El rut ya está registrado.'
      }
    
      this.usuarios.push(usuario);
      return 'Usuario agregado exitosamente.';
    }
    
    obtenerUsuarios(): usuarioLog[] {
        return this.usuarios;
    }

    agregarEj() {
        this.agregarUsuario( {username:'Javier',correo:'Ja.sa@gmail.com', password:'Hola1234', rut:'21.842.442-2', celular: 912345678}
        
        )
        console.log(this.obtenerUsuarios()) ;
      }
      actualizarPassword(correo: string, nuevaPassword: string): string {
        const usuario = this.usuarios.find(user => user.correo === correo);
    
        if (!usuario) {
          return 'Usuario no encontrado.';
        }
    
        usuario.password = nuevaPassword;
        return 'Contraseña actualizada exitosamente.';
      }
}