import { UserService } from './../_services/user.service';
import { Component, OnInit } from '@angular/core';

import { User } from '../_models/user';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authentication.service';


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

  loading = false;
  users: any;
  currentUser: User;

  constructor(private userService: UserService,
              private authenticationService: AuthenticationService,) { 
      this.authenticationService.currentUser.subscribe((x: User) => this.currentUser = x);
  }

  ngOnInit() {
      this.loading = true;
      this.userService.getAll().pipe(first()).subscribe(users => {
          this.loading = false;
          this.users = users;
      });
  }
}
