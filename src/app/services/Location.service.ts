import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private coordinates: { lat: number; lng: number } | null = null;

  setCoordinates(lat: number, lng: number) {
    this.coordinates = { lat, lng };
  }

  getCoordinates() {
    return this.coordinates;
  }

  clearCoordinates() {
    this.coordinates = null;
  }
}
