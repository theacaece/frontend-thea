import { Component } from '@angular/core';

import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';

import { User } from './_models/user';
import { Router } from '@angular/router';
import { AuthenticationService } from './_services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Thea';
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    public matDialog: MatDialog
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
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