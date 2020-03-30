import { Component, OnInit, Inject } from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

import {ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  encapsulation: ViewEncapsulation.None 
})

export class ModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalComponent>,
              @Inject(MAT_DIALOG_DATA) data) { 
      this.mensaje = data.mensaje;
  }

  titulo: String = "Mensaje del sistema";
  mensaje: String = "";
  isError: boolean = false;

  ngOnInit() {
  }

  actionFunction() {
    alert("You have logged out.");
    this.closeModal();
  }

  closeModal() {
    this.dialogRef.close();
  }

}