import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  readonly  apiUrl = environment.apiUrl+'/clientes'; // La URL de la API

  constructor(private http: HttpClient) { }

  // Método para hacer la solicitud POST
  postClientesTransaccion(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl+'/suscribir', data, { headers });
  }

  getCliente(): Observable<any> {
    return this.http.get(this.apiUrl+'/1030/info');
  }

  getClientesTransacciones(): Observable<any> {
    return this.http.get(this.apiUrl+'/1030/transacciones');
  }

  getEliminarTransaccion(data: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrl+'/cancelar-suscripcion', data, { headers });
  }
}
