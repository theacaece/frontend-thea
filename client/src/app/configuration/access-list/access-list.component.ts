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

  page: number = 1;
  pageSize: number = 5;
  collectionSize: number = 1;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private accesoService: AccessService) {
  }

  ngOnInit() {
    this.accesoService.getAll().subscribe(data => {
      this.accesos = data;
      this.collectionSize = this.accesos.length;
    },
    error => {
      this.error = error;
      console.error(error);
    });
  }

  gotoList() {
    this.router.navigate(['/access-list']);
  }

}
