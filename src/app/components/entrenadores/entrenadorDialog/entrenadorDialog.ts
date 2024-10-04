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
@Component({
    selector: 'entrenadorDialog',
    templateUrl: 'entrenadorDialog.html',
    standalone: true,
    imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule,MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class entrenadorDialog {
    public nombre : string = "";
    public ci : string = "";
    public entrenador : entrenadorAddBody;
    public exp : boolean = false;
    readonly dialog = inject(MatDialog);

    constructor(
        private _service : EntrenadoresService,
        public dialogRef : MatDialogRef<entrenadorDialog>
    ){
        this.entrenador = {ciEntrenador: "", nombreCompletoEntrenador: "", nroRegistroEntrenador:"", expProfesionalEntrenador: false}
    }
    
  protected readonly value = signal('');

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

  registrarEntrenador(){
    this.entrenador.nombreCompletoEntrenador = this.nombre;
    this.entrenador.ciEntrenador = this.ci;
    this._service.registrarEntrenador(this.entrenador).subscribe(x =>{
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