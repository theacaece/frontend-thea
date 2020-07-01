import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { NgForm } from '@angular/forms';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { AuthenticationService } from '../../_services/authentication.service';
import { UserService } from '../../_services/user.service';
import { User } from '../../_models/user';
import { ConfirmDialogService } from 'src/app/_services/confirm-dialog.service';
import { CommonService } from 'src/app/_services/common.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  userForm: FormGroup;
  
  firstname = new FormControl('', [
    Validators.required
  ]);
  
  lastname = new FormControl('', [
    Validators.required
  ]);

  email = new FormControl('', [
    Validators.required
  ]);

  username = new FormControl('', [
    Validators.required
  ]);

  password = new FormControl('', [
    Validators.required
  ]);

  confirmapassword = new FormControl('', [
    Validators.required
  ]);
  
  currentUser: User;

  user: any = {};

  admin: boolean;

  sub: Subscription;

  usuarioLogueado = true;

  error: string = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private dialog: ConfirmDialogService,
              private commonservice: CommonService) {
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
            this.user.admin = usuario.admin;
            if (this.user.username != this.currentUser.userDetails.username) {
              this.usuarioLogueado = false;
            }
          }
        }, 
        error => {
          this.error = error;
          console.error(error);
        });
      }
    },
    error => {
      this.error = error;
      console.error(error);
    });
  }

  gotoList() {
    this.router.navigate(['/user-list']);
  }

  confirmEdit(){
    this.dialog.openDialog({
        title: 'Confirmar operación',
        subject: `¿Está seguro que desea editar el usuario?`
      }).subscribe(resultOk =>
        {
        if (resultOk)
        {
            this.update();
        }
        }, error => {
        this.error = error;
        console.error(error);
      });
    }
    

  update() {
    if (this.user.username != this.currentUser.userDetails.username) {
        this.userService.update(this.user).subscribe(result => {
          this.gotoList();
        },
        error => {
          this.error = error;
          console.error(error);
        });  
    } else {
      this.commonservice.alertar("No es posible editar el usuario logueado");
    };
  }
}
