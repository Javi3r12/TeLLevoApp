import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarViajePage } from './editar-viaje.page';

describe('EditarViajePage', () => {
  let component: EditarViajePage;
  let fixture: ComponentFixture<EditarViajePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarViajePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
