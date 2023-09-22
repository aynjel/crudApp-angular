import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  addUser(user: User){
    return this._http.post('http://localhost:3000/users', user);
  }

  getUsers(){
    return this._http.get('http://localhost:3000/users');
  }

  deleteUser(id: number){
    return this._http.delete(`http://localhost:3000/users/${id}`);
  }

  getUserById(id: number){
    return this._http.get(`http://localhost:3000/users/${id}`);
  }

  updateUser(id: number, user: User){
    return this._http.put(`http://localhost:3000/users/${id}`, user);
  }
}
