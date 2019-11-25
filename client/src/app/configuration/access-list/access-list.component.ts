import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { AccessService } from '../../_services/access.service';

@Component({
  selector: 'app-access-list',
  templateUrl: './access-list.component.html',
  styleUrls: ['./access-list.component.css']
})

export class AccessListComponent implements OnInit {

  accesos: Array<any>;
  error: string = '';

  page: 1;
  itemsPerPage: number;
  totalItems: any;
  previousPage: any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private accesoService: AccessService) {
  }

  ngOnInit() {
    this.loadData();
  }

  gotoList() {
    this.router.navigate(['/access-list']);
  }
     
  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.loadData();
    }
  }

  loadData() {
    this.accesoService.getAll().subscribe(data => {
      this.accesos = data;
    },
    error => {
      this.error = error;
      console.error(error);
    });
  }

}
