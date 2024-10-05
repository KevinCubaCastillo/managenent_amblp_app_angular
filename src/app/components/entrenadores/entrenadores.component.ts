import { Component, inject, OnInit } from '@angular/core';
import { EntrenadoresService } from '../../services/entrenadores.service';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { entrenadorDialog } from './entrenadorDialog/entrenadorDialog';
import { successDialog } from '../sharedDialogs/successDialog';
import { confirmDialog } from '../sharedDialogs/ConfirmDelete/confirmDialog';

@Component({
  selector: 'app-entrenadores',
  standalone: true,
  imports: [MatButtonModule,MatMenuModule,MatPaginator,MatPaginatorModule, MatTableModule],
  templateUrl: './entrenadores.component.html',
  styleUrl: './entrenadores.component.css'
})
export class EntrenadoresComponent implements OnInit{
  public dataSource = new MatTableDataSource<any>();
 readonly dialog = inject(MatDialog);
  displayedColumns: string[] = ['ci', 'nombre','exppro','actions'];
constructor(private _entrenadoresService: EntrenadoresService){
  this._entrenadoresService.verEntrenadores().subscribe(x => {
    console.log(x);
  })
}
ngOnInit(): void {
  this.verEntrenadores();
}
openDialog() {
  this.dialog.open(entrenadorDialog).afterClosed().subscribe(i =>{
    this.verEntrenadores();
  });
}
verEntrenadores(){
  this._entrenadoresService.verEntrenadores().subscribe(x =>{
    this.dataSource.data = x.data;
  })
}
eliminarEntrenador(ci: string){
  this.dialog.open(confirmDialog).afterClosed().subscribe(i =>{
    if(i){
      this._entrenadoresService.eliminarEntrenador(ci).subscribe(x =>{
        this.dialog.open(successDialog,{
          data: x
        }).afterClosed().subscribe(e =>{
          this.verEntrenadores();
        })
      })
    }
  })

}
}
