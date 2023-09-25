import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserAddEditComponent } from './user-add-edit/user-add-edit.component';
import { UserService } from './services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
// import { of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  displayedColumns:string[] = ['Id', 'Name', 'Email', 'Gender', 'Education', 'Company', 'DOB', 'Actions'];
  dataSource!: MatTableDataSource<any>;
  // dataSources$ = of(this.dataSource);
  // users$ = this._userService.getUsers();

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
        // reverse the array
        this.dataSource = new MatTableDataSource(result.data.reverse());
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(result);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  deleteUser(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result: any) => {
      if (result.isConfirmed) {
        this._userService.deleteUser(id).subscribe({
          next: (result) => {
            console.log(result);
            this.getUsers();
          },
          error: (error) => {
            console.log(error);
          }
        });
        Swal.fire(
          'Deleted!',
          'User has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'User is safe :)',
          'error'
        )
      }
    })
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
