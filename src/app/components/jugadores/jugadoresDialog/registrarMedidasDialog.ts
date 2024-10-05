import {ChangeDetectionStrategy, Component, Inject, inject, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {
    MAT_DIALOG_DATA,
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
import { JugadoreServiceService } from '../../../services/jugadore-service.service';
import { medidas_body } from '../../../Models/Jugadores/medidas_body';
@Component({
    selector: 'registrarMedidasDialog',
    templateUrl: 'registrarMedidasDialog.html',
    standalone: true,
    imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule,MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class registrarMedidasDialog {
    public estaura : string = "";
    public peso : string = "";
    public medidas : medidas_body;
    public envergadura : string = "";
    readonly dialog = inject(MatDialog);

    constructor(
        private _service : JugadoreServiceService,
        public dialogRef : MatDialogRef<registrarMedidasDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ){
        this.estaura = data.estatura;
        this.peso = data.peso;
        this.envergadura = data.envergadura;

        this.medidas = {estaturaJugador: "", envergaduraJugador: "", pesoJugador:""}
    }
    
  protected readonly value = signal('');

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }

  registrarmedidas(){
    this.medidas.estaturaJugador = this.estaura;
    this.medidas.envergaduraJugador = this.envergadura;
    this.medidas.pesoJugador = this.peso;
    this._service.registrarMedidas(this.data.ciJugador, this.medidas).subscribe(x =>{
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