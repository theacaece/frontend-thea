import { Component, OnInit } from '@angular/core';

import { first } from 'rxjs/operators';

import { EntrenamientoService } from '../../_services/entrenamiento.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css'],
})
export class ConfigurationComponent implements OnInit {

  loading = false;
  resultado: boolean = false;
  enviado: boolean = true;
  error = '';
  

  constructor(private entrenamientoService: EntrenamientoService) { 
    
  }

  ngOnInit() {

  }

  onClick() {

    this.loading = true;
    this.entrenamientoService;

    this.entrenamientoService.post().subscribe(
      data => {
        this.loading = false;
        this.resultado = true;
        this.enviado = true;
      },
      error => {
        this.error = error;
        this.loading = false;
      });
  }

}
