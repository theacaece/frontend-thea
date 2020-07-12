import { UserDeleteComponent } from './../user-delete/user-delete.component';
import { UserEditComponent } from './../user-edit/user-edit.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/_services/user.service';
import { first } from 'rxjs/operators';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { UserShowComponent } from '../user-show/user-show.component';
import { UserData } from 'src/app/_models/user-data';
import { Role } from 'src/app/_models/role';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent implements OnInit {
  loading = false;
  users: UserData[];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'username', 'email', 'edit', 'show', 'delete'];
  //displayedColumns: string[] = ['lastName', 'lastName', 'lastName', 'lastName','lastName'];
  dataSource: MatTableDataSource<UserData>;
  roles: Role[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private userService: UserService,
    public dialog: MatDialog) {
    // Assign the data to the data source for the table to render   
  }

  ngOnInit() {
    this.loading = true;
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.loading = false;
      this.users = users;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //para editar un usuario
  openDialogEditar(id: number): void {
    const dialogRef = this.dialog.open(UserEditComponent, {
      width: "80%",
      data: id,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe(result => {
      let indexUserChanged = this.users.findIndex(x => x.id == result.userDataChanged.id);
      this.users[indexUserChanged] = result.userDataChanged;
      this.dataSource.data = this.users;
    });
  }

  //para ver un usuario
  openDialogShow(id: number): void {
    const dialogRef = this.dialog.open(UserShowComponent, {
      width: "60%",
      data: id,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  //para Eliminar un usuario
  openDialogDelete(id: number): void {
    const dialogRef = this.dialog.open(UserDeleteComponent, {
      width: "60%",
      data: id
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
