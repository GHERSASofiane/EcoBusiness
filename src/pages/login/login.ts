import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

 
import { HttpClient } from '@angular/common/http';

import { SignUpPage } from '../sign-up/sign-up'; 
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../Class/User';
import { Reponse } from '../Class/reponse';
import { UserProvider } from '../../providers/user/user';
import { OfferSearchPage } from '../offer-search/offer-search';



 

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user :  User;
  reponse : Reponse;
  done = true;
  myForm: FormGroup;

  constructor(private UserProvid: UserProvider, public http: HttpClient, public navCtrl: NavController) {
    this.user = new User("","");
    this.myForm = new FormGroup({
      userMail: new FormControl('', [Validators.required, Validators.pattern(".+\@.+\..")]),
      userPassword: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }


  logIn()
  {
   
    this.done = false;
      this.UserProvid.login(this.user).subscribe
      (
        res => 
              {
                this.user = res.reponse;
                this.UserProvid.setUser(this.user);
                localStorage.setItem('token', res.token);

              },
        err => 
        {
          this.done = true;
          console.log(err)
        },
        () => {
               
               this.done = true;
               this.navCtrl.setRoot(OfferSearchPage);
              }
      
      ); 
  }

  register()
  {
    this.navCtrl.push(SignUpPage)
  }

}
