import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { User } from '../Class/User';
import { Offer } from '../Class/Offer';
import { ProductProvider } from '../../providers/product/product';
import { Reservation } from '../Class/Reservation';
import { HomePage } from '../home/home';

import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login'; 


@IonicPage()
@Component({
  selector: 'page-reservation-requests',
  templateUrl: 'reservation-requests.html',
})
export class ReservationRequestsPage {

  // Variables
  public userMe: User;
  private Call: Offer = new Offer();
  public reservs: Reservation[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,
             private ProductProvid: ProductProvider, private alertCtrl: AlertController ) {
               
    
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
    
    this.Call = this.navParams.get('offre');
    this.GetReservationReq();
  }
 
  // recuperer les demandes de reservations
  private GetReservationReq(){
    this.ProductProvid.GetReservationReq(this.Call.ProductId).subscribe(
      res => {
        if (res.status == "ok") { 
          this.reservs = res.reponse;
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
    ); 
  }

  // Valider une demande parmet tout les demandes recu pour ce produit 
  public ReservationValidate(reserv: Reservation) {


    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Est-tu vous sûr de confermer pour le '+reserv.ReservationDate+' ?',
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
            this.ProductProvid.ReservationValidate(reserv).subscribe(
              res => {
                if (res.status == "ok") {
                  this.showAlert("SUCCESS", res.message);
                  this.SendSMS(reserv);
                  this.navCtrl.pop();
                } else {
                  this.showAlert("ERROR", res.message);
                }
              },
              err => this.showAlert("ERROR", "Error on the server :( :( ")
            );
          }
        }
      ]
    });
    alert.present();



  }

  // fonction pour envoyer des messages a les demandeur de reservation 
  private SendSMS(reservAccepte: Reservation){
    // for (let index = 0; index < this.reservs.length; index++) {  
    //   if(this.reservs[index] === reservAccepte){
    //     this.sms.send(''+this.reservs[index].UserPhone, 'Votre demande est acceptée :');
    //   }else{
    //     this.sms.send(''+this.reservs[index].UserPhone, 'Votre demande n\'est pas acceptée.');
    //   }
      
    // }
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
