import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { AuthEffects } from './auth.effects';

describe('AuthEffects', () => {
  let service: AuthEffects;

  beforeEach(() => {
    const actionsStub = () => ({});
    TestBed.configureTestingModule({
      providers: [AuthEffects, { provide: Actions, useFactory: actionsStub }]
    });
    service = TestBed.inject(AuthEffects);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
