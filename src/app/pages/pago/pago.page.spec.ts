import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagoPage } from './pago.page';

describe('PagoPage', () => {
  let component: PagoPage;
  let fixture: ComponentFixture<PagoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
