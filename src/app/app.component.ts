import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import { UserService } from './services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  displayedColumns:string[] = ['Id', 'Name', 'Email', 'Gender', 'Education', 'Company', 'DOB', 'Actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  openDialog() {
    const dialogRef = this._dialog.open(UserAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUsers();
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  getUsers() {
    this._userService.getUsers().subscribe({
      next: (result: any) => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  deleteUser(id: number) {
    this._userService.deleteUser(id).subscribe({
      next: (result) => {
        alert('User deleted successfully');
        console.log(result);
        this.getUsers();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  openEditDialog(data: any) {
    const dialogRef = this._dialog.open(UserAddEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUsers();
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
