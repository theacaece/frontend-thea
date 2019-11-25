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

  persons: Array<any>;
  error: string = '';

  page: 1;
  itemsPerPage: number;
  totalItems: any;
  previousPage: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private personService: PersonService) {
  }

  ngOnInit() {
    this.loadData();
  }

  gotoList() {
    this.router.navigate(['/person-list']);
  }
   
  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.loadData();
    }
  }

  loadData() {
    this.personService.getAll().subscribe(data => {
      this.persons = data;
    },
    error => {
      this.error = error;
      console.error(error);
    });
  }

  remove(person: any): void {
    if(confirm("¿Está seguro que desea eliminar el usuario?")) {
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
