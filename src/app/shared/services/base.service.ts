import { Inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { baseEntity } from '../models/baseEntity';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T extends baseEntity > {

  baseUrl: string = environment.apiurl;

  public constructor(
    protected _http: HttpClient,
    @Inject(String) protected _controlName: string
  ) { }

  public getAll() {
    return this._http.get<T[]>(`${this.baseUrl}/${this._controlName}`);
  }

  public getByQuery(query: string): Observable<any> {
    return this._http.get<any>(`${this.baseUrl}/${this._controlName}/Query?${query}`);
  }

  public findbyId(id: number): Observable<T> {
    return this._http.get<T>(`${this.baseUrl}/${this._controlName}/${id}`);
  }

  public insert(item: T): Observable<T> {
    return this._http.post<T>(`${this.baseUrl}/${this._controlName}`, item);
  }

  public update(item: T): Observable<T> {
    return this._http.put<T>(`${this.baseUrl}/${this._controlName}/${item['id']}`, item);
  }

  public delete(id: number): Observable<T> {
    return this._http.delete<T>(`${this.baseUrl}/${this._controlName}/${id}`);
  }
}