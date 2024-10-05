import { Component, Inject, inject, OnInit, ViewChild } from '@angular/core';
import { OtherService } from '../../services/other.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { escenarioDialog } from './escenarioDialog/escenarioDialog';
import { confirmDialog } from '../sharedDialogs/ConfirmDelete/confirmDialog';
import { successDialog } from '../sharedDialogs/successDialog';

@Component({
  selector: 'app-escenario',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatButtonModule, MatMenuModule],
  templateUrl: './escenario.component.html',
  styleUrl: './escenario.component.css'
})
export class EscenarioComponent implements OnInit{
  public dataSource = new MatTableDataSource<any>();
  readonly dialog = inject(MatDialog);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['codigo','nombre', 'gestion', 'estado','actions'];
constructor(private _service : OtherService){
  this._service.verCampeonatos().subscribe(x =>{
    console.log(x);
  })
  this._service.verEscenarios().subscribe(x =>{
    console.log(x);
    
  })
}
ngOnInit(): void {
  this.verEscenarios();
}
openDialog(){
  this.dialog.open(escenarioDialog).afterClosed().subscribe(i =>{
    this.verEscenarios();
  })
}
verEscenarios(){
  this._service.verEscenarios().subscribe(x =>{
    this.dataSource.data = x.data;
  })
}
suspenderEscenario(id: number){
  this.dialog.open(confirmDialog).afterClosed().subscribe(i =>{
    if(i){
      this._service.suspenderEscenario(id).subscribe(x => {
        this.dialog.open(successDialog, {data: x}).afterClosed().subscribe(e =>{
          this.verEscenarios();
        })
      });
    }
  })


}
inhabilitarEscenario(id: number){
  this.dialog.open(confirmDialog).afterClosed().subscribe(i =>{
    if(i){
      this._service.inhabilitarEscenario(id).subscribe(x => {
        this.dialog.open(successDialog, {data: x}).afterClosed().subscribe(e =>{
          this.verEscenarios();
        })
      });
    }
  })

}
eliminarEscenario(id: number){
  this.dialog.open(confirmDialog).afterClosed().subscribe(i =>{
    if(i){
      this._service.eliminarEscenario(id).subscribe(x => {
        this.dialog.open(successDialog, {data: x}).afterClosed().subscribe(e =>{
          this.verEscenarios();
        })
      });
    }
  })

}

}