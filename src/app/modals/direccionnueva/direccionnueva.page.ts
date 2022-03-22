import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VariosService } from 'src/app/service/varios.service';

@Component({
  selector: 'app-direccionnueva',
  templateUrl: './direccionnueva.page.html',
  styleUrls: ['./direccionnueva.page.scss'],
})
export class DireccionnuevaPage implements OnInit {

  constructor(
    private varios: VariosService,
    private modalController: ModalController,

  ) { }

  ngOnInit() {
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': false
    });
  }
  
  dismissystep2() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
    this.varios.loading2segundos('Agregando, Porfavor espere...');
  }


}
