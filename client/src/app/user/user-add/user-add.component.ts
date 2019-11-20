import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  user: any = {};

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
    this.userService.save(form).subscribe(result => {
      this.gotoList();
    },
    error => {
      this.error = error;
      console.error(error);
    });
  }

  remove(href) {
    this.userService.remove(href).subscribe(result => {
      this.gotoList();
    },
    error => {
      this.error = error;
      console.error(error);
    });
  }
  
}
