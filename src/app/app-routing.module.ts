import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationsListComponent } from './components/reservations-list/reservations-list.component';
import { LoginComponent } from './components/login/login.component';
import { SpacesListComponent } from './components/spaces-list/spaces-list.component';
import { ReservacionFormComponent } from './reservacion-form/reservacion-form.component';
import { AdminSpacesComponent } from './components/admin-spaces/admin-spaces.component';
import { EspacioFormComponent } from './components/espacio-form/espacio-form.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'reservations', component: ReservationsListComponent },
  { path: 'spaces', component: SpacesListComponent },
  { path: 'espacios/:espacioId/reservar', component: ReservacionFormComponent },
  { path: 'reservaciones/:reservacionId/editar', component: ReservacionFormComponent },
  { path: 'admin/espacios', component: AdminSpacesComponent },
  { path: 'admin/espacios/nuevo', component: EspacioFormComponent },
  { path: 'admin/espacios/:espacioId/editar', component: EspacioFormComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
