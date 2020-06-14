import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/model/User';
import { FirebaseService } from 'src/app/services/firebase.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['Nombre', 'Email', 'Rol', 'Estado', "Profesional Verificado"];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private firebaseService: FirebaseService, public dialog: MatDialog) {
    // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource();
  }

  async ngOnInit() {
    var users = await this.firebaseService.getUsers();
    this.dataSource = new MatTableDataSource(users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onchangeUserStatus(user: User) {
    user.deleted = !user.deleted;
    this.firebaseService.updateUserStatus(user);
  }

  async onchangeSpecialistStatus(user: User) {
    var title = user.disabled ? "Verificar Profesional" : "Anular Verificacion";
    var message = user.disabled ? "El usuario es un profesional verificado?" : "Desea anular la verificacion del profesional?";
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { title: title, message: message }
    });

    var confirm = await dialogRef.afterClosed().toPromise();

    if(confirm){
      user.disabled = !user.disabled;
      this.firebaseService.updateUserStatus(user);  
    }

  }


}
