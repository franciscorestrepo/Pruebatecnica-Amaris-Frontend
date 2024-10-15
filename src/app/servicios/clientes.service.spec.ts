import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ClientesService } from './clientes.service';
import { environment } from 'src/environments/environment.prod';


describe('ClientesService', () => {
  let service: ClientesService;
  let httpMock: HttpTestingController;

  const apiUrl = environment.apiUrl+'/clientes'; // La URL de la API

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClientesService],
    });

    service = TestBed.inject(ClientesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('debería crear el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería realizar una solicitud POST para postClientesTransaccion', () => {
    const mockData = { clienteId: '1030', valor: 5000 }; // Datos de prueba

    service.postClientesTransaccion(mockData).subscribe(response => {
      expect(response).toEqual({ success: true }); // Asegúrate de que la respuesta sea como se espera
    });

    const req = httpMock.expectOne(`${apiUrl}/suscribir`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    req.flush({ success: true }); // Simula la respuesta del servidor
  });

  it('debería realizar una solicitud GET para getCliente', () => {
    const mockCliente = { id: '1030', nombre: 'Juan' }; // Datos de prueba

    service.getCliente().subscribe(cliente => {
      expect(cliente).toEqual(mockCliente); // Asegúrate de que la respuesta sea como se espera
    });

    const req = httpMock.expectOne(`${apiUrl}/1030/info`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCliente); // Simula la respuesta del servidor
  });

  it('debería realizar una solicitud GET para getClientesTransacciones', () => {
    const mockTransacciones = [{ transaccionId: '1', monto: 5000 }]; // Datos de prueba

    service.getClientesTransacciones().subscribe(transacciones => {
      expect(transacciones).toEqual(mockTransacciones); // Asegúrate de que la respuesta sea como se espera
    });

    const req = httpMock.expectOne(`${apiUrl}/1030/transacciones`);
    expect(req.request.method).toBe('GET');
    req.flush(mockTransacciones); // Simula la respuesta del servidor
  });

  it('debería realizar una solicitud POST para getEliminarTransaccion', () => {
    const mockData = { clienteId: '1030', fondoId: 1 }; // Datos de prueba

    service.getEliminarTransaccion(mockData).subscribe(response => {
      expect(response).toEqual({ success: true }); // Asegúrate de que la respuesta sea como se espera
    });

    const req = httpMock.expectOne(`${apiUrl}/cancelar-suscripcion`);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    req.flush({ success: true }); // Simula la respuesta del servidor
  });
});
