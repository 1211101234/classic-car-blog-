import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { CarService } from '../../services/cars';
import { RouterTestingModule } from '@angular/router/testing';
import { CarList } from './car-list';

describe('CarList', () => {
  let component: CarList;
  let fixture: ComponentFixture<CarList>;

  beforeEach(() => {
    const routerStub = () => ({ navigate: array => ({}) });
    const carServiceStub = () => ({
      getCars: () => ({ subscribe: f => f({}) }),
      deleteCar: id => ({ subscribe: f => f({}) })
    });
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [CarList],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: CarService, useFactory: carServiceStub }
      ]
    });
    fixture = TestBed.createComponent(CarList);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`cars has default value`, () => {
    expect(component.cars).toEqual([]);
  });

  it(`filteredCars has default value`, () => {
    expect(component.filteredCars).toEqual([]);
  });

  it(`currentSortKey has default value`, () => {
    expect(component.currentSortKey).toEqual(`origin`);
  });

  it(`ascending has default value`, () => {
    expect(component.ascending).toEqual(true);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'loadCars').and.callThrough();
      component.ngOnInit();
      expect(component.loadCars).toHaveBeenCalled();
    });
  });

  describe('loadCars', () => {
    it('makes expected calls', () => {
      const carServiceStub: CarService = fixture.debugElement.injector.get(
        CarService
      );
      spyOn(carServiceStub, 'getCars').and.callThrough();
      component.loadCars();
      expect(carServiceStub.getCars).toHaveBeenCalled();
    });
  });

  describe('addCar', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      spyOn(routerStub, 'navigate').and.callThrough();
      component.addCar();
      expect(routerStub.navigate).toHaveBeenCalled();
    });
  });
});
