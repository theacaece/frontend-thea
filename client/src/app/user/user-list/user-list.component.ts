import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {PageEvent} from "@angular/material";
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../../_services/authentication.service';

import { NgForm } from '@angular/forms';

import {MatPaginator} from '@angular/material/paginator';

import { UserService } from '../../_services/user.service';
import { CommonService } from '../../_services/common.service';

import { User } from '../../_models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit  {

  MSJ_ERROR = "Ha ocurrido un error.";
  MSJ_USUARIO_DELETE: "No es posible eliminar el usuario logueado";

  loading: boolean = true;

  currentUser: User;
  users: Array<any>;
  error: string = '';
  
  page: number = 1;
  pageSize: number = 15;
  collectionSize: number = 1;
  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private commonService: CommonService) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

  ngOnInit() {
    this.userService.getAll().subscribe(data => {
      this.users = data;
      this.collectionSize = this.users.length;
      this.loading = false; 
    }, 
    error => {
      this.commonService.alertar(this.MSJ_ERROR);
      console.error(error);
    });
  }

  gotoList() {
    this.router.navigate(['/user-list']);
  }

  remove(user: any): void {
    if (user.username != this.currentUser.userDetails.username) {
      if(confirm("¿Está seguro que desea eliminar el usuario?")) {
        this.userService.remove(user.id).subscribe( data => {
        this.users = this.users.filter(u => u !== user);
        }, 
        error => {
          this.commonService.alertar(this.MSJ_ERROR);
          console.error(error);
        });
      }
    } else {
      this.commonService.alertar(this.MSJ_USUARIO_DELETE);
    };
  }
}
