import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor(private storage: Storage) {
    this.storage.create();
  }

  saveData(key: string, data: any) {
    console.log(`Guardando ${key}:`, data);
    localStorage.setItem(key, JSON.stringify(data));
  }

  getData(key: string): any {
    const data = localStorage.getItem(key);
    console.log(`Recuperando ${key}:`, data);
    return data ? JSON.parse(data) : null;
  }

  async removeData(key: string) {
    await this.storage.remove(key);
  }
}
