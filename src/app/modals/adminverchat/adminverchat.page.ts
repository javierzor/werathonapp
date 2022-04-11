import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-adminverchat',
  templateUrl: './adminverchat.page.html',
  styleUrls: ['./adminverchat.page.scss'],
})
export class AdminverchatPage implements OnInit {
  dataparaelmodal;
  constructor(
    navParams: NavParams,
    public modalController: ModalController,
  ) 
  
  {
    this.traidopormodalparamsFuction();
   }

  ngOnInit() {
    this.traidopormodalparamsFuction();
  }

  traidopormodalparamsFuction(){
    // this.traidopormodalparams=navParams.get('dataparaelmodal');
    console.log('recibido por modalparams', this.dataparaelmodal);
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': false
    });
  }


}
