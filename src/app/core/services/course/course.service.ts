import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Icourse } from '../../../shared/interfaces/icourse';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  group(arg0: { moduleTitle: string[]; videos: any; }) {
    throw new Error('Method not implemented.');
  }
  array(arg0: never[]) {
    throw new Error('Method not implemented.');
  }

  constructor(private _HttpClient:HttpClient) { }
  token:any=localStorage.getItem('token')

  getAllCourses(num:any):Observable<any>{
    return this._HttpClient.get(`http://38.242.207.46/api/v1/courses/?page=${num}`)
  }

  getCourseById(id:any):Observable<any>{
    return this._HttpClient.get(`http://38.242.207.46/api/v1/courses/${id}`)
  }

  createCourse(data:object):Observable<any>{
    return this._HttpClient.post(`http://38.242.207.46/api/v1/courses/`,data)
  }

  searchByName():Observable<any>{
    return this._HttpClient.get(`http://38.242.207.46/api/v1/courses/search/`)
  }


putUpdateCourse(id:string,course:Icourse):Observable<any>{
  return this._HttpClient.put(`http://38.242.207.46/api/v1/courses/${id}`,course)
}

  deleteCourse(id:string):Observable<any>{
    return this._HttpClient.delete(`http://38.242.207.46/api/v1/courses/${id}`)
  }
}
