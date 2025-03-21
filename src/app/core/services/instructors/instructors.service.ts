import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstructorsService {

  constructor(private http:HttpClient) { }

  getInstructors():Observable<any>{
    return this.http.get(`http://38.242.207.46/api/v1/users/instructors`)
  }
}
