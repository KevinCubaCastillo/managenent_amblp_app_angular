import { Component, inject, Inject, OnInit, ViewChild } from '@angular/core';
import { OtherService } from '../../services/other.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatMenu, MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { campeonatoDialog } from './campeonatoDialog/campeonatoDialog';

@Component({
  selector: 'app-campeonatos',
  standalone: true,
  imports: [MatTableModule, MatPaginator, MatButtonModule, MatMenuModule],
  templateUrl: './campeonatos.component.html',
  styleUrl: './campeonatos.component.css'
})
export class CampeonatosComponent implements OnInit{
  public dataSource = new MatTableDataSource<any>();
  readonly dialog = inject(MatDialog);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['codigo','nombre', 'gestion', 'estado','actions'];
  constructor(private _service : OtherService){
    this._service.verCampeonatos().subscribe(x =>{
      console.log(x);
      
    })
  }
  ngOnInit(): void {
    this.verCampeonatos();
  }
  openDialog(){
    this.dialog.open(campeonatoDialog).afterClosed().subscribe(i =>
      {
      this.verCampeonatos();
    })
  }
  verCampeonatos(){
    this._service.verCampeonatos().subscribe(x =>{
      this.dataSource.data = x.data;
    })
  }

  finalizarCampeonato(cod : string){
    this._service.finalizarCampeonato(cod).subscribe(x =>{
      console.log(x);
      this.verCampeonatos();
    })
  }

  inhabilitarCampeonato(cod : string){
    this._service.inhabilitarCampeonato(cod).subscribe(x =>{
      console.log(x);
      this.verCampeonatos();
    })
  }

  eliminarCampeonato(cod : string){
    this._service.eliminarCampeonato(cod).subscribe(x =>{
      console.log(x);
      this.verCampeonatos();
    })
  }
}
