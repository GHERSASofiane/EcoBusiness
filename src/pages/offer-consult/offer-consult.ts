import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular'; 
import { User } from '../Class/User';
import { OffreDetails } from '../Class/OffreDetails';
import { Reservation } from '../Class/Reservation';
import { ProductProvider } from '../../providers/product/product';
import { HomePage } from '../home/home';
 
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-offer-consult',
  templateUrl: 'offer-consult.html',
})
export class OfferConsultPage {

  // Variables
  public userMe: User;
  private id;
  public infos: OffreDetails;
  // **** For chat 
  public Reservation: Reservation = new Reservation();

  constructor(public navCtrl: NavController, public navParams: NavParams,private storage: Storage,
    private ProductProvid: ProductProvider, public alertCtrl: AlertController) {

    this.id = navParams.get('id');
    // Or to get a key/value pair
    this.storage.get('UserMe').then((val) => { 
      if(val != null){
        this.userMe = val; 
        this.GetDetails();
    
        this.Reservation.ReservationMessage = '';
        this.Reservation.ReservationDate = '';
      }else{
        this.navCtrl.setRoot(HomePage)
      }
      
    }).catch(
     err => this.navCtrl.setRoot(HomePage)
    );
    

  }

  // reuperer les details d'une annance
  private GetDetails(): void {
    this.ProductProvid.GetProductDetails(this.id).subscribe(
      res => {
        if (res.status == "ok") {
          this.infos = res.reponse;
        } else {
          this.showAlert("ERROR", res.message);
        }
      },
      err => this.showAlert("ERROR", "Error on the server :( :( ")
    )
  }
 
  // Envoie d'une demande de reservation
  public SendReservation(){

    this.Reservation.ReservationSend = this.userMe.userId;
    this.Reservation.ReservationReceive = this.infos.UserId;
    this.Reservation.ReservationProduct = this.infos.ProductId;

    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      message: ' Le '+this.Reservation.ReservationDate+' Est Met Est-tu vous sûr de continuer cette operation ?',
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
            this.ProductProvid.SendReservation(this.Reservation).subscribe(
              res => {
                if (res.status == "ok") {
                  this.showAlert("SUCCESS", res.message);  
                  this.navCtrl.pop();
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
