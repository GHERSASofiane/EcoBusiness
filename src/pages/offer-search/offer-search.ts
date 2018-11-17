import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../Class/User';
import { Offer } from '../Class/Offer'; 
import { OfferConsultPage } from '../offer-consult/offer-consult';
import { ProductProvider } from '../../providers/product/product'; 

import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-offer-search',
  templateUrl: 'offer-search.html',
})
export class OfferSearchPage {


  // Variables
  public userMe: User;
  public CallSearch: string = '';
  public Calls: Offer[];
  public OffLenght = 0;
  public page: number = 0;

  // Constructeur
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private ProductProvid: ProductProvider, public alertCtrl: AlertController,
    private storage: Storage, private _userProvider : UserProvider  ) {

    // Or to get a key/value pair
    this.storage.get('UserMe').then((val) => { 
      this.userMe = val;
      console.log(this.userMe);
    }).catch(
     err => this.navCtrl.setRoot(HomePage)
    );
   
    this.getoffresBypage('', this.page);
  }

  // entrer ssi y a le token
  ionViewWillEnter()
  {
    if(this._userProvider.loggedIn)
      {
        return true;
      }
    else
    {
      this.navCtrl.setRoot(HomePage);
      return false;
    }
  }


  // aller sur la page des detais 
  public goToPageOfferConsult(id: number): void {
    this.navCtrl.push(OfferConsultPage, { id: id, user: this.userMe });
  }

  // aller vers une page demander par l'utilisateur 
  public openPage(page: string): void {
    this.navCtrl.push(page, { user: this.userMe });
  }

  // récuperer les annances postulé
  public getOffres(ev: any): void {
    this.page = 0;
    this.CallSearch = ev.target.value;
    
    this.getoffresBypage(this.CallSearch, this.page);

  }

  // récuperer les annances postuler en specifiant la page chaque page contien 10 annances
  public getoffresBypage(cle: string, page: number): void {

    this.ProductProvid.GetProducts(cle, page).subscribe(
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

  // aller sur la page precedent
  public PreviousPage(): void {
    if (this.page !== 0) {
      this.page = this.page - 1;
      this.getoffresBypage(this.CallSearch, this.page);
    }

  }

  // aller sur la page suivante
  public NextPage(): void {
    if (this.OffLenght !== 0) {
      this.page = this.page + 1;
      this.getoffresBypage(this.CallSearch, this.page);
    }

  }

  // deconnexion
  public SignOut(): void {

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
            this.storage.remove('UserMe'); 
            localStorage.removeItem('token'); 
            this.navCtrl.setRoot(HomePage);
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
