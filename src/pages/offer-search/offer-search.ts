import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../Class/User';
import { Offer } from '../Class/Offer'; 
import { OfferConsultPage } from '../offer-consult/offer-consult';
import { ProductProvider } from '../../providers/product/product'; 

import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';

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
    private storage: Storage  ) {
      
    // Or to get a key/value pair
    storage.get('UserMe').then((val) => {
      console.log('Your UserMe is', val);
      this.userMe = val;
    }).catch(
     err => this.navCtrl.push(HomePage)
    );
   
    this.getoffresBypage('', this.page);
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
