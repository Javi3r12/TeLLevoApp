import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionViajesPage } from './gestion-viajes.page';

describe('GestionViajesPage', () => {
  let component: GestionViajesPage;
  let fixture: ComponentFixture<GestionViajesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionViajesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
