import { Component, inject, OnInit } from '@angular/core';
import { ClubesServiceService } from '../../services/clubes-service.service';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog} from '@angular/material/dialog';
import { clubesDialog } from './ClubesDialog/clubesDialog';
import { MatMenuModule } from '@angular/material/menu';
import { successDialog } from '../sharedDialogs/successDialog';
import { confirmDialog } from '../sharedDialogs/ConfirmDelete/confirmDialog';

@Component({
  selector: 'app-clubes',
  standalone: true,
  imports: [MatMenuModule,MatTableModule, MatIconModule,MatDividerModule,MatButtonModule],
  templateUrl: './clubes.component.html',
  styleUrl: './clubes.component.css'
})
export class ClubesComponent implements OnInit{
  readonly dialog = inject(MatDialog);
  public lst = [];
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'actions'];
constructor(
  private _clubesService : ClubesServiceService
){}
ngOnInit(): void {
  this.getClubes();
}
openDialog() {
  this.dialog.open(clubesDialog).afterClosed().subscribe(i =>{
    this.getClubes();
  });
}
getClubes(){
  this._clubesService.getClubes().subscribe(x => {
    this.lst = x.data;
    console.log(this.lst)
  })
}
eliminarClub(cod: string){
    this.dialog.open(confirmDialog).afterClosed().subscribe(i => {
      if(i){
        this._clubesService.eliminarClub(cod).subscribe(x => {
          this.dialog.open(successDialog, {
            data: x
          }).afterClosed().subscribe(e =>{
            this.getClubes();
          });
        })
      }
    })
  }
}