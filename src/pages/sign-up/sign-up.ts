import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';  
import { HttpClient } from '@angular/common/http';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { User } from '../Class/User';
import { UserProvider } from '../../providers/user/user';
import { OfferSearchPage } from '../offer-search/offer-search';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  private user = new User("","");
  private selectedFile : File = null;
  private userMe: User;
  myForm: FormGroup;

  constructor(private UserProvid: UserProvider, public http: HttpClient, public navCtrl: NavController,
    public alertCtrl: AlertController, private storage: Storage) {
    this.user = new User("","");
    this.myForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      userMail: new FormControl('', [Validators.required, Validators.pattern(".+\@.+\..")]),
      userPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }
 
// convertire les images en byte
  public onFileSelected(event)
  {
    
    this.selectedFile = <File> event.target.files[0];
    var reader = new FileReader();
    reader.onload =this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(this.selectedFile);
  }

  public _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
           this.user.userPicture = btoa(binaryString);
   }

  // fonction qui s'occupe d'inscription
  public logUp(){
  
    this.UserProvid.register(this.user).subscribe
      (
        res =>  {
          if (res.status == "ok") {
            this.showAlert("SUCCESS", "your account is well created");
            this.userMe = res.reponse;
              // set a key/value
            this.storage.set('UserMe', this.userMe); 
            this.navCtrl.push(OfferSearchPage);
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




