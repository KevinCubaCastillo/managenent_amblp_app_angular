import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { ClubesServiceService } from '../../../services/clubes-service.service';
import { club_add_body } from '../../../Models/Clubes/club_add_body';
import { CommonModule } from '@angular/common';
import { successDialog } from '../../sharedDialogs/successDialog';
import { entrenadorAddBody } from '../../../Models/entrenador_add_body';
import { EntrenadoresService } from '../../../services/entrenadores.service';
import { campeonato_body } from '../../../Models/campeonato_body';
import { OtherService } from '../../../services/other.service';
import { EquiposService } from '../../../services/equipos.service';
import { equipo_body } from '../../../Models/equipo_body';
@Component({
    selector: 'equipoAddDialog',
    templateUrl: 'equipoAddDialog.html',
    standalone: true,
    imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule,MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class equipoAddDialog {
    public nombre : string = "";
    public categoria : number = 1;
    public equipo : equipo_body;
    public genero : boolean = false;
    readonly dialog = inject(MatDialog);

    constructor(
        private _service : EquiposService,
        public dialogRef : MatDialogRef<equipoAddDialog>
    ){
        this.equipo = { idEquipo: 0 ,nombreEquipo: "", idCategoriaEquipo: 1, generoEquipo: true, codClubEquipo: "UCB23548" , idDivision: 1, listaJugadores: [] }
    }
    
  protected readonly value = signal('');

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

  registrarEquipo(){
    this.equipo.nombreEquipo = this.nombre;
    this.equipo.idCategoriaEquipo = this.categoria;
    this.equipo.generoEquipo = this.genero;

    this._service.registrarEquipo(this.equipo).subscribe(x =>{
      if(x.success){
        this.dialogRef.close();
        this.dialog.open(successDialog, {
          data: x
        });
      }
      else{ 
        this.dialog.open(successDialog, {
          data: x
        });
      }
    })
  }
  }