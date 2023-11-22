import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroDocentePage } from './registro-docente.page';

describe('RegistroDocentePage', () => {
  let component: RegistroDocentePage;
  let fixture: ComponentFixture<RegistroDocentePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegistroDocentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
