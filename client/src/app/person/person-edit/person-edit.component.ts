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

  id: any;

  persona: any = {};

  sub: Subscription;

  error: string = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private personService: PersonService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      if (this.id) {
      	this.personService.get(this.id).subscribe(person => {
      		if (person) {
            this.persona.id = person.id;
            this.persona.nombre = person.nombre;
            this.persona.apellido = person.apellido;
            this.persona.dni = person.dni;
            this.persona.matricula = person.matricula;
          }
    	  },
        error => {
          this.error = error;
          console.error(error);
        });
      }
    },
    error => {
      this.error = error;
      console.error(error);
    });
  }

  gotoList() {
    this.router.navigate(['/person-list']);
  }

  update(form: NgForm) {
    this.personService.update(this.id, form).subscribe(result => {
      this.gotoList();
    },
    error => {
      this.error = error;
      console.error(error);
    });
  }
  
}
