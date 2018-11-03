import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular'; 
import { Offer } from '../Class/Offer';
import { User } from '../Class/User';
import { ProductProvider } from '../../providers/product/product';
import { EditOfferPage } from '../edit-offer/edit-offer';
import { ReservationRequestsPage } from '../reservation-requests/reservation-requests';


@IonicPage()
@Component({
  selector: 'page-my-pubs',
  templateUrl: 'my-pubs.html',
})
export class MyPubsPage {

  // Variables 
  public offrs: Offer[];
  private userMe: User;
  public OffLenght = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams
    , private ProductProvid: ProductProvider,
    public alertCtrl: AlertController) {

    this.userMe = navParams.get('user');
    this.GetProduct();
  }

  ionViewDidLoad() { }

  public GetProduct() {

    this.ProductProvid.MyPubs(this.userMe.userId).subscribe(
      res => {
        if (res.status == "ok") {
          this.offrs = res.reponse;
          this.OffLenght = this.offrs.length;
        } else {
          this.showAlert("ERREUR", res.message);
        }
      },
      err => this.showAlert("ERREUR", "Erreur sur le serveur :( :( ")
    )
  }

  public Delete(id: number) {

    this.ProductProvid.DeleteProduct(id).subscribe(
      res => {
        if (res.status == "ok") {
          this.showAlert("SUCCESS", res.message);
          this.GetProduct();
        } else {
          this.showAlert("ERREUR", res.message);
        }
      },
      err => this.showAlert("ERREUR", "Erreur sur le serveur :( :( ")
    )
  }

  public Edit(offre: Offer) {

    this.navCtrl.push(EditOfferPage, { offre: offre, user: this.userMe });
  }

  public Requests(offre: Offer){

    this.navCtrl.push(ReservationRequestsPage, { offre: offre, user: this.userMe });

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
