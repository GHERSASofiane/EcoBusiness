import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product'; 
import { User } from '../Class/User';
import { OffreDetails } from '../Class/OffreDetails';
import { OfferSearchPage } from '../offer-search/offer-search';
import { HomePage } from '../home/home';
 
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';

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
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage
    ,private ProductProvid: ProductProvider,public alertCtrl: AlertController) {
      
        // Or to get a key/value pair
        this.storage.get('UserMe').then((val) => { 
          if(val != null){
            this.userMe = val; 
            this.GetDriving();
          }else{
            this.navCtrl.setRoot(HomePage)
          }
          
        }).catch(
         err => this.navCtrl.setRoot(HomePage)
        );
        
  }


  // reuperer le driving
  public GetDriving() {

    this.ProductProvid.Driving(this.userMe.userId).subscribe(
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

    // valider l'achat le produit
    public Buy(id: number){

      this.ProductProvid.Buy(id).subscribe(
        res => {
          if (res.status == "ok") { 
            this.showAlert("SUCCESS", res.message);
            this.navCtrl.setRoot(OfferSearchPage); 
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
