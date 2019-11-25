import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { PersonService } from '../../_services/person.service';

@Component({
  selector: 'app-person-add',
  templateUrl: './person-add.component.html',
  styleUrls: ['./person-add.component.css']
})
export class PersonAddComponent implements OnInit {

  person: any = {};

  sub: Subscription;

  error: string = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private personService: PersonService) {
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
        this.error = error;
        console.error(error);
      });
    }  
  }
  
}
