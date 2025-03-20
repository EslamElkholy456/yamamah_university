import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
}
