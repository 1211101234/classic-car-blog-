import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { CarService } from '../../services/cars';
import { AddCarComponent } from './add-car';

describe('AddCarComponent', () => {
  let component: AddCarComponent;
  let fixture: ComponentFixture<AddCarComponent>;

  beforeEach(() => {
    const routerStub = () => ({ navigate: array => ({}) });
    const formBuilderStub = () => ({ group: object => ({}) });
    const carServiceStub = () => ({
      addCar: value => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [AddCarComponent],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: CarService, useFactory: carServiceStub }
      ]
    });
    fixture = TestBed.createComponent(AddCarComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('onSubmit', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const carServiceStub: CarService = fixture.debugElement.injector.get(
        CarService
      );
      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(carServiceStub, 'addCar').and.callThrough();
      component.onSubmit();
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(carServiceStub.addCar).toHaveBeenCalled();
    });
  });

  describe('cancel', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.cancel();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
});
