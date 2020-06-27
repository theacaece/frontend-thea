import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { NgForm } from '@angular/forms';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

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

  user: any = {};

  admin: boolean = true ;

  sub: Subscription;

  error: string = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {

  }

  gotoList() {
    this.router.navigate(['/user-list']);
  }
  
  save(form: NgForm) {
    if(confirm("¿Está seguro que desea guardar el usuario?")) {
      if(this.admin){ 
        this.user.admin = true;
      }
      else{
        this.user.admin = false;
      }}
      this.userService.save(this.user).subscribe(result => {
        this.gotoList();
      },
      error => {
        this.error = error;
        console.error(error);
      });
    }  
  }

