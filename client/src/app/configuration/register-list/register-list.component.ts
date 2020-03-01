import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { RegistroService } from '../../_services/register.service';
import { Register } from '../../_models/register';

@Component({
  selector: 'app-register-list',
  templateUrl: './register-list.component.html',
  styleUrls: ['./register-list.component.css']
})

export class RegisterListComponent implements OnInit {

  loading: boolean = true;

  registers: Array<any>;
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
      this.registers = data;
      this.collectionSize = this.registers.length;
      alert(this.collectionSize);
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
