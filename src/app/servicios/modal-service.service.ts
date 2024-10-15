import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modals/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalServiceService {

  constructor(private dialog:MatDialog) { }

  openModal(data: any){
    return this.dialog.open(ModalComponent, {
      data: data
});


  }

  closeModal(){
    this.dialog.closeAll();
  }
}
