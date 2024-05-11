import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()

export class AuthService 
{
  private _loginUrl = "http://localhost:6500/api/login";
 

  constructor(private _router: Router, private _http: HttpClient) { } 
  
  loginUser(user : any) 
  {
    return this._http.post<any>(this._loginUrl, user)
  }

  logoutUser() 
  {
    alert("Logout");
    localStorage.removeItem('token')
    this._router.navigate(['/login'])
  }

  getToken() 
  {
    return localStorage.getItem('token')
  }

  loggedIn() 
  {
    return !!localStorage.getItem('token')    
  }           

}
