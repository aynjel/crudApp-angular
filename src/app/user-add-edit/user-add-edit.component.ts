import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { of } from 'rxjs';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.scss']
})
export class UserAddEditComponent implements OnInit {
  userForm: FormGroup;

  educationList = ['High School', 'Bachelor', 'Master', 'Doctorate'];
  educations$ = of(this.educationList);

  constructor(
    private _fb: FormBuilder, 
    private _userService: UserService, 
    private _dialogRef: MatDialogRef<UserAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    this.userForm = this._fb.group({
      name: '',
      email: '',
      password: '',
      education: '',
      dob: '',
      gender: '',
      company: '',
    });
  }

  ngOnInit(): void {
    this.userForm.patchValue(this.data);
  }

  onFormSubmit(){
    if(this.userForm.valid){
      if(this.data){
        this._userService.updateUser(this.data.id, this.userForm.value).subscribe({
          next: (result) => {
            Swal.fire('Success', 'User updated successfully', 'success');
            console.log(result);
            this._dialogRef.close(true);
          },
          error: (error) => {
            console.log(error);
          }
        });
      }else{
        this._userService.addUser(this.userForm.value).subscribe({
          next: (result) => {
            Swal.fire('Success', 'User added successfully', 'success');
            console.log(result);
            this._dialogRef.close(true);
          },
          error: (error) => {
            console.log(error);
          }
        });
      }
    }
  }

  cancel(){
    this._dialogRef.close();
  }
}
