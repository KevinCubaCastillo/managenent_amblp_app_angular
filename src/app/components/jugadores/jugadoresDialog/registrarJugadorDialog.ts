import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, inject, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';
import { DatePipe } from '@angular/common';
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
import {MatDatepickerModule} from '@angular/material/datepicker';
import { jugador_add_body } from '../../../Models/Jugadores/jugador_add_body';
import { JugadoreServiceService } from '../../../services/jugadore-service.service';
import { NgIf } from '@angular/common';
import { successDialog } from '../../sharedDialogs/successDialog';
import {MatRadioModule} from '@angular/material/radio';
import { LoginService } from '../../../services/login.service';
@Component({
    selector: 'registrarJugadorDialog',
    templateUrl: 'registrarJugadorDialog.html',
    styleUrl: '../jugadores.component.css',
    standalone: true,
    providers: [provideNativeDateAdapter()],
    imports: [MatRadioModule ,NgIf, DatePipe,MatDatepickerModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule,MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class registrarJugadorDialog {
    imageSrc: string | ArrayBuffer | null = null;
    public ci : string = "";
    public nombre : string = "";
    public primerApellido : string = "";
    public segundoApellido : string = "";
    public fechaNac : string = "01/01/1900";
    public estatura : string = "";
    public peso : string = "";
    public envergadura : string = "";
    public posicion : number = 0;
    public posicionSec : number = 0;
    readonly dialog = inject(MatDialog);
    public experienciaProfesional : boolean = false;
    public genero : boolean = false;


    public jugador : jugador_add_body = new jugador_add_body();

    constructor(
        private _jugadorService : JugadoreServiceService,
        public dialogRef: MatDialogRef<registrarJugadorDialog>,
        private cdRef: ChangeDetectorRef,
        private _user : LoginService,
        @Inject(MAT_DIALOG_DATA) public data: any
         )
        {
          this.genero = data;
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
        this.imageSrc = reader.result;
        this.cdRef.detectChanges();
      }
    }

  }
  registrarJugador(){
    this.jugador.ciJugador = this.ci;
    this.jugador.nombreJugador = this.nombre;
    this.jugador.primerApellidoJugador = this.primerApellido;
    this.jugador.segundoApellidoJugador = this.segundoApellido;
    this.jugador.fechaNacimientoJugador = this.fechaNac;
    this.jugador.posicionJugador = this.posicion;
    this.jugador.posicionSecundariaJugador = this.posicionSec;
    this.jugador.generoJugador = this.genero;
    this.jugador.expProfesionalJugador = this.experienciaProfesional;
    this.jugador.codClubJugador = this._user.userData.codigoUsuario;
    this._jugadorService.registrarJugador(this.jugador).subscribe(x => {
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

    });
  }
  }