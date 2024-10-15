import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FondosService } from './fondos.service';
import { environment } from 'src/environments/environment.prod';

describe('FondosService', () => {
  let service: FondosService;
  let httpMock: HttpTestingController;

  const apiUrl = environment.apiUrl+'/fondos'; // La URL de la API

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FondosService],
    });

    service = TestBed.inject(FondosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya solicitudes pendientes
  });

  it('debería crear el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería realizar una solicitud GET para obtener fondos', () => {
    const mockFondos = [{ fondoId: 1, nombre: 'Fondo A' }, { fondoId: 2, nombre: 'Fondo B' }]; // Datos de prueba

    service.getFondos().subscribe(fondos => {
      expect(fondos).toEqual(mockFondos); // Asegúrate de que la respuesta sea como se espera
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockFondos); // Simula la respuesta del servidor
  });
});
