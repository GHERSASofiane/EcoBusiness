import { Component } from '@angular/core';
import { IonicPage, NavController} from 'ionic-angular';   
import { HomePage } from '../home/home'; 
import { UserProvider } from '../../providers/user/user';
import { User } from '../Class/User';
import { Offer } from '../Class/Offer';
import { Reponse } from '../Class/reponse';

 

@IonicPage()
@Component({
  selector: 'page-user-home',
  templateUrl: 'user-home.html',
})
export class UserHomePage {

  user : User = new User("","");
  products: Offer[];
  pages = [];

  constructor(public navCtrl: NavController, private UserProvid: UserProvider) {   
  }

  
  

  ionViewCanEnter()
  {
     
    // if (this.UserProvid.loggedIn())
    // {
    // /** 
    // const helper = new JwtHelperService();
    // let token = localStorage.getItem('token');                                    
    // this.user = helper.decodeToken(token);
    // */
    // this.user = this.UserProvid.getUser(); 
    // this.offres();
    //   return true;
    // }
    // else
    // {
     
    // this.navCtrl.push(HomePage);
    // return false;
    // }
    
  }

  ionViewDidLeave()
  {
    localStorage.removeItem('token');
  }

  ionViewWillLeave()
  {
    localStorage.removeItem('token');
  }

  

  achats()
  {
    alert("achats");
  }

  acheter()
  {
    alert("acheter");
  }

  offres()
  {
   
   
    // this.UserProvid.getMyProducts().subscribe
    //   (
    //     res => 
    //     {
    //       let rep = new Reponse("",""); 
    //       rep = res;
    //       console.log(res);
    //       this.products = rep.reponse;
    //       console.log(JSON.stringify(this.products));
         
    //     },
    //     err => console.log(err)
    //   );
     
  }
 


}
