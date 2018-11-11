import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../pages/Class/User';
 
@Injectable()
export class UserProvider {

  private ADSProfil = "https://ecobusiness-server.herokuapp.com/ADSProfil";

  private Login = "https://ecobusiness-server.herokuapp.com/Login"; 

  private _url = "https://wastless.herokuapp.com/editprofile";
 

  
  constructor(public http: HttpClient) { }


// Ajoute un compte
   public register(user: User) {
    return this.http.post<any>(this.ADSProfil,user)
  }

  // login
  public login(user: User)  {
    return this.http.post<any>(this.Login, user)
  }
  
   

  updateProfile(user)
  {
    return this.http.post<any>(this._url,user)
  }
 

}
