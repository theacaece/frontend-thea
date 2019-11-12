import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import {PageEvent} from "@angular/material";
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { NgForm } from '@angular/forms';

import {MatPaginator} from '@angular/material/paginator';

import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit  {

  users: Array<any>;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) {
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
    this.userService.remove(user.id).subscribe( data => {
      this.users = this.users.filter(u => u !== user);
      alert("Se elmino correctamente");
    })
  };

}
