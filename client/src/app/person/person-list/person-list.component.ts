import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { PersonService } from '../../_services/person.service';
import { Person } from '../../_models/person';

@Component({
  selector: 'app-persons-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})

export class PersonListComponent implements OnInit {

  loading: boolean = true;

  persons: Array<any>;
  error: string = '';

  page: number = 1;
  pageSize: number = 4;
  collectionSize: number = 1;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private personService: PersonService) {
  }

  ngOnInit() {
    this.personService.getAll().subscribe(data => {
      this.persons = data;
      this.collectionSize = this.persons.length;
      this.loading = false;
    },
    error => {
      this.error = error;
      console.error(error);
    });
  }

  gotoList() {
    this.router.navigate(['/person-list']);
  }
 
  remove(person: any): void {
    if(confirm("¿Está seguro que desea eliminar a la persona?")) {
      this.personService.remove(person.id).subscribe( data => {
        this.persons = this.persons.filter(u => u !== person);
      },
      error => {
        this.error = error;
        console.error(error);
      });
    }
  };

}
