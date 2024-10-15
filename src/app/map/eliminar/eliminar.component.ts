import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { FondosService } from 'src/app/servicios/fondos.service';
import { ModalComponent } from '../../modals/modal/modal.component';
import { ModalServiceService } from 'src/app/servicios/modal-service.service';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.scss']
})
export class EliminarComponent {
  transacciones: any[] = [];
  catFondos:any[]=[];
  infoEliminacion:any={};
  clienteFondo: ClienteFondo= { clienteId: '', fondoId: 0 };

  constructor(private router: Router, private clienteService:ClientesService,
    fondosService:FondosService, private modalServiceService:ModalServiceService) {
  clienteService.getClientesTransacciones().subscribe(
    (data) => { this.transacciones = data;
      this.transacciones=this.transacciones.filter(transaccion => transaccion.tipo === "Apertura");
      console.log(this.transacciones)// Asignar el JSON recibido a la variable clientes
    },
    (error) => {console.error('Error al obtener los clientes:', error);}
  );

  fondosService.getFondos().subscribe(
    (data) => { this.catFondos = data;
      console.log(this.catFondos)// Asignar el JSON recibido a la variable clientes
    },
    (error) => {console.error('Error al obtener los Fondos:', error);}
  );
}
  devolverse(){
    this.router.navigate(['/app-main']);
  }

  getFondoNombre(fondoId: number): string {
    const fondo = this.catFondos.find(f => f.fondoId === fondoId);
    return fondo ? fondo.nombre : 'Fondo desconocido';
  }

  getTipoFondo(fondoId: number): string {
    const fondo = this.catFondos.find(f => f.fondoId === fondoId);
    return fondo ? fondo.categoria : 'fondo desconocido';
  }
  eliminarTransaccion(evento:any){

    this.clienteFondo = {
      clienteId: evento.clienteId,
      fondoId: evento.fondoId,
    };


    this.clienteService.getEliminarTransaccion(this.clienteFondo).subscribe(
      (data) => { this.infoEliminacion = data;
        console.log(this.infoEliminacion)// Asignar el JSON recibido a la variable clientes
      },
      (error) => {console.error('Error al eliminar proceso:', error);}
    );

    const modalData: modalInfo = {
      titulo: '¡Eliminacion correcta!',
      descripcion: 'Puedes seguir eliminando procesos si desea',
      estado: 'sucess'
    };
 const dialogf= this.modalServiceService.openModal(modalData);
 dialogf.afterClosed().subscribe(result => {
  console.log('El modal se cerró.');
  window.location.reload();
});
  };
}

export interface ClienteFondo {
  clienteId: string;
  fondoId: number;
}

export interface modalInfo {
  titulo: string;
  descripcion: string;
  estado: string;

}
