import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { ModalServiceService } from '../../servicios/modal-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { of } from 'rxjs';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let mockModalService: jasmine.SpyObj<ModalServiceService>;

  beforeEach(async () => {
    // Configurando el mock para ModalServiceService
    mockModalService = jasmine.createSpyObj('ModalServiceService', ['closeModal']);

    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
      providers: [
        { provide: ModalServiceService, useValue: mockModalService },
        { provide: MAT_DIALOG_DATA, useValue: { titulo: 'Test', descripcion: 'Test Description', estado: 'success' } } // Datos de prueba
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería recibir datos a través de la inyección', () => {
    expect(component.modalDatos).toEqual({ titulo: 'Test', descripcion: 'Test Description', estado: 'success' });
  });

  it('debería cerrar el modal al llamar a close()', () => {
    component.close();
    expect(mockModalService.closeModal).toHaveBeenCalled(); // Verifica que se llama al método closeModal del servicio
  });
});
