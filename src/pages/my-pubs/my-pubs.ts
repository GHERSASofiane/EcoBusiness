import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular'; 
import { Offer } from '../Class/Offer';
import { User } from '../Class/User';
import { ProductProvider } from '../../providers/product/product';
import { EditOfferPage } from '../edit-offer/edit-offer';
import { ReservationRequestsPage } from '../reservation-requests/reservation-requests';
import { HomePage } from '../home/home';

import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-my-pubs',
  templateUrl: 'my-pubs.html',
})
export class MyPubsPage {

  // Variables 
  public Calls: Offer[];
  private userMe: User;
  public OffLenght = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage,
              private ProductProvid: ProductProvider,public alertCtrl: AlertController) {

        // Or to get a key/value pair
        this.storage.get('UserMe').then((val) => { 
          if(val != null){
            this.userMe = val; 
            this.GetProduct();
          }else{
            this.navCtrl.setRoot(HomePage)
          }
          
        }).catch(
         err => this.navCtrl.setRoot(HomePage)
        );
  }

  // reuperer les annances
  public GetProduct() {

    this.ProductProvid.MyPubs(this.userMe.userId).subscribe(
      res => {
        if (res.status == "ok") {
          this.Calls = res.reponse;
          this.OffLenght = this.Calls.length;
        } else {
          this.showAlert("ERROR", res.message);
        }
      },
      err => this.showAlert("ERROR", "Error on the server :( :( ")
    )
  }

  // supprission d'une annance
  public Delete(id: number) {

    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Est-tu vous sûr de continuer cette operation ?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Oui',
          handler: () => {
            this.ProductProvid.DeleteProduct(id).subscribe(
              res => {
                if (res.status == "ok") {
                  this.showAlert("SUCCESS", res.message);
                  this.GetProduct();
                } else {
                  if(res.message === "Dec")
                  {
                    localStorage.removeItem('token');
                    this.navCtrl.setRoot(LoginPage);
                  }
                  else
                  this.showAlert("ERROR", res.message);
                }
              },
              err => this.showAlert("ERROR", "Error on the server :( :( ")
            )
          }
        }
      ]
    });
    alert.present();


  }

  // Modifer une annance
  public Edit(offre: Offer) {
    this.navCtrl.push(EditOfferPage, { offre: offre, user: this.userMe });
  }

  // consulter les demande de reservation de cette annance
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
