import { Component,Inject } from '@angular/core';
import { ModalServiceService } from '../../servicios/modal-service.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  modalDatos:any;
constructor(@Inject(MAT_DIALOG_DATA) public data: any,private modalServiceService:ModalServiceService,){
  this.modalDatos=data;

}

close(){
  this.modalServiceService.closeModal();

}
}

