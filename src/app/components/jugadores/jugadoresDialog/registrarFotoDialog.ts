import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, inject, signal} from '@angular/core';
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
import { photo_body } from '../../../Models/Jugadores/photo_body';
@Component({
    selector: 'registrarFotoDialog',
    templateUrl: 'registrarFotoDialog.html',
    standalone: true,
    imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule,MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class registrarFotoDialog {
    public foto : photo_body;
    public fotoBase64 : string | ArrayBuffer | null = null;
    public prueba : string = "";
    readonly dialog = inject(MatDialog);

    constructor(
        private _service : JugadoreServiceService,
        public dialogRef : MatDialogRef<registrarFotoDialog>,
        private cdRef: ChangeDetectorRef,
        @Inject(MAT_DIALOG_DATA) public data: any
    ){

        this.fotoBase64 = "";

        this.foto = {photo: "" }
    }
    
  protected readonly value = signal('');

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }
  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    const reader = new FileReader;
    if(file){
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.fotoBase64 = reader.result;
        this.prueba = this.fotoBase64!.toString();
        this.cdRef.detectChanges();
      }
    }

  }
  registrarFoto(){
    this.foto.photo = this.prueba;
    this._service.registrarFoto(this.data.ciJugador, this.foto).subscribe(x =>{
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