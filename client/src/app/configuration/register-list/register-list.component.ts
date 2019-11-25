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

  page: 1;
  itemsPerPage: number;
  totalItems: any;
  previousPage: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private registroService: RegistroService) {
  }

  ngOnInit() {
    this.loadData();
  }

  gotoList() {
    this.router.navigate(['/register-list']);
  }
     
  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.loadData();
    }
  }

  loadData() {
    this.registroService.getAll().subscribe(data => {
      this.registros = data;
    },
    error => {
      this.error = error;
      console.error(error);
    });
  }

}
