import { Component, OnInit, Inject } from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<ModalComponent>,
              @Inject(MAT_DIALOG_DATA) data) { 
      this.mensaje = data.mensaje;
  }

  mensaje: String = "";

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