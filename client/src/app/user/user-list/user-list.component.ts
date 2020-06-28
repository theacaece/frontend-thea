import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {PageEvent} from "@angular/material";
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../../_services/authentication.service';

import { NgForm } from '@angular/forms';

import {MatPaginator} from '@angular/material/paginator';

import { UserService } from '../../_services/user.service';
import { CommonService } from '../../_services/common.service';
import { ConfirmDialogService } from 'src/app/_services/confirm-dialog.service';

import { User } from '../../_models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit  {

  MSJ_ERROR = 'Ha ocurrido un error.';

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
    private commonService: CommonService,
    private dialog: ConfirmDialogService) {
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

  confirmDelete(user: any){
    if (user.username != this.currentUser.userDetails.username) {
    this.dialog.openDialog({
        title: 'Confirmar operación',
        subject: '¿Está seguro que desea eliminar el usuario?'
      }).subscribe(resultOk =>
        {
        if (resultOk)
        {
            this.remove(user);
        }
        }, error => {
        this.error = error;
        console.error(error);
      });
    } else {
      this.commonService.alertar('No es posible eliminar el usuario logueado');
    };
    }

  remove(user: any): void {
        this.userService.remove(user.id).subscribe( data => {
        this.users = this.users.filter(u => u !== user);
        }, error => {
          this.commonService.alertar(this.MSJ_ERROR);
          console.error(error);
        });
  }
}
