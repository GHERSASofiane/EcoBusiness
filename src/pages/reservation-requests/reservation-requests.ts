import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../Class/User';
import { Offer } from '../Class/Offer';



@IonicPage()
@Component({
  selector: 'page-reservation-requests',
  templateUrl: 'reservation-requests.html',
})
export class ReservationRequestsPage {

  // Variables
  public userMe: User;
  private offre: Offer = new Offer();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.userMe = navParams.get('user');
    this.offre = this.navParams.get('offre');
    this.GetReservationReq();
  }

  ionViewDidLoad() { }

  private GetReservationReq(){

  }

}
