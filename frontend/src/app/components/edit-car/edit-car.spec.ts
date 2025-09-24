import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { CarService } from '../../services/cars';
import { EditCar } from './edit-car';

describe('EditCar', () => {
  let component: EditCar;
  let fixture: ComponentFixture<EditCar>;

  beforeEach(() => {
    const activatedRouteStub = () => ({
      snapshot: { paramMap: { get: () => ({}) } }
    });
    const routerStub = () => ({ navigate: array => ({}) });
    const formBuilderStub = () => ({ group: object => ({}) });
    const carServiceStub = () => ({
      getCarById: carId => ({ subscribe: f => f({}) }),
      updateCar: (carId, payload) => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [EditCar],
      providers: [
        { provide: ActivatedRoute, useFactory: activatedRouteStub },
        { provide: Router, useFactory: routerStub },
        { provide: FormBuilder, useFactory: formBuilderStub },
        { provide: CarService, useFactory: carServiceStub }
      ]
    });
    fixture = TestBed.createComponent(EditCar);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const carServiceStub: CarService = fixture.debugElement.injector.get(
        CarService
      );
      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(carServiceStub, 'getCarById').and.callThrough();
      component.ngOnInit();
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(carServiceStub.getCarById).toHaveBeenCalled();
    });
  });

  describe('onSubmit', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const carServiceStub: CarService = fixture.debugElement.injector.get(
        CarService
      );
      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(carServiceStub, 'updateCar').and.callThrough();
      component.onSubmit();
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(carServiceStub.updateCar).toHaveBeenCalled();
    });
  });

  describe('cancelEdit', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.cancelEdit();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
});
