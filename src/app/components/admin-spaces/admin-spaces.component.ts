import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpacesService } from 'src/app/services/spaces.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-spaces',
  templateUrl: './admin-spaces.component.html',
  styleUrls: ['./admin-spaces.component.css']
})
export class AdminSpacesComponent implements OnInit {
  spaces: any[] = [];
  spaceForm: FormGroup;
  isEditing = false;
  editingSpaceId: number | null = null;
  displayedColumns: string[] = ['id', 'name', 'capacity', 'actions'];

  constructor(
    private spaceService: SpacesService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.spaceForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(1)]],
      location: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadSpaces();
  }

  loadSpaces(): void {
    this.spaceService.getSpaces().subscribe(
      (spaces) => this.spaces = spaces,
      (error) => this.showSnackBar('Error al cargar los espacios')
    );
  }

  onSubmit(): void {
    if (this.spaceForm.valid) {
      if (this.isEditing) {
        this.updateSpace();
      } else {
        this.addSpace();
      }
    }
  }

  addSpace(): void {
    this.router.navigate(['/admin/espacios/nuevo']);
  }

  updateSpace(): void {
    if (this.editingSpaceId) {
      this.spaceService.updateSpace(String(this.editingSpaceId), this.spaceForm.value).subscribe(
        () => {
          this.loadSpaces();
          this.resetForm();
          this.showSnackBar('Espacio actualizado con éxito');
        },
        (error) => this.showSnackBar('Error al actualizar el espacio')
      );
    }
  }

  editSpace(id: any): void {
    this.router.navigate([`/admin/espacios/${id}/editar`]);
  }

  deleteSpace(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este espacio?')) {
      this.spaceService.deleteSpace(id.toString()).subscribe(
        () => {
          this.loadSpaces();
          this.showSnackBar('Espacio eliminado con éxito');
        },
        (error) => this.showSnackBar('Error al eliminar el espacio')
      );
    }
  }

  resetForm(): void {
    this.spaceForm.reset({isAvailable: true});
    this.isEditing = false;
    this.editingSpaceId = null;
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 3000
    });
  }
}