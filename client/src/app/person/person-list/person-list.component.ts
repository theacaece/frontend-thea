import { Component, OnInit } from '@angular/core';

import { PersonService } from '../../_services/person.service';

@Component({
  selector: 'app-persons-list',
  templateUrl: './person-list.component.html',
  styleUrls: ['./person-list.component.css']
})
export class PersonListComponent implements OnInit {
  persons: Array<any>;

  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.personService.getAll().subscribe(data => {
      this.persons = data;
    }), error => console.error(error);
  }

}
