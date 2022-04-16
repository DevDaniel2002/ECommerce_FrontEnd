import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService } from './base.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User>{

  constructor(http : HttpClient) {
    super(http, 'User');
  }

  public login(User: string, password: string){
    let params = new HttpParams().set('User', User).set('Password', password);
    
    return this._http.get(`${this.baseUrl}/${this._controlName}/login`, {params});
  }
}
