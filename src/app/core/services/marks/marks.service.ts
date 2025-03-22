import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarksService {

  constructor(private http:HttpClient) { }

  postAddMark(data:object):Observable<any>{
    return this.http.post(`http://38.242.207.46/api/v1/marks/add`,data)
  }
  getStudentMark(id:string):Observable<any>{
    return this.http.get(`http://38.242.207.46/api/v1/marks/student/${id}`)
  }
}
