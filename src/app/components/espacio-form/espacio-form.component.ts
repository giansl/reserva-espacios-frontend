import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SpacesService } from '../../services/spaces.service';
import { NotificacionesService } from '../../services/notificaciones.service';

@Component({
  selector: 'app-espacio-form',
  templateUrl: './espacio-form.component.html',
  styleUrls: ['./espacio-form.component.css']
})
export class EspacioFormComponent implements OnInit {
  espacioForm: FormGroup;
  isEditing: boolean = false;
  espacioId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private spaceService: SpacesService,
    private notificacionesService: NotificacionesService
  ) {
    this.espacioForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      capacity: ['', [Validators.required, Validators.min(1)]],
      description: ['', Validators.required],
      type: ['general', Validators.required]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      console.log(params);
      this.espacioId = params.get('espacioId');
      if (this.espacioId) {
        this.isEditing = true;
        this.cargarEspacio(this.espacioId);
      }
    });
  }

  cargarEspacio(id: string) {
    this.spaceService.getSpace(id).subscribe({
      next: (espacio) => {
        this.espacioForm.patchValue({
          name: espacio.name,
          capacity: espacio.capacity,
          description: espacio.description,
          type: espacio.type
        });
      },
      error: (error) => {
        console.error('Error al cargar el espacio', error);
        this.notificacionesService.showError('No se pudo cargar la información del espacio');
      }
    });
  }

  onSubmit() {
    if (this.espacioForm.valid) {
      const espacioData = this.espacioForm.value;
      if (this.isEditing && this.espacioId) {
        this.spaceService.updateSpace(this.espacioId, espacioData).subscribe({
          next: () => {
            this.notificacionesService.showSuccess('Espacio actualizado con éxito');
            this.router.navigate(['/admin/espacios']);
          },
          error: (error) => {
            console.error('Error al actualizar el espacio', error);
            this.notificacionesService.showError('Error al actualizar el espacio');
          }
        });
      } else {
        this.spaceService.createSpace(espacioData).subscribe({
          next: () => {
            this.notificacionesService.showSuccess('Espacio creado con éxito');
            this.router.navigate(['/admin/espacios']);
          },
          error: (error) => {
            console.error('Error al crear el espacio', error);
            this.notificacionesService.showError('Error al crear el espacio');
          }
        });
      }
    }
  }
}