import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {Router} from '@angular/router';
import { MenuController } from '@ionic/angular';
import { VariosService } from '../service/varios.service';
import { ToastController, LoadingController } from "@ionic/angular";
import { VisualizadorimagenesPage } from '../modals/visualizadorimagenes/visualizadorimagenes.page';
import { ModalController } from '@ionic/angular';
import { NuevafasePage } from '../modals/nuevafase/nuevafase.page';
import { NuevometodoPage } from '../modals/nuevometodo/nuevometodo.page';
import { AdminverchatPage } from '../modals/adminverchat/adminverchat.page';


@Component({
  selector: 'app-paneladmin',
  templateUrl: './paneladmin.page.html',
  styleUrls: ['./paneladmin.page.scss'],
})



export class PaneladminPage implements OnInit {
  segmentModel: any;
  secretKey = "123456&Descryption";
  verificarloginemail: any;
  menuderechosuperior:boolean=false;
  imageProfile: any = null;
  informacion_perfil: any;
  respuestadewerathonadminobtenermovimientos: any;
  respuestadewerathonadminobtenerlistadeuduarios: any;
  respuestadewerathonobtenertablafase: any;
  precio_wera_usd: any;
  respuestadewerathonadminsubirdefase: any;
  progress: any;
  ModalAggFaseAbierto: boolean=false;
  respuestawerathonobteneradmindirecciones: any;
  listasdechat: any;

  constructor(
    private variosservicios: VariosService,
    private modalController: ModalController,
    public varios: VariosService,
    private router: Router,
    private menu: MenuController,
    private loadingController: LoadingController,
  )
   {
    this.obtenerprecio_wera_usdsegunfase();
    // this.progress=0;
    this.obtenerbarrauno();
   }
  ionViewWillEnter(){
    this.menu.enable(true);
    this.ObtenerProfileInfo();
  }
  async ngOnInit() {
    this.segmentModel=null;
    this.funcionverificarlogin();
    this.ObtenerProfileInfo();
    this.obtenerprecio_wera_usdsegunfase();
    this.obtenerbarrauno();
    this.ModalAggFaseAbierto=false;

  }
  funcionverificarlogin(){
    this.verificarloginemail=localStorage.getItem('email');
    this.verificarloginemail= this.decrypt(this.verificarloginemail);
    console.log('this.verificarlogin', this.verificarloginemail);
    if(this.verificarloginemail!=null||this.verificarloginemail!='false')
     {
      console.log('Bienvenido:',this.verificarloginemail);
    }
  }

  obtenerprecio_wera_usdsegunfase(){
    var datawerathonobtenerprecio_wera_usd = {
      nombre_solicitud: 'werathonobtenerprecio_wera_usd'
    }
    this.variosservicios.variasfunciones(datawerathonobtenerprecio_wera_usd).subscribe(async( res: any ) =>{
      console.log('respuesta de werathonobtenerprecio_wera_usd', res);
      this.precio_wera_usd=res;
  });
  }


async ObtenerProfileInfo(){
    this.informacion_perfil=localStorage.getItem('profileInfo');
    this.informacion_perfil=this.decrypt(this.informacion_perfil);
    this.informacion_perfil=JSON.parse(this.informacion_perfil);
    console.log('informacion de perfil en Perfil', this.informacion_perfil);
  }

async obtenerbarrauno(){
  var dataobtenerbarrauno = {
    nombre_solicitud: 'obtenerbarrauno'
  }
  this.variosservicios.variasfunciones(dataobtenerbarrauno).subscribe(async( res: any ) =>{
    console.log('respuesta de obtenerbarrauno', res);
    this.progress=res/100;
});
}

  ONCHANGEmenuderechosuperior(){
    if(this.menuderechosuperior==false)   {this.menuderechosuperior=true;}
    else{this.menuderechosuperior=false;}
  }
  ONCHANGEclickenelcontent(){
    this.menuderechosuperior=false;
  }
  iramiperfilDelMenuDerechoSuperior(){
    this.router.navigate(['perfil']);
    this.menuderechosuperior=false;
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }

  decrypt(textToDecrypt : string){
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }

  //terminan las funciones del menu superior derecho

