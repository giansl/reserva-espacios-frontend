import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SpacesService } from '../../services/spaces.service';
import { NotificacionesService } from 'src/app/services/notificaciones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-spaces-list',
  templateUrl: './spaces-list.component.html',
  styleUrls: ['./spaces-list.component.css']
})
export class SpacesListComponent implements OnInit {
  spaces: any[] = [];
  displayedColumns: string[] = ['name', 'type', 'capacity', 'location', 'availability', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private spaceService: SpacesService,
    private notificacionesService: NotificacionesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadSpaces();
  }

  loadSpaces() {
    this.spaceService.getSpaces().subscribe(
      (spaces) => {
        this.spaces = spaces;
        this.dataSource = new MatTableDataSource(this.spaces);
        this.dataSource.sort = this.sort;
      },
      (error) => {
        console.error('Error al cargar los espacios', error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteSpace(id: string) {
    this.spaceService.deleteSpace(id).subscribe(
      () => {
        this.notificacionesService.showSuccess('Espacio eliminado con éxito');
        this.loadSpaces(); // Recargar la lista después de eliminar
      },
      (error) => {
        console.error('Error al eliminar el espacio:', error);
        this.notificacionesService.showError('No se pudo eliminar el espacio');
      }
    );
  }

  editSpace(id: string) {
    // Implementa la lógica para editar un espacio
    console.log('Editando espacio con ID:', id);
    // Por ejemplo: this.router.navigate(['/edit-space', id]);
  }

  agregarReservacion(id: string) {
    this.router.navigate([`/espacios/${id}/reservar`]);
  }

}
