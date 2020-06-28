import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";
import { Observable } from "rxjs";

/**
 * Popup de confirmación, servicio para ser inyectado y utilizado, ver ConfirmDialogData para ver
 * parámetros que pueden pasarse
 */

interface ConfirmDialogData {
    title: string,
    subject: string,
    note?: string
}

@Injectable()
export class ConfirmDialogService {
    
    defaultWidth: string = '300px';

    constructor( private matDialog:MatDialog ) {

    }

    /**
     * Dialog estandard
     * 
     * @param data Title, subject y note
     */
    openDialog(data: ConfirmDialogData): Observable<any> {

        let dialogRef = this.matDialog.open(ConfirmDialogComponent, {
            width: this.defaultWidth,
            data: data
        });

        return dialogRef.afterClosed();
    }

}