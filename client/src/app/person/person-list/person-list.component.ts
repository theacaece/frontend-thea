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

  constructor(private route: ActivatedRoute,
    private router: Router,
    private personService: PersonService) {
  }

  ngOnInit() {
    this.personService.getAll().subscribe(data => {
      this.persons = data;
    }), error => console.error(error);
  }

  gotoList() {
    this.router.navigate(['/person-list']);
  }

  remove(person): void {
    this.personService.remove(person.id).subscribe( data => {
      this.persons = this.persons.filter(u => u !== person);
      alert("Se elmino correctamente");
    })
  };

}
