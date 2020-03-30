import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { IngresoService } from '../../_services/ingreso.service';
import { CommonService } from '../../_services/common.service';

import { Ingreso } from '../../_models/ingreso';

@Component({
  selector: 'app-ingreso-list',
  templateUrl: './ingreso-list.component.html',
  styleUrls: ['./ingreso-list.component.css']
})

export class IngresoListComponent implements OnInit {

  MSJ_ERROR = "Ha ocurrido un error.";

  loading: boolean = true;

  ingresos: Array<any>;
  error: string = '';

  page: number = 1;
  pageSize: number = 15;
  collectionSize: number = 1;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private ingresoService: IngresoService,
              private commonService: CommonService) {
  }

  ngOnInit() {
    this.ingresoService.getAll().subscribe(data => {
      this.ingresos = data;
      this.collectionSize = this.ingresos.length;
    },
    error => {
      this.commonService.alertar(this.MSJ_ERROR);
      console.error(error);
    });
  }

  gotoList() {
    this.router.navigate(['/ingreso-list']);
  }

}
