import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';

 
import { HttpClient } from '@angular/common/http';

import { SignUpPage } from '../sign-up/sign-up'; 
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../Class/User';
import { Reponse } from '../Class/reponse';
import { UserProvider } from '../../providers/user/user';
import { OfferSearchPage } from '../offer-search/offer-search';
import { Storage } from '@ionic/storage'; 



 

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

  constructor(private UserProvid: UserProvider, public http: HttpClient, public navCtrl: NavController,
    public alertCtrl: AlertController, private storage: Storage) {

    this.user = new User("","");
    this.myForm = new FormGroup({
      userMail: new FormControl('', [Validators.required, Validators.pattern(".+\@.+\..")]),
      userPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }


  public logIn(){
   
    this.done = false;
      this.UserProvid.login(this.user).subscribe
        (
          res =>  {
            if (res.status == "ok") {   
  // set a key/value
            this.storage.remove('UserMe'); 
            this.storage.set('UserMe', res.reponse); 
            this.navCtrl.setRoot(OfferSearchPage);
            } else { 
              this.showAlert("ERROR", res.message);
            }
          }, 
          err => this.showAlert("ERROR", "Error on the server :( :( ")
        );
 
  }

  register()
  {
    this.navCtrl.push(SignUpPage)
  }



  //*********** Function pour alert */
  private showAlert(title: string, subTitle: string): void {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

}
