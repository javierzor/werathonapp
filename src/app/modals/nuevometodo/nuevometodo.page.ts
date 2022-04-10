import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { VariosService } from 'src/app/service/varios.service';

@Component({
  selector: 'app-nuevometodo',
  templateUrl: './nuevometodo.page.html',
  styleUrls: ['./nuevometodo.page.scss'],
})
export class NuevometodoPage implements OnInit {
  nombre_direccion:any;
  direccion:any;
  nombre_y_apellido:any;
  extra1:any;
  extra2:any;

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

  agregaradminmetodo(){
    var datawerathoncrearadminmetodo = {
      nombre_solicitud:'werathoncrearadminmetodo',
      nombre_direccion: this.nombre_direccion,
      direccion: this.direccion,
      nombre_y_apellido: this.nombre_y_apellido,
      extra1: this.extra1,
      extra2: this.extra2

    }
    console.log('data a agregar fase',datawerathoncrearadminmetodo);

    this.variosservicios.variasfunciones(datawerathoncrearadminmetodo).subscribe(async( res: any ) =>{
      console.log('respuesta de werathoncrearadminmetodo', res);
      if(res.id>0){
       this.variosservicios.presentToast("Nuevo metodo Agregado");
       this.dismissyactualiza();
     }
      else {
       this.variosservicios.presentToast("..::Error, debe reingresar seccion, (recomprobacion admin)::..");

     }
     });

  }
}
