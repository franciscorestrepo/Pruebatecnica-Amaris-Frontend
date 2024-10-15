import { Component } from '@angular/core';
import { Router } from '@angular/router';

//servicios
import { ClientesService } from 'src/app/servicios/clientes.service';
import { FondosService } from 'src/app/servicios/fondos.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent {

  transacciones: any[] = [];
  catFondos: any[] = [];
  ngOnInit(): void {
  }

  constructor(private router: Router,clienteService:ClientesService,fondosService:FondosService) {



    clienteService.getClientesTransacciones().subscribe(
      (data) => { this.transacciones = data;
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

}
export interface Transaccion {
  transaccionId: string;
  clienteId: string;
  fondoId: number;
  tipo: string;
  monto: number;
  timestamp: string;
  estado: string;
  mensaje: string;
}


