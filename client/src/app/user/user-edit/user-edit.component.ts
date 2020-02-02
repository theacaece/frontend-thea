import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthenticationService } from '../../_services/authentication.service';

import { UserService } from '../../_services/user.service';
import { User } from '../../_models/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  currentUser: User;
  user: any = {};

  sub: Subscription;

  usuarioLogueado = true;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private userService: UserService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
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
            if (this.user.username != this.currentUser.userDetails.username) {
              this.usuarioLogueado = false;
            }
          }
    	  }, error => console.error(error));
      }
    }, error => console.error(error));
  }

  gotoList() {
    this.router.navigate(['/user-list']);
  }

  update(form: NgForm) {
    if(confirm("¿Está seguro que desea guardar los cambios?")) {
      this.userService.update(this.user).subscribe(result => {
        this.gotoList();
      }, error => console.error(error));
    }
  }
  
}