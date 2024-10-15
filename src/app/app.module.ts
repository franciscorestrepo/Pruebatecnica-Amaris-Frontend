import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { APP_ROUTING } from './app-routing.module';

import { AppComponent } from './app.component';
import { MainComponent } from './map/main/main.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AgregarComponent } from './map/agregar/agregar.component';
import { EliminarComponent } from './map/eliminar/eliminar.component';
import { HistorialComponent } from './map/historial/historial.component';
import { InfoClienteComponent } from './map/info-cliente/info-cliente.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TabHistorialComponent } from './map/tab-historial/tab-historial.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalComponent } from './modals/modal/modal.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AgregarComponent,
    EliminarComponent,
    HistorialComponent,
    InfoClienteComponent,
    TabHistorialComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    APP_ROUTING,
    RouterModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
