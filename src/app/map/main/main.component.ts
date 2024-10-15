import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {
  constructor(private router: Router) {}


  historial(){
    this.router.navigate(['/app-historial']);
  }

  agregar(){
    this.router.navigate(['/app-agregar']);
  }

  eliminar(){
    this.router.navigate(['/app-eliminar']);
  }
}
