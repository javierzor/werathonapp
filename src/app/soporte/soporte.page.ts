import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, MenuController, ModalController } from '@ionic/angular';
import * as CryptoJS from 'crypto-js';
import { VariosService } from '../service/varios.service';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-soporte',
  templateUrl: './soporte.page.html',
  styleUrls: ['./soporte.page.scss'],
})
export class SoportePage implements OnInit {

  @ViewChild(IonContent, { static: false }) content: IonContent;

  // @ViewChild(IonContent) content: IonContent

  secretKey = "123456&Descryption";
  informacion_perfil: any;
  respuestaverocrearlistadechatsoporte: any;
  respuestamismensajesdechatabierto: any;
  nota_paraabrir_elchat: string;
  respuestaguardarmensajedeusuario: any;
  mensaje: any;
  mostrar = false;
  mostrarr = false;
  hizo_scroll_pararriba: boolean = false;

  constructor(
    private variosservicios: VariosService,
    private modalController: ModalController,
    public varios: VariosService,
    private router: Router,
    private menu: MenuController,
    private loadingController: LoadingController,
  ) 
  
  { 
    this.ObtenerInformacionDePerfil();
    this.VerSiTieneEnListaDeChatsAlgunChat();

  }

    ngOnInit() {
    this.ObtenerInformacionDePerfil();
    this.VerSiTieneEnListaDeChatsAlgunChat();
    this.varios.activar_real_time_soporte=true;
    this.ChatRealTime();
  }

  ionViewWillEnter(){

    this.ObtenerInformacionDePerfil();
    this.VerSiTieneEnListaDeChatsAlgunChat();

  }

  ionViewDidEnter(){
    this.ScrollToBottom();

  }


  decrypt(textToDecrypt : string){
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }

  ObtenerInformacionDePerfil(){
    this.informacion_perfil=localStorage.getItem('profileInfo');
    this.informacion_perfil=this.decrypt(this.informacion_perfil);
    this.informacion_perfil=JSON.parse(this.informacion_perfil);
    console.log('informacion de perfil en Perfil', this.informacion_perfil);
  }

  async Traermismensajesdechatabierto(){
    var datamismensajesdechatabierto = {
      nombre_solicitud: 'mismensajesdechatabierto',
      id_user:this.informacion_perfil.id
      }
      this.variosservicios.variasfunciones(datamismensajesdechatabierto).subscribe(async( res: any ) =>{
      console.log('respuesta de mismensajesdechatabierto', res);
      this.respuestamismensajesdechatabierto=res;
      });
  }

  VerSiTieneEnListaDeChatsAlgunChat(){
    var dataverocrearlistadechatsoporte = {
      nombre_solicitud: 'verocrearlistadechatsoporte',
      id_user:this.informacion_perfil.id
    }
    this.variosservicios.variasfunciones(dataverocrearlistadechatsoporte).subscribe(async( res: any ) =>{
      console.log('respuesta de verocrearlistadechatsoporte', res);
      this.respuestaverocrearlistadechatsoporte=res;
      if(res='tieneunchatabierto'){
        this.Traermismensajesdechatabierto();
      }
      if(res='notienechatsabiertos'){
          this.nota_paraabrir_elchat='Bienvenido, si desea comunicarse con el equipo de soporte, puede dejar su mensaje aqui';
      }

    });

    
  }
  
  hizoscroll(){
    this.hizo_scroll_pararriba=true;
  }

  ScrollToBottom() {
    if(!this.hizo_scroll_pararriba&&this.varios.activar_real_time_soporte==true){
      setTimeout(()=>{ 
        this.content.scrollToBottom(300);
        console.log('se hizo scroll para abajo');
        this.ScrollToBottom(); //repite
      },600);
    }
  }

  enviomensaje(){
    setTimeout(()=>{ 
    this.content.scrollToBottom(1000);
     },1300);
  }

  ChatRealTime(){
    if(this.varios.activar_real_time_soporte==true){
      console.log('se cumplio la condicion en ChatRealTime() De Soporte');
      setTimeout(()=>{ 
          this.Traermismensajesdechatabierto();
        },18000);
        this.ChatRealTime(); //repite
    }
  }


  marcarresuelto(){
    var dataguardarmensajedeusuario = {
      nombre_solicitud: 'guardarmensajedeusuario',
      id_user:this.informacion_perfil.id,
      es_admin_mensaje: '1',
      mensaje:'✔Gracias Por Escribir ✎ su mensaje, Tal vez reciba una pequeña encuesta, Donde podra calificar esta conversación del 1 al 10 ✉'
    }
    this.variosservicios.variasfunciones(dataguardarmensajedeusuario).subscribe(async( res: any ) =>{
      console.log('respuesta de guardarmensajedeusuario', res);
      this.respuestaguardarmensajedeusuario=res;
      if(res){
        this.Traermismensajesdechatabierto();
        this.ScrollToBottom();
        this.enviomensaje()
      }
    });

  }


  EnviarMensajeDeChat(){
    var dataguardarmensajedeusuario = {
      nombre_solicitud: 'guardarmensajedeusuario',
      id_user:this.informacion_perfil.id,
      es_admin_mensaje: '0',
      mensaje:this.mensaje
    }
    this.variosservicios.variasfunciones(dataguardarmensajedeusuario).subscribe(async( res: any ) =>{
      console.log('respuesta de guardarmensajedeusuario', res);
      this.respuestaguardarmensajedeusuario=res;
      if(res){
        this.Traermismensajesdechatabierto();
        this.ScrollToBottom();
        this.enviomensaje()
      }
    });

  }


  ionViewWillLeave(){
    this.varios.activar_real_time_soporte=false;
  }



} //cierre de CLASE
