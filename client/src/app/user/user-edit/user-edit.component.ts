import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

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
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
      	this.userService.get(id).subscribe(usuario => {
      		if (usuario) {
            this.user.id = usuario.id;
            this.user.firstname = usuario.firstname;
            this.user.lastname = usuario.lastname;
            this.user.email = usuario.email;
            this.user.username = usuario.username;
            this.user.password = usuario.password;
          }
    	  }, error => console.error(error));
      }
    }, error => console.error(error));
  }

  gotoList() {
    this.router.navigate(['/person-list']);
  }

  save(form: NgForm) {
    this.userService.save(form).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }
  
}
