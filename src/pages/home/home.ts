import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { OfferSearchPage } from '../offer-search/offer-search';
import { LoginPage } from '../login/login';
import { SignUpPage } from '../sign-up/sign-up';
import { Offer } from '../Class/Offer';
import { ProductProvider } from '../../providers/product/product';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
// variables

public Calls: Offer[];
public OffLenght = 0;

  constructor(public navCtrl: NavController, private ProductProvid: ProductProvider, private storage: Storage,
    public alertCtrl: AlertController) {
       

    // Or to get a key/value pair
    this.storage.get('UserMe').then( val => { 
      if(val != null){
        this.MainPage();
      }else{
        this.getoffresBypage('')
      }
 
    }).catch(
     err => this.getoffresBypage('')
    );
   
    
  }
 

  // si je suis connecter je serai rediriger vers la page principale
  MainPage()
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

    // récuperer les annances postuler en specifiant la page chaque page contien 10 annances
    public getoffresBypage(cle: string): void {

      this.ProductProvid.GetProducts(cle, 0).subscribe(
        res => {
          if (res.status == "ok") {
            this.Calls = res.reponse;
            this.OffLenght = this.Calls.length;
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
