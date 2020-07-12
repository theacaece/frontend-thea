import { first } from 'rxjs/operators';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/_services/user.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent {
  loading = false;
  userDeleteForm: FormGroup;
  errorMessage: string;
  successMessage: string;

  constructor(
    public dialogRef: MatDialogRef<UserDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public id: number,
    private userService: UserService
  ) {
    this.userDeleteForm = new FormGroup({
      'id': new FormControl(),
    });
    this.userDeleteForm.controls['id'].setValue(id);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    this.userService.delete(this.userDeleteForm.controls['id'].value).pipe(first()).subscribe(response => {
      console.log(response);
    })
  }

}
