import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReservationRequestsPage } from './reservation-requests';

@NgModule({
  declarations: [
    ReservationRequestsPage,
  ],
  imports: [
    IonicPageModule.forChild(ReservationRequestsPage),
  ],
})
export class ReservationRequestsPageModule {}
