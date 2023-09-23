import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  addUser(user: User){
    return this._http.post('http://localhost:8085/api/users/add', user);
  }

  getUsers(){
    return this._http.get('http://localhost:8085/api/users');
  }

  deleteUser(id: number){
    return this._http.delete(`http://localhost:8085/api/users/delete/${id}`);
  }

  getUserById(id: number){
    return this._http.get(`http://localhost:8085/api/users/${id}`);
  }

  updateUser(id: number, user: User){
    return this._http.put(`http://localhost:8085/api/users/update/${id}`, user);
  }
}
