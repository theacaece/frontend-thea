import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { NgForm } from '@angular/forms';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { PersonService } from '../../_services/person.service';
import { CommonService } from '../../_services/common.service';

@Component({
  selector: 'app-person-add',
  templateUrl: './person-add.component.html',
  styleUrls: ['./person-add.component.css']
})
export class PersonAddComponent implements OnInit {

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

  person: any = {};

  sub: Subscription;

  error: string = '';

  MSJ_ERROR = "Ya existe una Persona con este DNI y/o Matricula";
  
  constructor(private route: ActivatedRoute,
              private router: Router,
              private personService: PersonService,
              private commonService: CommonService) {
  }

  ngOnInit() {

  }

  gotoList() {
    this.router.navigate(['/person-list']);
  }

  save(form: NgForm) {
    if(confirm("¿Está seguro que desea guardar el usuario?")) {
      this.personService.save(form).subscribe(result => {
        this.gotoList();
      }, 
      error => {
        this.commonService.alertar(this.MSJ_ERROR);
        console.error(error);
      });
    }  
  }
  
}
