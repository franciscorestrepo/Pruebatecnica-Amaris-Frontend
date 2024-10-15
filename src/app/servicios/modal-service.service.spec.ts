import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { ModalServiceService } from './modal-service.service';
import { ModalComponent } from '../modals/modal/modal.component';
import { of } from 'rxjs';

describe('ModalServiceService', () => {
  let service: ModalServiceService;
  let dialogMock: jasmine.SpyObj<MatDialog>;

  beforeEach(() => {
    const dialogSpy = jasmine.createSpyObj('MatDialog', ['open', 'closeAll']);

    TestBed.configureTestingModule({
      providers: [
        ModalServiceService,
        { provide: MatDialog, useValue: dialogSpy },
      ],
    });

    service = TestBed.inject(ModalServiceService);
    dialogMock = TestBed.inject(MatDialog) as jasmine.SpyObj<MatDialog>;
  });

  it('debería crear el servicio', () => {
    expect(service).toBeTruthy();
  });



  it('debería cerrar todos los modales', () => {
    service.closeModal();
    expect(dialogMock.closeAll).toHaveBeenCalled();
  });
});
