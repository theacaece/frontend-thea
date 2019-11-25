import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {PageEvent} from "@angular/material";
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../../_services/authentication.service';

import { NgForm } from '@angular/forms';

import {MatPaginator} from '@angular/material/paginator';

import { UserService } from '../../_services/user.service';
import { User } from '../../_models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit  {
  currentUser: User;
  users: Array<any>;
  error: string = '';
  
  page: 1;
  itemsPerPage: number;
  totalItems: any;
  previousPage: any;
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

  ngOnInit() {
    this.loadData();
  }

  gotoList() {
    this.router.navigate(['/user-list']);
  }
  
  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.loadData();
    }
  }

  loadData() {
    this.userService.getAll().subscribe(data => {
      this.users = data;
    }, 
    error => {
      this.error = error;
      console.error(error);
    });
  }

  remove(user: any): void {
    if (user.username != this.currentUser.userDetails.username) {
      if(confirm("¿Está seguro que desea eliminar el usuario?")) {
        this.userService.remove(user.id).subscribe( data => {
        this.users = this.users.filter(u => u !== user);
        }, 
        error => {
          this.error = error;
          console.error(error);
        });
      } else {
        alert("No es posible eliminar el usuario logueado");
      };
    }
  }
}
