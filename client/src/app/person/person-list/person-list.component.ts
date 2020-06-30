import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { PersonService } from '../../_services/person.service';
import { CommonService } from '../../_services/common.service';
import { ConfirmDialogService } from 'src/app/_services/confirm-dialog.service';


import { Person } from '../../_models/person';

@Component({
  selector: 'app-persons-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})

export class PersonListComponent implements OnInit {

  MSJ_ERROR = "Ha ocurrido un error.";
  
  loading: boolean = true;

  persons: Array<any>;
  error: string = '';

  page: number = 1;
  pageSize: number = 15;
  collectionSize: number = 1;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private personService: PersonService,
    private commonService: CommonService,
    private dialog: ConfirmDialogService) {
  }

  ngOnInit() {
    this.personService.getAll().subscribe(data => {
      this.persons = data;
      this.collectionSize = this.persons.length;
      this.loading = false;
    },
    error => {
      this.commonService.alertar(this.MSJ_ERROR);
      console.error(error);
    });
  }

  gotoList() {
    this.router.navigate(['/person-list']);
  }
 
  confirmDelete(person: any){

    this.dialog.openDialog({
        title: 'Confirmar operación',
        subject: '¿Está seguro que desea eliminar el usuario?'
      }).subscribe(resultOk =>
        {
        if (resultOk)
        {
            this.remove(person);
        }
        }, error => {
        this.error = error;
        console.error(error);
      });
    }

  remove(person: any): void {
        this.personService.remove(person.id).subscribe( data => {
        this.persons = this.persons.filter(u => u !== person);
        }, error => {
          this.commonService.alertar(this.MSJ_ERROR);
          console.error(error);
        });
  }

}
