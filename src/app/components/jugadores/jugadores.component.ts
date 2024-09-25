import { Component, inject } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import {MatTableModule} from '@angular/material/table';
import { JugadoreServiceService } from '../../services/jugadore-service.service';
import {MatDialog} from '@angular/material/dialog';
import { registrarJugadorDialog } from './jugadoresDialog/registrarJugadorDialog';


@Component({
  selector: 'app-jugadores',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatTableModule],
  templateUrl: './jugadores.component.html',
  styleUrl: './jugadores.component.css'
})
export class JugadoresComponent {
  readonly dialog = inject(MatDialog);
  public lst = []
  displayedColumns: string[] = ['picture','ci', 'nombre', 'categoria', 'fechaNac','edad','posicion','estatura','peso','envergadura','pro'];
  constructor(private _jugadoresService: JugadoreServiceService){
    this.verJugadores();
  }
  openDialog() {
    this.dialog.open(registrarJugadorDialog);
  }
  verJugadores(){
    this._jugadoresService.verJugadores().subscribe(x => {
      console.log(x);
      this.lst = x.data;
    })
  }
}
