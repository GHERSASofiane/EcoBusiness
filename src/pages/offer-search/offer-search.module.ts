import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OfferSearchPage } from './offer-search';

@NgModule({
  declarations: [
    OfferSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(OfferSearchPage),
  ],
})
export class OfferSearchPageModule {}
