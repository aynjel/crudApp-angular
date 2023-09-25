import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api_url = 'http://localhost:8085/api/users';

  constructor(private _http: HttpClient) { }

  addUser(user: User){
    return this._http.post(`${this.api_url}/create`, user);
  }

  getUsers(){
    return this._http.get(`${this.api_url}`);
  }

  deleteUser(id: number){
    return this._http.delete(`${this.api_url}/${id}/delete`);
  }

  getUserById(id: number){
    return this._http.get(`${this.api_url}/${id}`);
  }

  updateUser(id: number, user: User){
    return this._http.put(`${this.api_url}/${id}/update`, user);
  }
}
