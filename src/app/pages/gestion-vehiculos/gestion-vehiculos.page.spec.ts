import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionVehiculosPage } from './gestion-vehiculos.page';

describe('GestionVehiculosPage', () => {
  let component: GestionVehiculosPage;
  let fixture: ComponentFixture<GestionVehiculosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionVehiculosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
