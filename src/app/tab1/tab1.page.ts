import { Component } from '@angular/core';
import { CHOME } from '../Modeles/CHome';
import { tt } from '../Modeles/test';  
import { ActionSheet, ActionSheetOptions } from '@ionic-native/action-sheet/ngx';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  public myhome:CHOME[];

  sliderOpts = {
    loop: true,
    slideToClickedSlide: true,
    speed: 1000,
    zoom: false,
    slidesPerView: 1.5,
    centeredSlides: true,
    spaceBetween: 10,
    grabCursor: true,
    autoplay: {
      delay: 1500,
    },
  };
  
  constructor(private actionSheet: ActionSheet) {}

// Gestion des Likes
  public Like(item){
    let likebef = item.like;
    item.like= !item.like;
    if(likebef==false){
      item.nombrelike ++;
    }else{
      item.nombrelike --;
    }
  }

  buttonLabels = ['Share via Facebook', 'Share via Twitter'];

// Partager un article
  public Share(item){
  
    const options: ActionSheetOptions = {
      title: 'What do you want with this image?',
      subtitle: 'Choose an action',
      buttonLabels: this.buttonLabels,
      addCancelButtonWithLabel: 'Cancel',
      addDestructiveButtonWithLabel: 'Delete',
      androidTheme: 1,
      destructiveButtonLast: true
    }
    
    this.actionSheet.show(options).then((buttonIndex: number) => {
      console.log('Button pressed: ' + buttonIndex);
    });
    
    

    // this.na.share({
    //   'title': 'Optional title',
    //   'text': 'Optional message',
    //   'url': 'http://www.myurl.com'
    // }).then(function() {
    //   console.log('nav  Successful share');
    // }).catch(function(error) {
    //   console.log('nav   Error sharing:', error)
    // });

    // navigator.share({
    //   'title': 'Optional title',
    //   'text': 'Optional message',
    //   'url': 'http://www.myurl.com'
    // }).then(function() {
    //   console.log('Successful share');
    // }).catch(function(error) {
    //   console.log('Error sharing:', error)
    // });
    
  }

  ngOnInit(){
      
    this.myhome = tt;
    // this.mystorage =
    
}

}
