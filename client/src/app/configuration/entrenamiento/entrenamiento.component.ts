import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Component, OnInit } from '@angular/core';

import { first } from 'rxjs/operators';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-entrenamiento',
  templateUrl: './entrenamiento.component.html',
  styleUrls: ['./entrenamiento.component.css'],
})
export class EntrenamientoComponent implements OnInit {

  loading = true;

  constructor() { }

  ngOnInit() {

  }
}
