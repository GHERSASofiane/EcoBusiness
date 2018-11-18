import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular'; 
import { User } from '../Class/User';
import { Offer } from '../Class/Offer';
import { ProductProvider } from '../../providers/product/product';
import { HomePage } from '../home/home';


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

  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage,
    public alertCtrl: AlertController, private ProductProvid: ProductProvider) {

    this.offre = this.navParams.get('offre');
    
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

    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Est-tu vous sûr de continuer cette operation ?',
      buttons: [
        {
          text: 'Non',
          role: 'cancel',
          handler: () => {
            
          }
        },
        {
          text: 'Oui',
          handler: () => {
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
        }
      ]
    });
    alert.present();


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
