import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userToken:any;
  userRole: string | undefined;
  constructor(private _HttpClient:HttpClient) { }

private readonly router=inject(Router)

  sendRegisterForm(data:object):Observable<any>{
    return this._HttpClient.post(`http://38.242.207.46/api/v1/auth/signUp`,data)
  }
  
  sendLoginForm(data:object):Observable<any>{
    return this._HttpClient.post(`http://38.242.207.46/api/v1/auth/signIn`,data)
  }

  userData():void{
    this.userToken=jwtDecode(localStorage.getItem('token')!)
    console.log(this.userToken);
    this.userRole=this.userToken.role
    console.log(this.userRole);
  }

  logoutUser():void{
    localStorage.removeItem('token');
    this.userToken=null
    this.router.navigate(['/login'])
  }


  forgetPassword(data:object):Observable<any>{
    return this._HttpClient.post(`http://38.242.207.46/api/v1/auth/forgot-password`,data)
  }
  resetPassword(data:object):Observable<any>{
    return this._HttpClient.post(`http://38.242.207.46/api/v1/auth/reset-password`,data)
  }
 
}
 

