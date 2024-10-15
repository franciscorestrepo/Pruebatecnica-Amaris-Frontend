import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FondosService {

  readonly  apiUrl = environment.apiUrl+'/fondos'; // La URL de la API

  constructor(private http: HttpClient) { }

  // Método para hacer la solicitud POST

  getFondos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
