import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [AuthService] });
    service = TestBed.inject(AuthService);
  });

  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('getUsername', () => {
    it('makes expected calls', () => {
      spyOn(component, 'getLoggedInUser').and.callThrough();
      service.getUsername();
      expect(service.getLoggedInUser).toHaveBeenCalled();
    });
  });
});