  async segmentChanged(){

    const actualizando = await this.loadingController.create({
    message: 'Actualizando...',spinner: 'bubbles',duration: 15000,
    });
    
    if(this.segmentModel!='chatdesoporte'){
          actualizando.present();
    }
    
if(this.segmentModel=='solicitudesdecompras'){
  var datawerathonadminobtenermovimientos = {
    nombre_solicitud: 'werathonadminobtenermovimientos',
    id_user: this.informacion_perfil.id
  }
   this.variosservicios.variasfunciones(datawerathonadminobtenermovimientos).subscribe(async( res: any ) =>{
     console.log('respuesta de werathonadminobtenermovimientos', res);
     this.respuestadewerathonadminobtenermovimientos=res;
     actualizando.dismiss();
   });
}


if(this.segmentModel=='activardesacusuario'){
  var datawerathonadminobtenerlistadeuduarios = {
    nombre_solicitud: 'werathonadminobtenerlistadeuduarios'
  }
   this.variosservicios.variasfunciones(datawerathonadminobtenerlistadeuduarios).subscribe(async( res: any ) =>{
     console.log('respuesta de werathonadminobtenerlistadeuduarios', res);
     this.respuestadewerathonadminobtenerlistadeuduarios=res;
     actualizando.dismiss();
   });
}

if(this.segmentModel=='veraumentarfase'){
  var datawerathonobtenertablafase = {
    nombre_solicitud: 'werathonobtenertablafase'
  }
   this.variosservicios.variasfunciones(datawerathonobtenertablafase).subscribe(async( res: any ) =>{
     console.log('respuesta de werathonobtenertablafase', res);
     this.respuestadewerathonobtenertablafase=res;
     actualizando.dismiss();
   });
}

if(this.segmentModel=='opciondisponible'){
  actualizando.dismiss();
}

if(this.segmentModel=='cambiarmetodos'){
  var datawerathonobteneradmindirecciones = {
    nombre_solicitud: 'werathonobteneradmindirecciones'
  }
   this.variosservicios.variasfunciones(datawerathonobteneradmindirecciones).subscribe(async( res: any ) =>{
     console.log('respuesta de werathonobteneradmindirecciones', res);
     this.respuestawerathonobteneradmindirecciones=res;
     actualizando.dismiss();
   });
  
}

if(this.segmentModel=='chatdesoporte'){
  actualizando.dismiss();
  this.varios.activar_real_time_admin_listas_de_chat=true;
  if(this.varios.activar_real_time_admin_listas_de_chat==true&&this.varios.activar_real_time_admin_ver_chat==false){
    
    this.FuncionObtenerlistasdechat();
        setTimeout(()=>{ 
          // this.segmentModel='chatdesoporte';
          this.segmentChanged();
          },10000);
      }
}

}

FuncionObtenerlistasdechat(){
  var dataadminverlistasdechat = {
    nombre_solicitud: 'adminverlistasdechat'
  }
   this.variosservicios.variasfunciones(dataadminverlistasdechat).subscribe(async( res: any ) =>{
     console.log('respuesta de adminverlistasdechat', res);
     this.listasdechat=res
   });
}


werathonObtenerTablaFaseFuncionReutilizada(){
  var datawerathonobtenertablafase = {
    nombre_solicitud: 'werathonobtenertablafase'
  }
   this.variosservicios.variasfunciones(datawerathonobtenertablafase).subscribe(async( res: any ) =>{
     console.log('respuesta de werathonobtenertablafase', res);
     this.respuestadewerathonobtenertablafase=res;
   });
}

suspender(){
  
}

verificar(){
  
}


async VerImagen(ImgUrl) {
  const modal = await this.modalController.create({
    component: VisualizadorimagenesPage,
    componentProps: {
      'dataparaelmodal': ImgUrl
    },
    initialBreakpoint: 1.2,
    breakpoints: [1, 1.5, 1]
  });
  modal.onDidDismiss().then((data) => {
      console.log('data',data);
    });


  return await modal.present();
}


    subirfase(cadafase){
      var datawerathonadminsubirdefase = {
        nombre_solicitud: 'werathonadminsubirdefase',
        tipo_cuenta:this.varios.tipo_cuenta
        // id:cadafase.id no es necesario enviar el id de la fase actual porque el backend ya la sabe, (seg).
      }
      this.variosservicios.variasfunciones(datawerathonadminsubirdefase).subscribe(async( res: any ) =>{
        console.log('respuesta de werathonobtenertablafase', res);
        this.respuestadewerathonadminsubirdefase=res;
        if(res!=0){
          if(res=1){
            console.log('subida de fase exitosa');
            //el segment estara en Admin Fases y se simulara un Segment Change Para actualizar la lista::..
            this.segmentModel='veraumentarfase';
            this.obtenerprecio_wera_usdsegunfase();
            this.segmentChanged();
          }

        }
        else {
          this.variosservicios.presentToast("..::Error en fases, ERR0001, Reingresar Sección admin inactiva::..");

        }
      });

    }

    verificarmovimiento(movimiento){
      var datawerathonverificarunmovimiento = {
        nombre_solicitud: 'werathonverificarunmovimiento',
        tipo_cuenta:this.varios.tipo_cuenta,
        id_movimiento: movimiento.id
      }
       this.variosservicios.variasfunciones(datawerathonverificarunmovimiento).subscribe(async( res: any ) =>{
         console.log('respuesta de werathonverificarunmovimiento', res);
         if(res>0){
          this.segmentModel='solicitudesdecompras';
          this.segmentChanged();
         }
         else {
          this.variosservicios.presentToast("..::Error, debe reingresar seccion, (recomprobacion admin)::..");

        }
        });
    }


