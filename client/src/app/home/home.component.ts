import { UserService } from './../_services/user.service';
import { Component, OnInit } from '@angular/core';

import { User } from '../_models/user';
import { first } from 'rxjs/operators';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
