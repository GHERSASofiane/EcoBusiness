import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular'; 
import { User } from '../Class/User';
import { Offer } from '../Class/Offer';
import { ProductProvider } from '../../providers/product/product';


@IonicPage()
@Component({
  selector: 'page-edit-offer',
  templateUrl: 'edit-offer.html',
})
export class EditOfferPage {

  // Variables
  public userMe: User;
  private offre: Offer = new Offer();
  private selectedFile : File = null;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, private ProductProvid: ProductProvider) {

    this.offre = this.navParams.get('offre');
    this.userMe = navParams.get('user');

  }

  ionViewDidLoad() { }


  public onFileSelected(event: any): void {
    this.selectedFile = <File> event.target.files[0];
    var reader = new FileReader();
    reader.onload =this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(this.selectedFile);
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.offre.ProductPicture = btoa(binaryString);
   }

   // modifier l'annance
  public EditProduct() {

    this.offre.ProductDescription = this.offre.ProductDescription.toLowerCase();
    this.offre.ProductName = this.offre.ProductName.toLowerCase();

    this.ProductProvid.EditProduct(this.offre).subscribe(
      res => {
        if (res.status == "ok") {
          this.showAlert("SUCCESS", res.message);
          this.navCtrl.pop();
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
