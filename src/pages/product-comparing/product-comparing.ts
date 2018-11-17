import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';




/**
 * Generated class for the ProductComparingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
