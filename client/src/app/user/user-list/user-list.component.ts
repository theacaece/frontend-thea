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

 constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAll().subscribe(data => {
      this.users = data;
    }), error => console.error(error);
  }

  remove(href) {
    this.userService.remove(href).subscribe(result => {
      alert("Se elimino correctamente.");
    }, error => console.error(error));
  }

}
