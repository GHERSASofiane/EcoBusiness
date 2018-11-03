import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../Class/User';
import { Offer } from '../Class/Offer';
import { ProductProvider } from '../../providers/product/product';
import { Reservation } from '../Class/Reservation';



@IonicPage()
@Component({
  selector: 'page-reservation-requests',
  templateUrl: 'reservation-requests.html',
})
export class ReservationRequestsPage {

  // Variables
  public userMe: User;
  private Call: Offer = new Offer();
  public reservs: Reservation[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
             private ProductProvid: ProductProvider, private alertCtrl: AlertController) {
               
    this.userMe = navParams.get('user');
    this.Call = this.navParams.get('offre');
    this.GetReservationReq();
  }
 
  // recuperer les demandes de reservations
  private GetReservationReq(){
    this.ProductProvid.GetReservationReq(this.Call.ProductId).subscribe(
      res => {
        if (res.status == "ok") {
          this.showAlert("OKKK", "res.reponse");
          this.reservs = res.reponse;
        } else {
          this.showAlert("ERROR", res.message);
        }
      },
      err => this.showAlert("ERROR", "Error on the server :( :( ")
    ); 
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
