import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { OfferSearchPage } from '../pages/offer-search/offer-search';
import { OfferConsultPage } from '../pages/offer-consult/offer-consult';
import { ProductProvider } from '../providers/product/product';
import { EditOfferPage } from '../pages/edit-offer/edit-offer';
import { ReservationRequestsPage } from '../pages/reservation-requests/reservation-requests';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginPage } from '../pages/login/login';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { UserHomePage } from '../pages/user-home/user-home';
import { UserProvider } from '../providers/user/user';
import { TokenInterceptorProvider } from '../providers/token-interceptor/token-interceptor';
import { ProductComparingPage } from '../pages/product-comparing/product-comparing';
import { MyPubsPage } from '../pages/my-pubs/my-pubs';
import { DrivingPage } from '../pages/driving/driving';

@NgModule({
  declarations: [

    MyApp,
    HomePage,
    OfferSearchPage,
    OfferConsultPage,
    EditOfferPage,
    ReservationRequestsPage,
    LoginPage,
    SignUpPage,
    EditProfilePage,
    UserHomePage,
    ProductComparingPage,
    MyPubsPage
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    OfferSearchPage,
    OfferConsultPage,
    EditOfferPage,
    ReservationRequestsPage,
    LoginPage,
    SignUpPage,
    EditProfilePage,
    UserHomePage,
    ProductComparingPage,
    MyPubsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProductProvider,
    UserProvider,
    { 
      provide : HTTP_INTERCEPTORS,
      useClass: TokenInterceptorProvider,
      multi: true
    },
  ]
})
export class AppModule {}
