import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';



import { NgForm } from '@angular/forms';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { PersonService } from '../../_services/person.service';
import { CommonService } from '../../_services/common.service';
import { ConfirmDialogService } from 'src/app/_services/confirm-dialog.service';

import { AuthenticationService } from '../../_services/authentication.service';
import { User } from '../../_models/user';


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

  currentUser: User;

  sub: Subscription;

  error: string = '';

  MSJ_ERROR = "Ya existe una Persona con este DNI y/o Matricula"

  constructor(private route: ActivatedRoute,
              private router: Router,
              private personService: PersonService,
              private authenticationService: AuthenticationService,
              private dialog: ConfirmDialogService,
              private commonService: CommonService) {
            this.authenticationService.currentUser.subscribe(x => this.currentUser = x)

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

  confirmUpdate(){
    this.dialog.openDialog({
        title: 'Confirmar operación',
        subject: `¿Está seguro que desea guardar la persona?`
      }).subscribe(resultOk =>
        {
        if (resultOk)
        {
            this.update();
        }
        }, error => {
        this.error = error;
        console.error(error);
      });
    }

  update() {
    if (this.currentUser.admin) {
    this.personService.update(this.id, this.persona).subscribe(result => {
      this.gotoList();
    }, error => {
      this.error = error;
      this.commonService.alertar(this.MSJ_ERROR);
      console.error(error);
    });
    } else {
      this.commonService.alertar("El usuario logueado no tiene suficientes permisos como para completar la operacion");
    };
  }  
  
}
