import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';
import { DatePipe } from '@angular/common';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { jugador_add_body } from '../../../Models/Jugadores/jugador_add_body';
import { JugadoreServiceService } from '../../../services/jugadore-service.service';
@Component({
    selector: 'registrarJugadorDialog',
    templateUrl: 'registrarJugadorDialog.html',
    standalone: true,
    providers: [provideNativeDateAdapter()],
    imports: [DatePipe,MatDatepickerModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule,MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class registrarJugadorDialog {
    public ci : string = " ";
    public nombre : string = " ";
    public primerApellido : string = " ";
    public segundoApellido : string = " ";
    public fechaNac : string = " ";
    public estatura : string = " ";
    public peso : string = " ";
    public envergadura : string = " ";
    public posicion : string = " ";
    public posicionSec : string = " ";


    public jugador : jugador_add_body;

    constructor(
        private _jugadorService : JugadoreServiceService
         )
        {
        this.jugador = {
            ciJugador: " ",
            nombreJugador: " ", 
            primerApellidoJugador: " ", 
            segundoApellidoJugador:" ", 
            fechaNacimientoJugador:"07/09/2002", 
            nroRegistroJugador:" ",
            estaturaJugador: " ",
            pesoJugador : " ",
            envergaduraJugador: " ",
            posicionJugador: " ",
            posicionSecundariaJugador: " ",
            expProfesionalJugador: false,
            fotoJugador: "https://firebasestorage.googleapis.com/v0/b/amblpstorage.appspot.com/o/content%2Fplayer_pics%2FIllanes.png?alt=media&token=e2b03fd9-d396-412a-a972-3e48b6772b61",
            generoJugador: false,
            codUsuarioJugador: " ",
            idCategoriaJugador: " ",
            codClubJugador: "UCB23548"
        }
          

    }
    
  protected readonly value = signal('');

  protected onInput(event: Event) {
    this.value.set((event.target as HTMLInputElement).value);
  }
  registrarJugador(){
    this.jugador.ciJugador = this.ci;
    this.jugador.nombreJugador = this.nombre;
    this.jugador.primerApellidoJugador = this.primerApellido;
    this.jugador.segundoApellidoJugador = this.segundoApellido;
    this.jugador.fechaNacimientoJugador = this.fechaNac;
    this.jugador.estaturaJugador = this.estatura;
    this.jugador.pesoJugador = this.peso;
    this.jugador.envergaduraJugador = this.envergadura;
    this.jugador.posicionJugador = this.posicion;
    this.jugador.posicionSecundariaJugador = this.posicionSec;
    this._jugadorService.registrarJugador(this.jugador).subscribe(x => {
        if(x.success === true){
            alert(x.message);
        }else{
            console.log(x);
        }
    });
  }
  }