import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VariosService } from 'src/app/service/varios.service';

@Component({
  selector: 'app-nuevafase',
  templateUrl: './nuevafase.page.html',
  styleUrls: ['./nuevafase.page.scss'],
})
export class NuevafasePage implements OnInit {
  limitefaseusd:any;
  precio_wera_usd:any;
  porcentaje:any;
  asignaciondetokens:any;
  constructor(
    public varios: VariosService,
    private modalController: ModalController,
    private variosservicios: VariosService,

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
  
  dismissyactualiza() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
    this.varios.loading2segundos('Agregando, Porfavor espere...');
  }

  agregarfase(){
    var dataagregarfasealatabladefases = {
      nombre_solicitud:'agregarfasealatabladefases',
      limitefaseusd: this.limitefaseusd,
      precio_wera_usd: this.precio_wera_usd,
      porcentaje: this.porcentaje,
      asignaciondetokens: this.asignaciondetokens
    }
    console.log('data a agregar fase',dataagregarfasealatabladefases);

    this.variosservicios.variasfunciones(dataagregarfasealatabladefases).subscribe(async( res: any ) =>{
      console.log('respuesta de agregarfasealatabladefases', res);
      if(res.id>0){
       this.variosservicios.presentToast("Nueva Fase Agregada");
       this.dismissyactualiza();
     }
      else {
       this.variosservicios.presentToast("..::Error, debe reingresar seccion, (recomprobacion admin)::..");

     }
     });

  }

}
