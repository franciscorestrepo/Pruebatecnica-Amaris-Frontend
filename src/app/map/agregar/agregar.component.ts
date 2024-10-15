import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientesService } from 'src/app/servicios/clientes.service';
import { FondosService } from 'src/app/servicios/fondos.service';
import { ModalServiceService } from 'src/app/servicios/modal-service.service';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.scss']
})
export class AgregarComponent {

  fondos: any[] = [];
  fondosGroup: FormGroup;
  fondo: any = "75000";
  cliente: any;
   ngOnInint(){}
  constructor(private router: Router, fondoService: FondosService, private fb: FormBuilder,
    private clienteService: ClientesService, private modalServiceService: ModalServiceService) {

    clienteService.getCliente().subscribe(
      (data) => {
        this.cliente = data;
      },
      (error) => { console.error('Error al obtener los clientes:', error); }
    );


    fondoService.getFondos().subscribe(
      (data) => {
        this.fondos = data;
        console.log(this.fondos)// Asignar el JSON recibido a la variable clientes
      },
      (error) => { console.error('Error al obtener los clientes:', error); }
    );



    this.fondosGroup = this.fb.group({
      fondos: [1, Validators.required],
      inversion: ['', [Validators.required, Validators.min(1)]],
      envio: ["1", Validators.required],
      email: ['', [Validators.email, Validators.required]],
      celular: ['', [Validators.pattern(/^[0-9]{10}$/)]]
    });


  }

  cambioFondo() {
    console.log(this.fondosGroup.get('fondos')?.value)
    this.fondo = Number(this.getMontoMinimo(this.fondosGroup.get('fondos')?.value));
    console.log(this.fondo)
  }
  getMontoMinimo(fondoId: number): number | undefined {
    console.log(this.fondos)
    console.log(fondoId)
    const fondo = this.fondos.find(f => f.fondoId === Number(fondoId));
    console.log(fondo)

    return fondo ? fondo.montoMinimo : undefined;
  }

  devolverse() {
    this.router.navigate(['/app-main']);
  }

  enviar() {
    if (Number(this.fondosGroup.get('inversion')?.value) <= Number(this.cliente.saldoRestante)) {
      if (Number(this.fondosGroup.get('inversion')?.value) >= Number(this.fondo)) {
        if (this.fondosGroup.valid) {
          const clienteData: ClienteData = {
            clienteId: "1030",
            fondoId: Number(this.fondosGroup.get('fondos')?.value),
            valor: Number(this.fondosGroup.get('inversion')?.value),
            tipoNotificacion: Number(this.fondosGroup.get('envio')?.value),
            correo: this.fondosGroup.get('email')?.value ?? '',
            celular: this.fondosGroup.get('celular')?.value ?? ''
          };
          console.log(clienteData);

          // Enviar datos usando el servicio
          this.clienteService.postClientesTransaccion(clienteData).subscribe(
            response => {

              console.log(response);
              let modalData: modalInfo={titulo: '', descripcion: '', estado: ''};
              if(response.success){
               modalData = {
                titulo: '¡Operación Exitosa!',
                descripcion: response.message,
                estado: 'sucess'
              };
            }
            else{
              modalData = {
                titulo: '¡Fallo en la operación!',
                descripcion: response.message,
                estado: 'failure'
            };}

              const dialogf = this.modalServiceService.openModal(modalData);
              dialogf.afterClosed().subscribe(result => {
                if(response.success){
                this.router.navigate(['/app-main']);
              }
              });

            },
            error => {
              console.error('Error al enviar los datos', error);
            }
          );
        } else {
          console.log('Formulario inválido');
          Object.keys(this.fondosGroup.controls).forEach(controlName => {
            const control = this.fondosGroup.get(controlName);

            if (control && control.invalid) {
              console.log(`El control "${controlName}" es inválido. Errores:`, control.errors);
            }
          });
        }
      } else {
        const modalData: modalInfo = {
          titulo: '¡Fallo en la operación!',
          descripcion: 'el valor de la inversion debe ser mayor o igual al monto minimo',
          estado: 'failure'
        };

        const dialogf = this.modalServiceService.openModal(modalData);
      }
    }else {
      const modalData: modalInfo = {
        titulo: '¡Falló en la operación!',
        descripcion: 'el valor de la inversion debe ser mayor o igual al saldo restante',
        estado: 'failure'
      };

      const dialogf = this.modalServiceService.openModal(modalData);
    }
  }



  aplicarValidacionesCondicionales(envio: any): void {
    envio = envio.value;

    const emailControl = this.fondosGroup.get('email');
    const celularControl = this.fondosGroup.get('celular');

    if (envio === '1') {
      // Hacer que email sea requerido y celular no
      emailControl?.setValidators([Validators.required, Validators.email]);
      celularControl?.setValidators([Validators.pattern(/^[0-9]{10}$/)]);
    } else if (envio === '2') {
      // Hacer que celular sea requerido y email no
      emailControl?.setValidators([Validators.email]);
      celularControl?.setValidators([Validators.required, Validators.pattern(/^[0-9]{10}$/)]);
    }

    // Asegurarse de llamar a updateValueAndValidity para que las validaciones se apliquen
    emailControl?.updateValueAndValidity();
    celularControl?.updateValueAndValidity();
  }
}


export interface ClienteData {
  clienteId: string;
  fondoId: number;        // ID del fondo seleccionado
  valor: number;     // Monto de inversión
  tipoNotificacion: number;         // Método de contacto (1 = Correo, 2 = Celular)
  correo?: string;        // Opcional, solo si envio es 1
  celular?: string;      // Opcional, solo si envio es 2
}
export interface modalInfo {
  titulo: string;
  descripcion: string;
  estado: string;

}
