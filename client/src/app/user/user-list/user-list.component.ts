import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {PageEvent} from "@angular/material";
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../_models/user';
import { AuthenticationService } from '../../_services/authentication.service';

import { NgForm } from '@angular/forms';

import {MatPaginator} from '@angular/material/paginator';

import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit  {
  currentUser: User;
  users: Array<any>;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

  ngOnInit() {
    this.userService.getAll().subscribe(data => {
      this.users = data;
    }), error => console.error(error);
  }

  gotoList() {
    this.router.navigate(['/user-list']);
  }

  remove(user): void {
    if (user.username != this.currentUser.userDetails.username) {
      if(confirm("¿Está seguro que desea eliminar el usuario?")) {
      this.userService.remove(user.id).subscribe( data => {
      this.users = this.users.filter(u => u !== user);
      });}
    } else {
      alert("No es posible eliminar el usuario logueado");
    };
}}
