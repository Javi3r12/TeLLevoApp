import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrarViajePage } from './registrar-viaje.page';

describe('RegistrarViajePage', () => {
  let component: RegistrarViajePage;
  let fixture: ComponentFixture<RegistrarViajePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrarViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
