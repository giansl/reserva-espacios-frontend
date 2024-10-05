import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { ReservationsListComponent } from './components/reservations-list/reservations-list.component';
import { SpacesListComponent } from './components/spaces-list/spaces-list.component';
import { ReservacionFormComponent } from './reservacion-form/reservacion-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { AdminSpacesComponent } from './components/admin-spaces/admin-spaces.component';
import { EspacioFormComponent } from './components/espacio-form/espacio-form.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ReservationsListComponent,
    SpacesListComponent,
    ReservacionFormComponent,
    AdminSpacesComponent,
    EspacioFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    AppRoutingModule,
    MatSnackBarModule,
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatOptionModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
