import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';


 

@IonicPage()
@Component({
  selector: 'page-product-comparing',
  templateUrl: 'product-comparing.html',
})
export class ProductComparingPage {

  public products : any;

  constructor(public navCtrl: NavController, private _prod : ProductProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductComparingPage');
  }

  ionViewWillEnter()
  {
    this.products = this._prod.prices;
  }

}
