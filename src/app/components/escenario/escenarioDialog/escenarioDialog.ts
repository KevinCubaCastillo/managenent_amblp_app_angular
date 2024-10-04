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
import { escenario_body } from '../../../Models/escenario_body';
@Component({
    selector: 'escenarioDialog',
    templateUrl: 'escenarioDialog.html',
    standalone: true,
    imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule,MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class escenarioDialog {
    public nombre : string = "";
    public direccion : string = "";
    public escenario : escenario_body;
    public exp : boolean = false;
    readonly dialog = inject(MatDialog);

    constructor(
        private _service : OtherService,
        public dialogRef : MatDialogRef<escenarioDialog>
    ){
        this.escenario = {nombreEscenario: "", ubicacionEscenario: ""}
    }
    
  protected readonly value = signal('');

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

  registrarEscenario(){
    this.escenario.nombreEscenario = this.nombre;
    this.escenario.ubicacionEscenario = this.direccion;
    this._service.registarEscenario(this.escenario).subscribe(x =>{
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