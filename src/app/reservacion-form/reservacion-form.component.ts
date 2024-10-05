import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservationsService } from '../services/reservations.service';

@Component({
  selector: 'app-reservacion-form',
  templateUrl: './reservacion-form.component.html',
  styleUrls: ['./reservacion-form.component.css']
})
export class ReservacionFormComponent implements OnInit {
  reservacionForm: FormGroup;
  espacioId: number | undefined;
  reservacionId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private reservacionService: ReservationsService
  ) {
    this.reservacionForm = this.fb.group({
      fecha: ['', Validators.required],
      horaInicio: ['', Validators.required],
      horaFin: ['', Validators.required],
      descripcion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.espacioId = +this.route.snapshot.paramMap.get('espacioId')!;
    const reservacionId = this.route.snapshot.paramMap.get('reservacionId');
    if (reservacionId) {
      this.reservacionId = +reservacionId;
      this.cargarReservacion();
    }
  }

  cargarReservacion(): void {
    if (this.reservacionId) {
      this.reservacionService.getReservation(this.reservacionId.toString()).subscribe(
        reservacion => {
          this.reservacionForm.patchValue(reservacion);
        },
        error => console.error('Error al cargar la reservación', error)
      );
    }
  }

  onSubmit(): void {
    if (this.reservacionForm.valid) {
      const formValues = this.reservacionForm.value;
      
      // Combinar fecha con hora de inicio y fin
      const startDate = new Date(formValues.fecha);
      const endDate = new Date(formValues.fecha);
      
      const [startHours, startMinutes] = formValues.horaInicio.split(':');
      const [endHours, endMinutes] = formValues.horaFin.split(':');
      
      startDate.setHours(parseInt(startHours), parseInt(startMinutes));
      endDate.setHours(parseInt(endHours), parseInt(endMinutes));

      const reservacion = {
        space_id: this.espacioId,
        event_name: formValues.descripcion,
        start: startDate.toISOString().slice(0, 19).replace('T', ' '),
        end: endDate.toISOString().slice(0, 19).replace('T', ' ')
      };

      console.log(reservacion, this.reservacionId);

      if (this.reservacionId) {
        this.reservacionService.updateReservation(this.reservacionId.toString(), reservacion).subscribe(
          () => this.router.navigate(['/reservations']),
          error => console.error('Error al actualizar la reservación', error)
        );
      } else {
        this.reservacionService.createReservation(reservacion).subscribe(
          () => this.router.navigate(['/reservations']),
          error => console.error('Error al crear la reservación', error)
        );
      }
    }
  }
}
