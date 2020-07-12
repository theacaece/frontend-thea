import { UserData } from './../../_models/user-data';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/_services/user.service';
import { first } from 'rxjs/operators';
import { Role } from 'src/app/_models/role';
import { Photo } from 'src/app/_models/user-photo';

@Component({
  selector: 'app-user-show',
  templateUrl: './user-show.component.html',
  styleUrls: ['./user-show.component.css']
})
export class UserShowComponent {

  data = new UserData();

  constructor(public dialogRef: MatDialogRef<UserShowComponent>,
    @Inject(MAT_DIALOG_DATA) public id: number,
    private userService: UserService,
  ) {
    this.userService.get(id).pipe(first()).subscribe(response => {
      this.data = response;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  showRoles(roles: Array<Role>): string {
    let rolesView = "";
    if (roles != null) {
      roles.forEach((element, index) => {
        if (index == (roles.length - 1))
          rolesView += `${element.name}`;
        else
          rolesView += `${element.name}, `;
      });
    }
    return rolesView;
  }

  showPhoto(): string{
    let NO_PERFIL_IMG = "../../../assets/img/no-img-perfil.png";
    if (this.data != undefined && this.data.photos == null || this.data.photos == undefined)
      return NO_PERFIL_IMG;
    else
      if (this.data.photos.length <= 0)
        return NO_PERFIL_IMG;
      else
        return `data:image/jpeg;base64,${this.data.photos[0].photo}`;
  }
}
