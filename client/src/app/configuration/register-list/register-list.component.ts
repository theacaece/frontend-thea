import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { RegistroService } from '../../_services/register.service';
//import { Registro } from '../../_models/registro';

@Component({
  selector: 'app-register-list',
  templateUrl: './register-list.component.html',
  styleUrls: ['./register-list.component.css']
})

export class RegisterListComponent implements OnInit {

  registros: Array<any>;
  error: string = '';

  page: number = 1;
  pageSize: number = 15;
  collectionSize: number = 1;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private registroService: RegistroService) {
  }

  ngOnInit() {
    this.registroService.getAll().subscribe(data => {
      this.registros = data;
      this.collectionSize = this.registros.length;
    },
    error => {
      this.error = error;
      console.error(error);
    });
  }

  gotoList() {
    this.router.navigate(['/register-list']);
  }

}
