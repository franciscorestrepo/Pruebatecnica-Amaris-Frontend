import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarComponent } from './agregar.component';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { FondosService } from 'src/app/servicios/fondos.service';
import { ModalServiceService } from 'src/app/servicios/modal-service.service';
import { of } from 'rxjs';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { InfoClienteComponent } from '../info-cliente/info-cliente.component';
describe('AgregarComponent', () => {
  let component: AgregarComponent;
  let fixture: ComponentFixture<AgregarComponent>;
  let clienteServiceMock: any;
  let fondosServiceMock: any;
  let routerMock: any;
  let modalServiceMock: any;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [AgregarComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    clienteServiceMock = {
      getCliente: jasmine.createSpy('getCliente').and.returnValue(of({ saldoRestante: 100000 })),
      postClientesTransaccion: jasmine.createSpy('postClientesTransaccion').and.returnValue(of({}))
    };

    fondosServiceMock = {
      getFondos: jasmine.createSpy('getFondos').and.returnValue(of([
        { fondoId: 1, montoMinimo: 50000 },
        { fondoId: 2, montoMinimo: 75000 }
      ]))
    };

    routerMock = jasmine.createSpyObj('Router', ['navigate']);
    modalServiceMock = {
      openModal: jasmine.createSpy('openModal').and.returnValue({
        afterClosed: () => of(null)
      })
    };

    TestBed.configureTestingModule({
      declarations: [AgregarComponent],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: ClientesService, useValue: clienteServiceMock },
        { provide: FondosService, useValue: fondosServiceMock },
        { provide: FormBuilder, useClass: FormBuilder },
        { provide: ModalServiceService, useValue: modalServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Llama a ngOnInit
  });


});
