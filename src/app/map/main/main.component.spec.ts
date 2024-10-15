import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainComponent } from './main.component';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let router: Router;

  beforeEach(async () => {
    const routerMock = {
      navigate: jasmine.createSpy('navigate') // Mocking the navigate method
    };

    await TestBed.configureTestingModule({
      declarations: [MainComponent],
      providers: [{ provide: Router, useValue: routerMock }], // Use mock router
      schemas: [NO_ERRORS_SCHEMA] // Ignore unknown elements
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router); // Get the mocked router instance
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to app-historial when historial is called', () => {
    component.historial();
    expect(router.navigate).toHaveBeenCalledWith(['/app-historial']);
  });

  it('should navigate to app-agregar when agregar is called', () => {
    component.agregar();
    expect(router.navigate).toHaveBeenCalledWith(['/app-agregar']);
  });

  it('should navigate to app-eliminar when eliminar is called', () => {
    component.eliminar();
    expect(router.navigate).toHaveBeenCalledWith(['/app-eliminar']);
  });
});
