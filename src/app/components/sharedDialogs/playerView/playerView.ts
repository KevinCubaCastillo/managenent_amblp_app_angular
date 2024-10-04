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
  
@Component({
    selector: 'playerView',
    templateUrl: 'playerView.html',
    standalone: true,
    imports: [NgIf,MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatButtonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  export class playerView {
    constructor(@Inject(MAT_DIALOG_DATA) public data: any){
        console.log(data);
    }
  }