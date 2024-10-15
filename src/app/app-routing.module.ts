import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './map/main/main.component';
import { AgregarComponent } from './map/agregar/agregar.component';
import { HistorialComponent } from './map/historial/historial.component';
import { EliminarComponent } from './map/eliminar/eliminar.component';

const routes: Routes = [];

const APP_ROUTES:Routes = [
{path:'',pathMatch:'full',redirectTo:'/app-main'},
{path:'app-main',component:MainComponent},
{path:'app-agregar',component:AgregarComponent},
{path:'app-historial',component:HistorialComponent},
{path:'app-eliminar',component:EliminarComponent}



]
export const APP_ROUTING=RouterModule.forRoot(APP_ROUTES,{useHash:true}) ;
