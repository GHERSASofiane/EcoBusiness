import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular'; 
import { UserHomePage } from '../user-home/user-home'; 
import { HttpClient } from '@angular/common/http';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { User } from '../Class/User';
import { UserProvider } from '../../providers/user/user';
 

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  private user = new User("","");
  private selectedFile : File = null;
  myForm: FormGroup;

  constructor(private UserProvid: UserProvider, public http: HttpClient, public navCtrl: NavController) {
    this.user = new User("","");
    this.myForm = new FormGroup({
      userName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      userMail: new FormControl('', [Validators.required, Validators.pattern(".+\@.+\..")]),
      userPassword: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InscriptionPage');
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

  logUp(){
  
    this.UserProvid.register(this.user).subscribe
      (
        res => 
        {
          console.log(res);
          localStorage.setItem('token', res.token);
          this.navCtrl.push(UserHomePage);
        },
        err => console.log(err)
      );

  /**  
  this.http.post(this.url, JSON.stringify(this.user))
  .subscribe(
              res =>
               {
                   this.reponse = res.json();
                       if(this.reponse.status == "ok")
                       {
                         this.user = this.reponse.reponse;
                         this.navCtrl.push(UserHomePage, {user : this.user});
                       }
                       else
                       alert(this.reponse.message);
               },
               error => {console.log(error)}
              );
*/
}

}




