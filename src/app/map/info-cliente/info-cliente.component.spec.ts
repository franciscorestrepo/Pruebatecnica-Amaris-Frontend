import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoClienteComponent } from './info-cliente.component';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { of } from 'rxjs';

describe('InfoClienteComponent', () => {
  let component: InfoClienteComponent;
  let fixture: ComponentFixture<InfoClienteComponent>;
  let clienteServiceMock: any;

  beforeEach(() => {
    clienteServiceMock = {
      getCliente: jasmine.createSpy('getCliente').and.returnValue(of({ nombre: 'Juan', saldoRestante: 5000 }))
    };

    TestBed.configureTestingModule({
      declarations: [InfoClienteComponent],
      providers: [
        { provide: ClientesService, useValue: clienteServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(InfoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // Prueba 1: Verificar que el componente se crea correctamente
  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  // Prueba 2: Verificar que el servicio ClientesService se llama y asigna el cliente correctamente
  it('debería asignar el cliente obtenido del servicio', () => {
    expect(component.cliente).toEqual({ nombre: 'Juan', saldoRestante: 5000 });
    expect(clienteServiceMock.getCliente).toHaveBeenCalled();
  });
});
