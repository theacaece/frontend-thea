import { Component, OnInit } from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from '../../modal/modal.component';
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
  

  constructor(private entrenamientoService: EntrenamientoService,
              public matDialog: MatDialog) { 
    
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
        this.openModal();
      },
      error => {
        alert("Error de Conexion");
        this.error = error;
        this.loading = false;
      });
  }
  
  openModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = "modal-component";
    dialogConfig.height = "225px";
    dialogConfig.width = "380px";
    const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
  }


}
