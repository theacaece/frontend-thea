import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { MatDialogModule} from '@angular/material/dialog';

import {MAT_DIALOG_DATA, MatDialogConfig, MatDialog, MatDialogRef} from "@angular/material";

import { ModalComponent } from '../modal/modal.component';

@Injectable({providedIn: 'root'})

export class CommonService {

    constructor(public matDialog: MatDialog) {
    
    }
  
    public alertar(texto: String) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.id = "modal-component";
        dialogConfig.height = "170px";
        dialogConfig.width = "380px";
        dialogConfig.data = { mensaje: texto};
        const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
    }

    //TO DO customizar confirmar
    public confirmar(texto: String) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.id = "modal-component";
        dialogConfig.height = "170px";
        dialogConfig.width = "380px";
        dialogConfig.data = { mensaje: texto};
        const modalDialog = this.matDialog.open(ModalComponent, dialogConfig);
    }

}