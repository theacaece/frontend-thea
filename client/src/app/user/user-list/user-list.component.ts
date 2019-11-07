import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

 users: Array<any>;

 constructor(private uerService: UserService) { }

  ngOnInit() {
    this.uerService.getAll().subscribe(data => {
      this.users = data;
    }, error => console.error(error));
  }
  
  submit() {

  }

}
