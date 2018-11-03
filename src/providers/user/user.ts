import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../pages/Class/User';
 
@Injectable()
export class UserProvider {

  private _loginUrl = "https://wastless.herokuapp.com/authen";
  private _registerUrl = "https://wastless.herokuapp.com/signup";
  private _user = new User("", "");

  private _url = "https://wastless.herokuapp.com/editprofile";

  private _userHome = "https://wastless.herokuapp.com/userhome";

  
  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }


  register(user)
  {
    return this.http.post<any>(this._registerUrl,user)
  }

  login(user)
  {
    return this.http.post<any>(this._loginUrl, user)
  }

  loggedIn()
  {
    return !!localStorage.getItem('token');
  
  }

  getToken()
  {
    return localStorage.getItem('token');
      
  }

  setUser(user: User)
  {
    this._user = user;
  }

  getUser()
  {
    return this._user;
  }
  

  updateProfile(user)
  {
    return this.http.post<any>(this._url,user)
  }


  getMyProducts()
  {
    
    return this.http.get<any>(this._userHome)
  }


}
