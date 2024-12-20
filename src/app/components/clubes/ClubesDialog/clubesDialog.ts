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
@Component({
    selector: 'clubesDialog',
    templateUrl: 'clubesDialog.html',
    standalone: true,
    imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule,MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class clubesDialog {
    public nombre : string = "";
    public sigla : string = "";
    public max : string = "";
    public club : club_add_body;
    readonly dialog = inject(MatDialog);

    constructor(
        private _clubesService : ClubesServiceService,
        public dialogRef : MatDialogRef<clubesDialog>
    ){
        this.club = {nombreClub: "", abreviaturaClub: "", maxJugadoresClub:"", logoClub:"https://firebasestorage.googleapis.com/v0/b/amblpstorage.appspot.com/o/content%2Flogo_clubs_pics%2FucbLogo.png?alt=media&token=3b4a98d0-872d-438c-850f-a6daec3e259d", codigoClub:""}
    }
    
  protected readonly value = signal('');

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }
  registrarClub(){
    this.club.nombreClub = this.nombre;
    this.club.abreviaturaClub = this.sigla;
    this.club.maxJugadoresClub = this.max;
    this._clubesService.postClubes(this.club).subscribe(x =>{
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