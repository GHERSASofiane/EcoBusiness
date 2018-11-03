import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';  
import { UserHomePage } from '../user-home/user-home'; 
import { User } from '../Class/User';
import { UserProvider } from '../../providers/user/user';
 

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  private user = new User("","");
  private selectedFile : File = null;

  
  constructor(private UserProvid: UserProvider, public navCtrl: NavController) {
  
  }

  ionViewWillEnter() {
   // console.log('ionViewDidLoad InscriptionPage');
    this.user = this.UserProvid.getUser();
    
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

   EditProfile(){
  
    
    this.UserProvid.updateProfile(this.user).subscribe
      (
        res => 
        {
          console.log(res);
          localStorage.setItem('token', res.token);
          this.navCtrl.push(UserHomePage);
        },
        err => console.log(err)
      );


}

}
