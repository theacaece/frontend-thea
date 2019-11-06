import { Component, OnInit } from '@angular/core';

import { NgForm } from '@angular/forms';

//import { UsuarioService } from '../../_services/usuario.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})
export class UsuarioListComponent implements OnInit {

 usuarios: Array<any>;

 constructor(private uerService: UserService) { }

  ngOnInit() {
    this.uerService.getAll().subscribe(data => {
      this.usuarios = data;
    }, error => console.error(error));
  }
  
  submit() {

  }

}
