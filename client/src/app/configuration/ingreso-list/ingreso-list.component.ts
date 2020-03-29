import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { IngresoService } from '../../_services/ingreso.service';
import { Register } from '../../_models/register';

@Component({
  selector: 'app-ingreso-list',
  templateUrl: './ingreso-list.component.html',
  styleUrls: ['./ingreso-list.component.css']
})

export class IngresoListComponent implements OnInit {

  loading: boolean = true;

  ingresos: Array<any>;
  error: string = '';

  page: number = 1;
  pageSize: number = 15;
  collectionSize: number = 1;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private ingresoService: IngresoService) {
  }

  ngOnInit() {
    this.ingresoService.getAll().subscribe(data => {
      this.ingresos = data;
      this.collectionSize = this.ingresos.length;
    },
    error => {
      this.error = error;
      console.error(error);
    });
  }

  gotoList() {
    this.router.navigate(['/ingreso-list']);
  }

}
