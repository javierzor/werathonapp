import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { VariosService } from 'src/app/service/varios.service';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-adminverchat',
  templateUrl: './adminverchat.page.html',
  styleUrls: ['./adminverchat.page.scss'],
})
export class AdminverchatPage implements OnInit {
  
  @ViewChild(IonContent, { static: false }) content: IonContent;


  dataparaelmodal;
  informacion_perfil: any;
  respuestamismensajesdechatabierto: any;
  hizo_scroll_pararriba: boolean;
  mensaje: any;
  respuestaguardarmensajedeusuario: any;
  mostrarr = false;

  constructor(
    public varios: VariosService,
    navParams: NavParams,
    public modalController: ModalController,
  ) 
  
  {
    this.traidopormodalparamsFuction();
    this.ScrollToBottom();
   }

  ngOnInit() {
    this.traidopormodalparamsFuction();
  }

  ionViewWillEnter(){
    this.varios.activar_real_time_admin_listas_de_chat=false;
    this.varios.activar_real_time_admin_ver_chat=true;
    console.log('activando',this.varios.activar_real_time_admin_ver_chat );
    this.realtimeAdminChat();
    this.Traermismensajesdechatabierto();
    // this.enviomensaje();
    this.ScrollToBottom();
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

  realtimeAdminChat(){
    if(this.varios.activar_real_time_admin_ver_chat==true){
      console.log('se cumplio la condicion en ChatRealTime() De Soporte');
      setTimeout(()=>{ 
          this.Traermismensajesdechatabierto();
          this.realtimeAdminChat(); //repite
        },18000);
    }
  }


  ScrollToBottom() {
    if(!this.hizo_scroll_pararriba&&this.varios.activar_real_time_admin_ver_chat==true){
      setTimeout(()=>{ 
        this.content.scrollToBottom(300);
        console.log('se hizo scroll para abajo');
        this.ScrollToBottom(); //repite
      },600);
    }
  }

  async Traermismensajesdechatabierto(){
    var datamismensajesdechatabierto = {
      nombre_solicitud: 'mismensajesdechatabierto',
      id_user:this.dataparaelmodal.id_user
      }
      this.varios.variasfunciones(datamismensajesdechatabierto).subscribe(async( res: any ) =>{
      console.log('respuesta de mismensajesdechatabierto', res);
      this.respuestamismensajesdechatabierto=res;
      // this.enviomensaje();
      });
  }

  hizoscroll(){
    this.hizo_scroll_pararriba=true;
  }

  enviomensaje(){
    setTimeout(()=>{ 
    this.content.scrollToBottom(1000);
     },400);
  }


  marcarresuelto(){
    var dataguardarmensajedeusuario = {
      nombre_solicitud: 'guardarmensajedeusuario',
      id_user:this.dataparaelmodal.userdetalles.id,
      es_admin_mensaje: '1',
      mensaje:'✔Gracias Por Escribir ✎ su mensaje, Tal vez reciba una pequeña encuesta, Donde podra calificar esta conversación del 1 al 10 ✉'
    }
    this.varios.variasfunciones(dataguardarmensajedeusuario).subscribe(async( res: any ) =>{
      console.log('respuesta de guardarmensajedeusuario', res);
      this.respuestaguardarmensajedeusuario=res;
      if(res){
        this.Traermismensajesdechatabierto();
        this.enviomensaje();
      }
    });

  }


  EnviarMensajeDeChat(){
    var dataguardarmensajedeusuario = {
      nombre_solicitud: 'guardarmensajedeusuario',
      id_user:this.dataparaelmodal.userdetalles.id,
      es_admin_mensaje: '1',
      mensaje:this.mensaje
    }
    this.varios.variasfunciones(dataguardarmensajedeusuario).subscribe(async( res: any ) =>{
      console.log('respuesta de guardarmensajedeusuario', res);
      this.respuestaguardarmensajedeusuario=res;
      if(res){
        this.Traermismensajesdechatabierto();
        this.ScrollToBottom();
        this.enviomensaje();
        // this.AgregarChatAbierto();
        this.mensaje='';
      }
    });

  }



}
