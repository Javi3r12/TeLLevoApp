import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleViajePage } from './detalle-viaje.page';

describe('DetalleViajePage', () => {
  let component: DetalleViajePage;
  let fixture: ComponentFixture<DetalleViajePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
