import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyPubsPage } from './my-pubs';

@NgModule({
  declarations: [
    MyPubsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyPubsPage),
  ],
})
export class MyPubsPageModule {}
