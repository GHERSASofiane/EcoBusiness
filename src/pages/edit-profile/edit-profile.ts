import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { User } from '../Class/User';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';
import { validatePassword } from '../../shared/confirm-equal-validator';
import { OfferSearchPage } from '../offer-search/offer-search';


/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  private user = new User("","");
  private selectedFile : File = null;
  myForm: FormGroup;

  
  constructor(public navCtrl: NavController, private _auth: UserProvider) {
  
    this.myForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      userMail: new FormControl('', [Validators.required, Validators.pattern(".+\@.+\..")]),
      userPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirmation : new FormControl('', [Validators.required, validatePassword]),
      userAdress: new FormControl('', [Validators.required, Validators.minLength(6)]),
      userPhone: new FormControl('', [Validators.required, Validators.minLength(8)]),
      userPicture: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  ionViewWillEnter() {
   // console.log('ionViewDidLoad InscriptionPage');
    this.user = this._auth.getUser();
    console.log(this.user);
    
  }
  

  onFileSelected(event)
  {
    
    this.selectedFile = <File> event.target.files[0];
    var reader = new FileReader();
    reader.onload =this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(this.selectedFile);
  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
           this.user.userPicture = btoa(binaryString);
   }

   updateProfile(){
  
    
    this._auth.updateProfile(this.user).subscribe
      (
        res => 
        {
          if(res.status === "ok")
          {
          console.log(res);
          localStorage.setItem('token', res.token);
          this._auth.setUser(res.reponse)
          this.navCtrl.push(OfferSearchPage);
          }
          else
            alert(res.message);
        },
        err => console.log(err)
      );


}

}
