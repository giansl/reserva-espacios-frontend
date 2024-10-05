import { Component, OnInit } from '@angular/core';
import { ReservationsService } from '../../services/reservations.service';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservations-list',
  templateUrl: './reservations-list.component.html',
  styleUrls: ['./reservations-list.component.css']
})
export class ReservationsListComponent implements OnInit {
  reservations: any[] = [];
  displayedColumns: string[] = ['event', 'space', 'type', 'start', 'end', 'actions'];

  constructor(
    private reservationsService: ReservationsService,
    private notificationsService: NotificacionesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadReservations();
  }

  loadReservations() {
    this.reservationsService.getUserReservations().subscribe(
      (data) => {
        this.reservations = data;
        console.log(this.reservations);
      },
      (error) => {
        console.error('Error al cargar reservas:', error);
        this.notificationsService.showError('No se pudieron cargar las reservas');
      }
    );
  }

  cancelReservation(id: string) {
    this.reservationsService.cancelReservation(id).subscribe(
      () => {
        this.notificationsService.showSuccess('Reserva cancelada con éxito');
        this.loadReservations(); // Recargar la lista después de cancelar
      },
      (error) => {
        console.error('Error al cancelar la reserva:', error);
        this.notificationsService.showError('No se pudo cancelar la reserva');
      }
    );
  }

  formatDate(date: string | Date): string {
    return formatDate(date, 'dd/MM/yyyy HH:mm', 'es');
  }

  agregarEspacio() {
    this.router.navigate(['/spaces']);
  }
}
