import { Component, OnInit, inject } from '@angular/core';
import { EquiposService } from '../../services/equipos.service';
import { MatSelectModule } from '@angular/material/select';
import { NgFor, NgIf } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { confirmDialog } from '../sharedDialogs/ConfirmDelete/confirmDialog';
import { MatButtonModule } from '@angular/material/button';
import { JugadoreServiceService } from '../../services/jugadore-service.service';
import { successDialog } from '../sharedDialogs/successDialog';
import { equipoAddDialog } from './equiposDialog/equipoAddDialog';

@Component({
  selector: 'app-equipos',
  standalone: true,
  imports: [MatSelectModule, NgIf, NgFor, MatTableModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './equipos.component.html',
  styleUrl: './equipos.component.css'
})
export class EquiposComponent implements OnInit{
  readonly dialog = inject(MatDialog)
  public lst : any;
  public lstSelected : any;
  public playersList : any = [];
  public playerAddList : any = []
  displayedColumns: string[] = ['nombre', 'posicion', 'categoria', 'actions'];  // Columnas a mostrar en la tabla
  constructor(private _service: EquiposService, private _jugadoresService : JugadoreServiceService){
    this._service.verEquipos().subscribe(x => {
      console.log(x);
      
    })
  }
ngOnInit(): void {
  this.verEquiposClub();
  this.cargarJugadoresNuevo();
}
openDialog(){
  this.dialog.open(equipoAddDialog).afterClosed().subscribe(x =>{
    this.verEquiposClub();
  })
}
verEquiposClub(){
  this._service.verEquiposClub("UCB23548").subscribe(x => {
    this.lst = x.data;
    if (this.lst && this.lst.length > 0) {
      this.lstSelected = this.lst[0];  // Seleccionar el primer equipo por defecto
      this.playersList = this.lstSelected.jugadores;  // Jugadores del equipo seleccionado
    }
  });
}
cargarJugadoresNuevo(){
  this._jugadoresService.verJugadoresClub("UCB23548").subscribe(x =>{
    this.playerAddList = x.data;
  })
}
onTeamSelected(equipo: any) {
  this.lstSelected = equipo;
  this.playersList = equipo.jugadores;  // Actualizar la lista de jugadores
}
quitarjugador(id: number, ci: string){
  this.dialog.open(confirmDialog).afterClosed().subscribe(i =>{
    if(i)
    {
      this._service.eliminarJugadorEq(id, ci).subscribe(x =>{
        this.dialog.open(successDialog, { data : x}).afterClosed().subscribe(e => {
          this.verEquiposClub();
        })
      })
    }
  })
}
registrarJugadorEq(id: number, ci: string){
  this.dialog.open(confirmDialog).afterClosed().subscribe(i =>{
    if(i)
    {
      this._service.registrarJugadorEquipo(id, ci).subscribe(x =>{
        this.dialog.open(successDialog, { data : x}).afterClosed().subscribe(e => {
          this.verEquiposClub();
        })
      })
    }
  })
}
}
