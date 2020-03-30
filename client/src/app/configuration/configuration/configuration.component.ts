import { Component, OnInit } from '@angular/core';

import { first } from 'rxjs/operators';

import { EntrenamientoService } from '../../_services/entrenamiento.service';
import { CommonService } from '../../_services/common.service';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-registro-ingresos',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css'],
})
export class ConfigurationComponent implements OnInit {

  MSJ_OK = "Entrenamiento finalizado correctamente.";
  MSJ_ERROR = "Ha ocurrido un error.";
  
  loading: boolean = false;
  error: string = '';

  serverData: JSON;
  

  constructor(private entrenamientoService: EntrenamientoService,
              private commonService: CommonService) {
  }

  ngOnInit() {
  }

  entrenar() {
    this.loading = true;
    this.entrenamientoService;
    this.entrenamientoService.post().subscribe(
      data => {
        this.loading = false;
        this.serverData = data as JSON
        console.log(this.serverData);
        this.commonService.alertar(this.MSJ_OK);
      },
      error => {
        this.commonService.alertar(this.MSJ_ERROR);
        this.error = error;
        this.loading = false;
      });
  }
 
}
