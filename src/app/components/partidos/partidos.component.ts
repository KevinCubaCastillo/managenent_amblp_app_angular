import { Component, OnInit } from '@angular/core';
import { PartidosService } from '../../services/partidos.service';

@Component({
  selector: 'app-partidos',
  standalone: true,
  imports: [],
  templateUrl: './partidos.component.html',
  styleUrl: './partidos.component.css'
})
export class PartidosComponent implements OnInit {
constructor(private _partidoService : PartidosService){}
ngOnInit(): void {
  this._partidoService.verPartidos().subscribe(x => {
    console.log(x.data)
  })
}
}
