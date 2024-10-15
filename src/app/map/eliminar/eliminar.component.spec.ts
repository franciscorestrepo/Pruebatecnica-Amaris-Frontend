import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EliminarComponent } from './eliminar.component';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { FondosService } from 'src/app/servicios/fondos.service';
import { ModalServiceService } from 'src/app/servicios/modal-service.service';
import { of } from 'rxjs';
import { InfoClienteComponent } from '../info-cliente/info-cliente.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('EliminarComponent', () => {
  let component: EliminarComponent;
  let fixture: ComponentFixture<EliminarComponent>;
  let clienteServiceMock: any;
  let fondosServiceMock: any;
  let routerMock: any;
  let modalServiceMock: any;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [EliminarComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    clienteServiceMock = {
      getClientesTransacciones: jasmine.createSpy('getClientesTransacciones').and.returnValue(of([
        { transaccionId: '1', clienteId: '101', fondoId: 1, tipo: 'Apertura', monto: 10000 },
        { transaccionId: '2', clienteId: '102', fondoId: 2, tipo: 'Cierre', monto: 5000 }
      ]))
    };

    fondosServiceMock = {
      getFondos: jasmine.createSpy('getFondos').and.returnValue(of([]))
    };

    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    modalServiceMock = {
      openModal: jasmine.createSpy('openModal').and.returnValue({
        afterClosed: () => of(null)
      })
    };

    TestBed.configureTestingModule({
      declarations: [EliminarComponent],
      providers: [
        { provide: ClientesService, useValue: clienteServiceMock },
        { provide: FondosService, useValue: fondosServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ModalServiceService, useValue: modalServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EliminarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // Llama a ngOnInit
  });

  it('debería filtrar las transacciones de tipo Apertura', () => {
    expect(component.transacciones.length).toBe(1); // Verifica que solo haya una transacción de tipo Apertura
    expect(component.transacciones[0].transaccionId).toBe('1'); // Verifica el ID de la transacción filtrada
  });
});
