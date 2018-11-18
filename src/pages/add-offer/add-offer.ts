import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../Class/User';
import { Offer } from '../Class/Offer';
import { ProductProvider } from '../../providers/product/product';
import { HomePage } from '../home/home';

import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-add-offer',
  templateUrl: 'add-offer.html',
})
export class AddOfferPage {

  // les variables 
  public userMe: User;
  product = new Offer();
  private selectedFile: File = null;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private ProductProvid: ProductProvider, private storage: Storage,
    public alertCtrl: AlertController) {

    
        // Or to get a key/value pair
        this.storage.get('UserMe').then((val) => { 
          if(val != null){
            this.userMe = val; 
          }else{
            this.navCtrl.setRoot(HomePage)
          }
          
        }).catch(
         err => this.navCtrl.setRoot(HomePage)
        ); 

    this.product.ProductPicture = '';
    this.product.ProductDate = "";
    this.product.ProductName = "";
    this.product.ProductDescription = "";
    this.product.ProductPrice = 0;
    this.product.UserId = this.userMe.userId;
  }

  // selection de photo de produit 
  onFileSelected(event) {

    this.selectedFile = <File>event.target.files[0];
    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(this.selectedFile);
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.product.ProductPicture = btoa(binaryString);
  }

  // fonction qui s'occupe de l'ajoute de l'annance
  public addProduct() { 
    this.product.ProductDescription = this.product.ProductDescription.toLowerCase();
    this.product.ProductName = this.product.ProductName.toLowerCase();

    this.ProductProvid.AddProduct(this.product).subscribe(
      res => {
        console.log(res);
        if (res.status === "ok") {
          this.showAlert("SUCCESS", res.message);
          this.navCtrl.pop();
        } else {
          this.showAlert("ERROR", res.message);
        }
      },
      err => 
      {
        console.log(err);
        this.showAlert("ERROR", "Error on the server :( :( ")
      }
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
