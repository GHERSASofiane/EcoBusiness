import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../pages/Class/User';
import * as CryptoJS from 'crypto-js';
 
@Injectable()
export class UserProvider {

  private _user: User;

  private ADSProfil = "https://ecobusiness-server.herokuapp.com/ADSProfil";

  private Login = "https://ecobusiness-server.herokuapp.com/Login"; 

  private _url = "https://ecobusiness-server.herokuapp.com/editprofile";
 

  
  constructor(public http: HttpClient) { }


// Ajoute un compte
   public register(user: User) {
    const usr = user;
    usr.userPassword = this.encryptePass(user.userPassword);
    return this.http.post<any>(this.ADSProfil,usr);
  }

  // login
  public login(user: User)  {
    const usr = user;
    usr.userPassword = this.encryptePass(user.userPassword);
    return this.http.post<any>(this.Login, usr);
  }
  
   
  updateProfile(user)
  {
    const usr = user;
    usr.userPassword = this.encryptePass(user.userPassword);
    return this.http.post<any>(this._url,usr);
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
  
  /** 
  forgotPass(email){
    let params = new HttpParams().set('userMail', email);
    return this.http.get<any>(this._forgotUrl, {params : params});
   
  }
*/
  encryptePass(pw){
    let password = 'disPasswordIsSoSec§ur#!';
    const key = CryptoJS.enc.Base64.parse(password);
    const iv  = CryptoJS.enc.Base64.parse("#base64IV#");
    let encrypted = CryptoJS.AES.encrypt("Secret Text", key, {iv: iv}).toString();
    return encrypted;
}

}
