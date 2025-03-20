import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private readonly _HttpClient:HttpClient) { }

  getUserName():Observable<any>{
    return this._HttpClient.get(`http://38.242.207.46/api/v1/users/by-name/`)
  }
  getAllOrgnizationCount():Observable<any>{
    return this._HttpClient.get(`http://38.242.207.46/api/v1/users/organizations/count`)
  }
  getAllStudentCount():Observable<any>{
    return this._HttpClient.get(`http://38.242.207.46/api/v1/users/students/count`)
  }
  getAllFacCount():Observable<any>{
    return this._HttpClient.get(`http://38.242.207.46/api/v1/users/faculty/count`)
  }
 getAllInstructors():Observable<any>{
  return this._HttpClient.get('http://38.242.207.46/api/v1/users/instructors')
 }



  postContact(data:object):Observable<any>{
    return this._HttpClient.post(`http://38.242.207.46/api/v1/contact/`,data)
  }
}
