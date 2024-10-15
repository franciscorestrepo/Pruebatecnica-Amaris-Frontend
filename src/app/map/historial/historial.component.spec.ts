import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialComponent } from './historial.component';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { FondosService } from 'src/app/servicios/fondos.service';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('HistorialComponent', () => {
  let component: HistorialComponent;
  let fixture: ComponentFixture<HistorialComponent>;
  let clienteServiceMock: any;
  let fondosServiceMock: any;
  let routerMock: any;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [HistorialComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
    clienteServiceMock = {
      getClientesTransacciones: jasmine.createSpy('getClientesTransacciones').and.returnValue(of([
        { transaccionId: '1', clienteId: '101', fondoId: 1, tipo: 'inversión', monto: 10000, timestamp: '2023-01-01', estado: 'completada', mensaje: 'Éxito' },
        { transaccionId: '2', clienteId: '102', fondoId: 2, tipo: 'retiro', monto: 5000, timestamp: '2023-01-02', estado: 'completada', mensaje: 'Éxito' }
      ]))
    };

    fondosServiceMock = {
      getFondos: jasmine.createSpy('getFondos').and.returnValue(of([]))
    };

    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      declarations: [HistorialComponent],
      providers: [
        { provide: ClientesService, useValue: clienteServiceMock },
        { provide: FondosService, useValue: fondosServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Llama a ngOnInit
  });

  it('debería asignar transacciones al componente', () => {
    expect(component.transacciones.length).toBe(2); // Verifica que se asignen dos transacciones
    expect(component.transacciones[0].transaccionId).toBe('1'); // Verifica el ID de la primera transacción
  });
});
