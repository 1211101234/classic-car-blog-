import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from './navbar';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(() => {
    const routerStub = () => ({ navigate: array => ({}) });
    const authServiceStub = () => ({
      isLoggedIn: () => ({}),
      logout: () => ({})
    });
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [NavbarComponent],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: AuthService, useFactory: authServiceStub }
      ]
    });
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
  });

  it('can load instance', () => {
    expect(component).toBeTruthy();
  });

  it(`menuItems has default value`, () => {
    expect(component.menuItems).toEqual([]);
  });

  describe('ngOnInit', () => {
    it('makes expected calls', () => {
      spyOn(component, 'buildMenu').and.callThrough();
      component.ngOnInit();
      expect(component.buildMenu).toHaveBeenCalled();
    });
  });

  describe('buildMenu', () => {
    it('makes expected calls', () => {
      const authServiceStub: AuthService = fixture.debugElement.injector.get(
        AuthService
      );
      spyOn(authServiceStub, 'isLoggedIn').and.callThrough();
      component.buildMenu();
      expect(authServiceStub.isLoggedIn).toHaveBeenCalled();
    });
  });

  describe('logout', () => {
    it('makes expected calls', () => {
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const authServiceStub: AuthService = fixture.debugElement.injector.get(
        AuthService
      );
      spyOn(component, 'buildMenu').and.callThrough();
      spyOn(routerStub, 'navigate').and.callThrough();
      spyOn(authServiceStub, 'logout').and.callThrough();
      component.logout();
      expect(component.buildMenu).toHaveBeenCalled();
      expect(routerStub.navigate).toHaveBeenCalled();
      expect(authServiceStub.logout).toHaveBeenCalled();
    });
  });
});
