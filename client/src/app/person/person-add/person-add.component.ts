import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { NgForm } from '@angular/forms';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { PersonService } from '../../_services/person.service';

import { ConfirmDialogService } from 'src/app/_services/confirm-dialog.service';
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
              private dialog: ConfirmDialogService,
              private commonService: CommonService) {
  }

  ngOnInit() {
}

  gotoList() {
    this.router.navigate(['/person-list']);
  }

  confirmSave(){
    this.dialog.openDialog({
        title: 'Confirmar operación',
        subject: `¿Está seguro que desea guardar la persona?`
      }).subscribe(resultOk =>
        {
        if (resultOk)
        {
            this.save();
        }
        }, error => {
        this.error = error;
        console.error(error);
      });
    }

  save() {
    this.personService.save(this.person).subscribe(result => {
      this.gotoList();
    }, error => {
      this.error = error;
      this.commonService.alertar(this.MSJ_ERROR);
      console.error(error);
    }); 
  }  
  
}
