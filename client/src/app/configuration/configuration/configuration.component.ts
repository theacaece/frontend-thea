import { Component, OnInit } from '@angular/core';

import { first } from 'rxjs/operators';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css'],
})
export class ConfigurationComponent implements OnInit {

  loading = false;
  users: any;

  constructor() { }

  ngOnInit() {

  }
}
