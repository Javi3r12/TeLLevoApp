import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarVehiculoPage } from './editar-vehiculo.page';

describe('EditarVehiculoPage', () => {
  let component: EditarVehiculoPage;
  let fixture: ComponentFixture<EditarVehiculoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarVehiculoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
