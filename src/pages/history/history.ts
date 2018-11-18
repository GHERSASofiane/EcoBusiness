import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Offer } from '../Class/Offer';
import { User } from '../Class/User';
import { ProductProvider } from '../../providers/product/product';
import { HomePage } from '../home/home';
 
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  // Variables 
  public Calls: Offer[];
  private userMe: User;
  public OffLenght = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage
              ,private ProductProvid: ProductProvider,public alertCtrl: AlertController) {

    // Or to get a key/value pair
    this.storage.get('UserMe').then((val) => { 
      if(val != null){
        this.userMe = val; 
        this.GetHistory();
      }else{
        this.navCtrl.setRoot(HomePage)
      }
      
    }).catch(
     err => this.navCtrl.setRoot(HomePage)
    );
    
  }

  // reuperer l'historie
  public GetHistory() {

    this.ProductProvid.GetHistory(this.userMe.userId).subscribe(
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
