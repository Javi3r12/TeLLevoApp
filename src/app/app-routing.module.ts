import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MapDirreccionViajeComponent } from './components/map-dirreccion-viaje/map-dirreccion-viaje.component'; 

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'registrar-viaje',
    loadChildren: () => import('./pages/registrar-viaje/registrar-viaje.module').then( m => m.RegistrarViajePageModule)
  },
  {
    path: 'pago/:id',
    loadChildren: () => import('./pages/pago/pago.module').then( m => m.PagoPageModule)
  },
  {
    path: 'olvido',
    loadChildren: () => import('./pages/olvido/olvido.module').then( m => m.OlvidoPageModule)
  },{
    path: 'detalle-viaje/:id', 
    loadChildren: () => import('./pages/detalle-viaje/detalle-viaje.module').then( m => m.DetalleViajePageModule)  
  },
  {
    path: 'registrar-vehiculo',
    loadChildren: () => import('./pages/registrar-vehiculo/registrar-vehiculo.module').then( m => m.RegistrarVehiculoPageModule)
  },
  {
    path: 'historial-viajes',
    loadChildren: () => import('./pages/historial-viajes/historial-viajes.module').then( m => m.HistorialViajesPageModule)
  },
  {
    path: 'gestion-vehiculos',
    loadChildren: () => import('./pages/gestion-vehiculos/gestion-vehiculos.module').then( m => m.GestionVehiculosPageModule)
  },
  {
    path: 'gestion-viajes',
    loadChildren: () => import('./pages/gestion-viajes/gestion-viajes.module').then( m => m.GestionViajesPageModule)
  },
  {
    path: 'editar-viaje/:id',
    loadChildren: () => import('./pages/editar-viaje/editar-viaje.module').then( m => m.EditarViajePageModule)
  },
  {
    path: 'editar-vehiculo/:id',
    loadChildren: () => import('./pages/editar-vehiculo/editar-vehiculo.module').then( m => m.EditarVehiculoPageModule)
  },
  { path: 'map-dirreccion-viaje',
    loadComponent: () => import('./components/map-dirreccion-viaje/map-dirreccion-viaje.component').then((m) => m.MapDirreccionViajeComponent)
  },
  { path: 'map-dirreccion-viaje', component: MapDirreccionViajeComponent },
  { path: '', redirectTo: '/map-dirreccion-viaje', pathMatch: 'full' },
  




];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
