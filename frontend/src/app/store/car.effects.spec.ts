import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { Actions } from '@ngrx/effects';
import { CarEffects } from './car.effects';

describe('CarEffects', () => {
  let service: CarEffects;

  beforeEach(() => {
    const actionsStub = () => ({});
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CarEffects, { provide: Actions, useFactory: actionsStub }]
    });
    service = TestBed.inject(CarEffects);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
