import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';



import { NgForm } from '@angular/forms';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { PersonService } from '../../_services/person.service';
import { CommonService } from '../../_services/common.service';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent implements OnInit {

  personForm: FormGroup;

  nombre = new FormControl('', [
    Validators.required
  ]);
  
  apellido = new FormControl('', [
    Validators.required
  ]);

  dni = new FormControl('', [
    Validators.required
  ]);

  matricula = new FormControl('', [
    Validators.required
  ]);

  id: any;

  persona: any = {};

  sub: Subscription;

  error: string = '';

  MSJ_ERROR = "Ya existe una Persona con este DNI y/o Matricula"

  constructor(private route: ActivatedRoute,
              private router: Router,
              private personService: PersonService,
              private commonService: CommonService) {
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

  update(Form: NgForm) {

    if(confirm("¿Está seguro que desea editar el usuario?")) {
      this.personService.update(this.id, Form).subscribe(result => {
        this.gotoList();
      },
      error => {
        this.commonService.alertar(this.MSJ_ERROR);
        console.error(error);
      });
    }  
  }
  
}
