import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { PersonService } from '../../_services/person.service';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit, OnDestroy {

  person: any = {};

  sub: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private personService: PersonService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.personService.get(id).subscribe((person: any) => {
          if (person) {
            this.person.nombre = person.nombre;
            this.person.apellido = person.apellido;
            this.person.dni = person.dni;
            this.person.matricula = person.matricula;
    	    alert("Se guardo correctamente");
          } else {
	        alert("Ha ocurrido un error");
          }
          this.gotoList();
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/person/person-list']);
  }

  save(form: NgForm) {
    this.personService.save(form).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  remove(href) {
    this.personService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }
}
