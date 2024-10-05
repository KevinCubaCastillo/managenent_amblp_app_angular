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
@Component({
    selector: 'campeonatoDialog',
    templateUrl: 'campeonatoDialog.html',
    standalone: true,
    imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule,MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class campeonatoDialog {
    public nombre : string = "";
    public gestion : string = "";
    public campeonato : campeonato_body;
    public exp : boolean = false;
    readonly dialog = inject(MatDialog);

    constructor(
        private _service : OtherService,
        public dialogRef : MatDialogRef<campeonatoDialog>
    ){
        this.campeonato = {nombreCampeonato: "", gestionCampeonato: ""}
    }
    
  protected readonly value = signal('');

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

  registrarCampeonato(){
    this.campeonato.nombreCampeonato = this.nombre;
    this.campeonato.gestionCampeonato = this.gestion.toString();
    this._service.registrarCampeonato(this.campeonato).subscribe(x =>{
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