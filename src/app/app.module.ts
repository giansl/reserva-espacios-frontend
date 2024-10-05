import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpacesListComponent } from './components/spaces-list/spaces-list.component';
import { SpaceDetailComponent } from './components/space-detail/space-detail.component';
import { ReservationsListComponent } from './components/reservations-list/reservations-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SpacesListComponent,
    SpaceDetailComponent,
    ReservationsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
