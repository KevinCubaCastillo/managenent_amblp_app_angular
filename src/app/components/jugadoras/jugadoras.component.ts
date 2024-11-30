import { Component, inject, OnInit, ViewChild } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { JugadoreServiceService } from '../../services/jugadore-service.service';
import {MatDialog} from '@angular/material/dialog';
import { registrarJugadorDialog } from '../jugadores/jugadoresDialog/registrarJugadorDialog';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { playerView } from '../sharedDialogs/playerView/playerView';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { confirmDialog } from '../sharedDialogs/ConfirmDelete/confirmDialog';
import { successDialog } from '../sharedDialogs/successDialog';
import { registrarMedidasDialog } from '../jugadores/jugadoresDialog/registrarMedidasDialog';
import { LoginService } from '../../services/login.service';
import { registrarFotoDialog } from '../jugadores/jugadoresDialog/registrarFotoDialog';


@Component({
  selector: 'app-jugadoras',
  standalone: true,
  imports: [MatPaginatorModule,MatMenuModule,MatButtonModule,MatFormFieldModule, MatInputModule, MatSelectModule, MatTableModule],
  templateUrl: './jugadoras.component.html',
  styleUrl: './jugadoras.component.css'
})
export class JugadorasComponent implements OnInit{
genero : boolean = false;
readonly dialog = inject(MatDialog);
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public lst = []
  displayedColumns: string[] = ['picture','ci', 'nombre', 'categoria','edad','posicion','actions'];
  constructor(private _jugadoresService: JugadoreServiceService, private _userLog : LoginService){
    //console.log(_userLog.userData.codigoUsuario);
  }
  ngOnInit(): void {
    this.verJugadores();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  openDialog() {
    this.dialog.open(registrarJugadorDialog, {data: this.genero}).afterClosed().subscribe(i =>{
      if(i.success){
        this.verJugadores();
      };
    });
  }
  viewPlayer(element : any){
    this.dialog.open(playerView, {
      data : element
    });
  }
  registrarMedidas(body: any){
    this.dialog.open(registrarMedidasDialog, {data: body}).afterClosed().subscribe(x =>{
      this.verJugadores();
    });
  }
  registrarFoto(body: any){
    this.dialog.open(registrarFotoDialog, {data: body}).afterClosed().subscribe(x =>{
      this.verJugadores();
    });
  }
  eliminarJugadorClub(jugador : any){
    this.dialog.open(confirmDialog).afterClosed().subscribe(i =>{
      if(i){
        this._jugadoresService.eliminarJugadorClub(jugador.ciJugador).subscribe(x => {
          this.dialog.open(successDialog, {data: x}).afterClosed().subscribe(e =>{
            this.verJugadores();
          })
        })
      }
    })

  }
  verJugadores(){
    this._jugadoresService.verJugadoresClub(this._userLog.userData.codigoUsuario, this.genero).subscribe(x => {
      console.log(x);
      this.dataSource.data = x.data;
    })
  }
}
