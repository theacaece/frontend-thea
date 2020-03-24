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
  error = '';

  serverData: JSON;
  

  constructor(private entrenamientoService: EntrenamientoService) { 
    
  }

  ngOnInit() {

  }

 entrenar() {
    this.loading = true;
    this.entrenamientoService;
    this.entrenamientoService.post().subscribe(
      data => {
        this.serverData = data as JSON
        console.log(this.serverData);
        alert("Entrenamiento finalizado correctamente.");
      },
      error => {
        alert("Error de Conexion");
        this.error = error;
        this.loading = false;
      });
  }

}
