import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { PersonService } from '../../_services/person.service';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit {

  persona: any = {};

  sub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private personService: PersonService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
      	this.personService.get(id).subscribe(person => {
      		if (person) {
            this.persona.id = person.id;
            this.persona.nombre = person.nombre;
            this.persona.apellido = person.apellido;
            this.persona.dni = person.dni;
            this.persona.matricula = person.matricula;
          }
    	}, error => console.error(error));
      }
    }, error => console.error(error));
  }

  gotoList() {
    this.router.navigate(['/person-list']);
  }

  update(form: NgForm) {
    this.personService.update(form).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }
  
}
