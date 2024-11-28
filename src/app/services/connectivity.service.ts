import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';  // Usar el plugin de Capacitor

@Injectable({
  providedIn: 'root',
})
export class ConnectivityService {

  constructor() {}

  // Verifica si hay conexión a internet
  public async isOnline(): Promise<boolean> {
    const status = await Network.getStatus();
    return status.connected;
  }

  // Alternativa para navegador
  public isBrowserOnline(): boolean {
    return navigator.onLine;
  }

  // Observa cambios en la conexión
  public onNetworkChange() {
    Network.addListener('networkStatusChange', (status) => {
      console.log('Conexión cambiada: ', status);
    });
  }
}
