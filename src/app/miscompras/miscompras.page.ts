import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {Router} from '@angular/router';
import { MenuController } from '@ionic/angular';
import { VariosService } from '../service/varios.service';
import { ImageService } from '../service/image.service';
import { Image } from './../models/image.model';
import { PaisesService } from '../service/paises.service';
import { AlertController } from '@ionic/angular';
import { IonRouterOutlet } from '@ionic/angular';
import { DireccionnuevaPage } from '../modals/direccionnueva/direccionnueva.page';
import { ModalController } from '@ionic/angular';
import { NuevacompraPage } from '../modals/nuevacompra/nuevacompra.page';
import { VisualizadorimagenesPage } from '../modals/visualizadorimagenes/visualizadorimagenes.page';

@Component({
  selector: 'app-miscompras',
  templateUrl: './miscompras.page.html',
  styleUrls: ['./miscompras.page.scss'],
})
export class MiscomprasPage {

  secretKey = "123456&Descryption";
  verificarloginemail: any;
  menuderechosuperior:boolean=false;
  countryData: { id: number; name: string; }[];
  informacion_perfil: any;
  step:any;
  languages_active: any;
  movimientos: any;
  movimientospendientes: any;

  constructor(
    private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private variosservicios: VariosService,
    private router: Router,
    private menu: MenuController,
    private imageService: ImageService,
    private paises: PaisesService,
    public alertController: AlertController

  ) 
  {

    this.countryData=this.paises.countryData;    
    this.funcionverificarlogin();
    this.ObtenerProfileInfo();
    this.step='1';
    this.obtenermovimientos();
  }
  ionViewWillEnter(){
    this.menu.enable(true);
    this.funcionverificarlogin();
    this.ObtenerProfileInfo();
    this.step='1';
    this.obtenermovimientos();
  }
  async ngOnInit() {
    this.funcionverificarlogin();
    this.ObtenerProfileInfo();
    this.step='1';
    this.obtenermovimientos();
  }

  obtenermovimientos(){
    this.informacion_perfil=localStorage.getItem('profileInfo');
    this.informacion_perfil=this.decrypt(this.informacion_perfil);
    this.informacion_perfil=JSON.parse(this.informacion_perfil);
    var datawerathonobtenermovimientos = {
      nombre_solicitud: 'werathonobtenermovimientos',
      id_user: this.informacion_perfil.id
    }
     this.variosservicios.variasfunciones(datawerathonobtenermovimientos).subscribe(async( res: any ) =>{
       console.log('respuesta de werathonobtenermovimientos', res);
       this.movimientos=res;
     });

     var datawerathoncuantosmovimientospendientes = {
      nombre_solicitud: 'werathoncuantosmovimientospendientes',
      id_user: this.informacion_perfil.id
    }
     this.variosservicios.variasfunciones(datawerathoncuantosmovimientospendientes).subscribe(async( res: any ) =>{
       console.log('respuesta de werathoncuantosmovimientospendientes', res);
       this.movimientospendientes=res;
     });

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

async ObtenerProfileInfo(){
    this.informacion_perfil=localStorage.getItem('profileInfo');
    this.informacion_perfil=this.decrypt(this.informacion_perfil);
    this.informacion_perfil=JSON.parse(this.informacion_perfil);
    console.log('informacion de perfil en Perfil', this.informacion_perfil);
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
  decrypt(textToDecrypt : string){
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['login']);
  }
//Termina menu superior y sus ONCHANGE

async presentModal() {
  const modal = await this.modalController.create({
    component: NuevacompraPage,
    // initialBreakpoint: 1.2,
    // breakpoints: [1, 1.5, 1]
  });
  modal.onDidDismiss().then((data) => {
      console.log('data',data);
      if(data.data.dismissed==true){
        this.obtenermovimientos();
      }
    });


  return await modal.present();
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



}
