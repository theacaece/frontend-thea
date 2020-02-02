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
  loading = false;
  error = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {

  }

  gotoList() {
    this.router.navigate(['/user-list']);
  }
  
  save() {
    if(confirm("¿Está seguro que desea guardar los cambios?")) {
      this.loading = true;
      this.userService.save(this.user).subscribe(result => {
        this.gotoList();
      },
      error => {
        this.error = 'Error al guardar el usuario.';
        this.loading = false;
      });
    }
  }
  
}