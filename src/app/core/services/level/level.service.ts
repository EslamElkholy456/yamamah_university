import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LevelService {

  constructor(private _HttpClient:HttpClient) { }
  token:any=localStorage.getItem('token')

  getAllLevels():Observable<any>{
    return this._HttpClient.get(`http://38.242.207.46/api/v1/levels`)
  }
  getAllLevelsById(id:any):Observable<any>{
    return this._HttpClient.get(`http://38.242.207.46/api/v1/levels/${id}`)
  }
}
