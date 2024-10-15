import { Component } from '@angular/core';
import { ClientesService } from 'src/app/servicios/clientes.service';

@Component({
  selector: 'app-info-cliente',
  templateUrl: './info-cliente.component.html',
  styleUrls: ['./info-cliente.component.scss']
})
export class InfoClienteComponent {

  cliente:any;

  constructor(clienteService:ClientesService) {
    clienteService.getCliente().subscribe(
      (data) => { this.cliente = data;
        console.log(this.cliente)// Asignar el JSON recibido a la variable clientes
      },
      (error) => {console.error('Error al obtener los clientes:', error);}
    );
  }

}
