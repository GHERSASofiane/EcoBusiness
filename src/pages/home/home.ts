import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OfferSearchPage } from '../offer-search/offer-search';
import { LoginPage } from '../login/login';
import { SignUpPage } from '../sign-up/sign-up';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  search()
  {
    this.navCtrl.setRoot(OfferSearchPage); 
  }

 // connexion 
  login()
  {
    this.navCtrl.push(LoginPage);
  }
  
  // inscription
  register()
  {
    this.navCtrl.push(SignUpPage);
  }
}
