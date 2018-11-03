import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular'; 
import { User } from '../Class/User';
import { OffreDetails } from '../Class/OffreDetails';
import { Reservation } from '../Class/Reservation';
import { ProductProvider } from '../../providers/product/product';
 

@IonicPage()
@Component({
  selector: 'page-offer-consult',
  templateUrl: 'offer-consult.html',
})
export class OfferConsultPage {

  // Variables
  public userMe: User;
  private id;
  public infos: OffreDetails;
  // **** For chat 
  public Reservation: Reservation = new Reservation();

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private ProductProvid: ProductProvider, public alertCtrl: AlertController) {
    this.id = navParams.get('id');
    this.userMe = navParams.get('user');
    this.GetDetails();

    this.Reservation.ReservationMessage = '';
    this.Reservation.ReservationDate = '';

  }

  ionViewDidLoad() { }

  private GetDetails(): void {
    this.ProductProvid.GetProductDetails(this.id).subscribe(
      res => {
        if (res.status == "ok") {
          this.infos = res.reponse;
        } else {
          this.showAlert("ERREUR", res.message);
        }
      },
      err => this.showAlert("ERREUR", "Erreur sur le serveur :( :( ")
    )
  }
 

  public SendReservation(){

    this.Reservation.ReservationSend = this.userMe.userId;
    this.Reservation.ReservationReceive = this.infos.UserId;
    this.Reservation.ReservationProduct = this.infos.ProductId;
    
    this.ProductProvid.SendReservation(this.Reservation).subscribe(
      res => {
        if (res.status == "ok") {
          this.showAlert("SUCCESS", res.message);  
          this.navCtrl.pop();
        } else {
          this.showAlert("ERREUR", res.message);
        }
      },
      err => this.showAlert("ERREUR", "Erreur sur le serveur :( :( ")
    )
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
