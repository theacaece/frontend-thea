import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: any = {};

  sub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {
  }

 ngOnInit() {
   /* this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
      	this.userService.get(id).subscribe(user => {
      		if (null) {

          }
          this.gotoList();
    	}, error => console.error(error));
      }
    }, error => console.error(error));*/
  }

  gotoList() {
    this.router.navigate(['/user/user-list']);
  }

  /*save(form: NgForm) {
    this.userService.save(form).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  remove(href) {
    alert("remove form id");
    alert(this.user.id);
    this.userService.remove(this.user).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }*/
  
}
