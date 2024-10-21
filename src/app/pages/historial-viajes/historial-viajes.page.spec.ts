import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialViajesPage } from './historial-viajes.page';

describe('HistorialViajesPage', () => {
  let component: HistorialViajesPage;
  let fixture: ComponentFixture<HistorialViajesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialViajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
