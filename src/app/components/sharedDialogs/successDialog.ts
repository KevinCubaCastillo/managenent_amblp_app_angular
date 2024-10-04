import { NgIf } from '@angular/common';
import { Component,ChangeDetectionStrategy, Inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
  } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
  
@Component({
    selector: 'successDialog',
    templateUrl: 'successDialog.html',
    standalone: true,
    imports: [NgIf,MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule, MatTableModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class successDialog {
    public lst = [];
    displayedColumns: string[] = ['field', 'descp'];
    constructor(@Inject(MAT_DIALOG_DATA) public data: any){
        console.log(data.errors);
        this.lst = data.errors;        
    }

  }