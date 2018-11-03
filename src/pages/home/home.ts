import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OfferSearchPage } from '../offer-search/offer-search';

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

}
