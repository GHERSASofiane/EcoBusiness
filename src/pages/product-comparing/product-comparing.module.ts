import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductComparingPage } from './product-comparing';

@NgModule({
  declarations: [
    ProductComparingPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductComparingPage),
  ],
})
export class ProductComparingPageModule {}
