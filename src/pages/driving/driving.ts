import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product'; 
import { User } from '../Class/User';
import { OffreDetails } from '../Class/OffreDetails';
import { OfferSearchPage } from '../offer-search/offer-search';
 

@IonicPage()
@Component({
  selector: 'page-driving',
  templateUrl: 'driving.html',
})
export class DrivingPage {

  // Variables 
  public Calls: OffreDetails[];
  private userMe: User;
  public OffLenght = 0;
  
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,private ProductProvid: ProductProvider,public alertCtrl: AlertController) {
      this.userMe = navParams.get('user');
      this.GetDriving();
  }


  // reuperer le driving
  public GetDriving() {

    this.ProductProvid.Driving(this.userMe.userId).subscribe(
      res => {
        if (res.status == "ok") {
          console.log(res);
          this.Calls = res.reponse;
          this.OffLenght = this.Calls.length;
        } else {
          this.showAlert("ERROR", res.message);
        }
      },
      err => this.showAlert("ERROR", "Error on the server :( :( ")
    )
  }

    // valider l'achat le produit
    public Buy(id: number){

      this.ProductProvid.Buy(id).subscribe(
        res => {
          if (res.status == "ok") { 
            this.showAlert("SUCCESS", res.message);
            this.navCtrl.setRoot(OfferSearchPage); 
          } else {
            this.showAlert("ERROR", res.message);
          }
        },
        err => this.showAlert("ERROR", "Error on the server :( :( ")
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
