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

  person: any = {};

  sub: Subscription;

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
    this.personService.save(form).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  remove(href) {
    this.personService.remove(this.person).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }
  
}