    suspendermovimiento(movimiento){
      var datawerathonsuspenderunmovimiento = {
        nombre_solicitud: 'werathonsuspenderunmovimiento',
        tipo_cuenta:this.varios.tipo_cuenta,
        id_movimiento: movimiento.id
      }
       this.variosservicios.variasfunciones(datawerathonsuspenderunmovimiento).subscribe(async( res: any ) =>{
         console.log('respuesta de werathonsuspenderunmovimiento', res);
         if(res>0){
          this.segmentModel='solicitudesdecompras';
          this.segmentChanged();
         }
         else {
          this.variosservicios.presentToast("..::Error, debe reingresar seccion, (recomprobacion admin)::..");

        }
        });
    }

    suspenderusuario(usuario){
      var datawerathonsuspenderusuario = {
        nombre_solicitud: 'werathonsuspenderusuario',
        tipo_cuenta:this.varios.tipo_cuenta,
        id_usuario: usuario.id
      }
       this.variosservicios.variasfunciones(datawerathonsuspenderusuario).subscribe(async( res: any ) =>{
         console.log('respuesta de werathonsuspenderusuario', res);
         if(res>0){
          this.segmentModel='activardesacusuario';
          this.segmentChanged();
         }
         else {
          this.variosservicios.presentToast("..::Error, debe reingresar seccion, (recomprobacion admin)::..");

        }
        });
    }

    activarusuario(usuario){
      var datawerathonverificarusuario = {
        nombre_solicitud: 'werathonverificarusuario',
        tipo_cuenta:this.varios.tipo_cuenta,
        id_usuario: usuario.id
      }
       this.variosservicios.variasfunciones(datawerathonverificarusuario).subscribe(async( res: any ) =>{
         console.log('respuesta de werathonverificarusuario', res);
         if(res>0){
          this.segmentModel='activardesacusuario';
          this.segmentChanged();
         }
         else {
          this.variosservicios.presentToast("..::Error, debe reingresar seccion, (recomprobacion admin)::..");

        }
        });
    }

    increaseProgress(){
      if(this.progress<0.99){
        this.progress = this.progress + 0.01;
        this.actualizarBarraUno();
        }
    }

    increaseProgressx10(){
      if(this.progress<0.90){
      this.progress = this.progress + 0.10;
      this.actualizarBarraUno();
       }
    }

    reducirProgress(){
      if(this.progress>0.01){
        this.progress = this.progress - 0.01;
        this.actualizarBarraUno();
      }
    }

    reducirProgressx10(){
      if(this.progress>0.10){
        this.progress = this.progress - 0.10;
        this.actualizarBarraUno();
      }
    }
  
    actualizarBarraUno(){
      
      var dataactualizarbarrauno = {
        nombre_solicitud: 'actualizarbarrauno',
        tipo_cuenta:this.varios.tipo_cuenta,
        valor_barra: this.progress*100
      }
       this.variosservicios.variasfunciones(dataactualizarbarrauno).subscribe(async( res: any ) =>{
         console.log('respuesta de actualizarbarrauno', res);
         if(res>0){
          this.variosservicios.presentToast("Proceso de barra actualizado!");
        }
         else {
          this.variosservicios.presentToast("..::Error, debe reingresar seccion, (recomprobacion admin)::..");

        }
        });


    }

    async AdminagregarFase(){

      
      const modal = await this.modalController.create({
        component: NuevafasePage,
        initialBreakpoint: 0.8,
        breakpoints: [0, 0.8, 3]
      });
      this.ModalAggFaseAbierto=true;
      modal.onDidDismiss().then((data) => {
          this.ModalAggFaseAbierto=false;
          console.log('data',data);
          if(data.data.dismissed==true){
            this.segmentModel='veraumentarfase';
            this.segmentChanged();
          }
        });
      return await modal.present();
    }

    async agregarmetodo() {
      const modal = await this.modalController.create({
        component: NuevometodoPage,
        // initialBreakpoint: 1.2,
        // breakpoints: [1, 1.5, 1]
      });
      modal.onDidDismiss().then((data) => {
          console.log('data',data);
          if(data.data.dismissed==true){
            this.segmentModel='cambiarmetodos';
            this.segmentChanged();
          }
        });
    
    
      return await modal.present();
    }

    borrarmetodo(caametodo){
      var datawerathonborraradminmetodo = {
        nombre_solicitud: 'werathonborraradminmetodo',
        id: caametodo.id
      }
       this.variosservicios.variasfunciones(datawerathonborraradminmetodo).subscribe(async( res: any ) =>{
         console.log('respuesta de werathonborraradminmetodo', res);
          this.segmentModel='cambiarmetodos';
          this.segmentChanged();
    });
    }

    async abrirmodaladminchat(cadachat){
      this.varios.activar_real_time_admin_listas_de_chat=false;
      const modal = await this.modalController.create({
        component: AdminverchatPage,
        componentProps: {
          'dataparaelmodal': cadachat
        },
      });
      modal.onDidDismiss().then((data) => {
          console.log('data',data);
          this.varios.activar_real_time_admin_listas_de_chat=true;
          this.varios.activar_real_time_admin_ver_chat=false;
          this.segmentModel='chatdesoporte';
          this.segmentChanged();
        });
      return await modal.present();

}

}