import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ilevels } from '../../../shared/interfaces/ilevels';

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

  postLevel(data:object):Observable<any>{
    return this._HttpClient.post(`http://38.242.207.46/api/v1/levels/`,data)
  }
 putUpdateLevel(id:string,level:Ilevels):Observable<any>{
    return this._HttpClient.put(`http://38.242.207.46/api/v1/levels/${id}`,level)
  }

  deleteLevel(id:string):Observable<any>{
    return this._HttpClient.delete(`http://38.242.207.46/api/v1/levels/${id}`)
  }

}
