import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { VariosService } from 'src/app/service/varios.service';
import * as CryptoJS from 'crypto-js';
import { ImageService } from '../../service/image.service';
import { Image } from './../../models/image.model';

@Component({
  selector: 'app-nuevacompra',
  templateUrl: './nuevacompra.page.html',
  styleUrls: ['./nuevacompra.page.scss'],
})
export class NuevacompraPage implements OnInit {

  metodoindex: any;
  direccion: any;
  secretKey = "123456&Descryption";
  informacion_perfil: any;
  admindirecciones: any;
  montoenweras:any;
  montoendolares:any;
  infovariable:any;
  mostrarinformaciondepago: boolean = false;
  imageProfile: any = null;
  new_url_image: any = null;
  montopasadoaweras: any = null;
  precio_wera_usd: any;

  constructor(
    public alertController:AlertController,
    private imageService: ImageService,
    private varios: VariosService,
    private modalController: ModalController,
    private variosservicios: VariosService,

  ) 
  {
    this.obtenerprecio_wera_usdsegunfase(); 
   }

  ngOnInit() {
    this.obtenerAdminDirecciones();
    this.obtenerprecio_wera_usdsegunfase();
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

  dismissyactualiza() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
    this.varios.loading2segundos('Pago realizado!');
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': false
    });
  }


  obtenerAdminDirecciones(){
      var datawerathonobteneradmindirecciones = {
        nombre_solicitud: 'werathonobteneradmindirecciones'
      }
      this.variosservicios.variasfunciones(datawerathonobteneradmindirecciones).subscribe(async( res: any ) =>{
        console.log('respuesta de werathonobteneradmindirecciones', res);
        this.admindirecciones=res;
    });
  }

  ONCHANGEmetodo(event){
    this.infovariable = this.admindirecciones[event.target.value];
    console.log('infovarible', this.infovariable);
    this.mostrarinformaciondepago=false;

  }

  
    async IONFOCUSmontoenweras(){
      this.montoendolares=null;
    }

    async IONFOCUSmontoendolares(){
     this.montoenweras=null;
    }

  
  MostrarInfo(){
    this.mostrarinformaciondepago=true;
  }

  NoMostrarInfo(){
    this.mostrarinformaciondepago=false;
  }



  async takePicture(event: any){
    const input = <File>event.target.files[0];
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageProfile = event.target.result;
      this.sendPhotos(input);
    }
    reader.readAsDataURL(event.target.files[0]); 
  }
  
  sendPhotos(file){
    this.imageService.generateUrl(file).subscribe(x => {
      let imagentemporal = new Image();
      imagentemporal.urlImage = x.data.url;
      this.new_url_image=imagentemporal.urlImage;
      console.log('this.new_url_image',this.new_url_image);
    }); 
  }

  decrypt(textToDecrypt : string){
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }

  async AgradecerConAlerta(){
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Compra',
      subHeader: 'Compra realizada',
      message: 'Muchas gracias por realizar la compra de los Werathon Token Ico, en un plazo de 24hs hábiles se verá reflejado en su oficina virtual el monto correspondiente enviado. Muchas gracias por confiar en el proyecto Werathon!.',
      buttons: ['OK']
    });

    await alert.present();

  }

  agregarcompra(){
    this.informacion_perfil=localStorage.getItem('profileInfo');
    this.informacion_perfil=this.decrypt(this.informacion_perfil);
    this.informacion_perfil=JSON.parse(this.informacion_perfil);


    if(this.montoenweras){
      var dataagregarmovimiento = {
        nombre_solicitud: 'werathoncrearmovimiento',
        id_user: this.informacion_perfil.id,
        mas_o_menos:'mas',
        id_admin_direccion:this.infovariable.id,
        monto:this.montoenweras,
        id_tipo_movimiento: '1',
        reciboImgUrl: this.new_url_image
      }
    }

    if(!this.montoenweras){
      this.montopasadoaweras=this.montoendolares/this.precio_wera_usd;
      var dataagregarmovimiento = {
        nombre_solicitud: 'werathoncrearmovimiento',
        id_user: this.informacion_perfil.id,
        mas_o_menos:'mas',
        id_admin_direccion:this.infovariable.id,
        monto:this.montopasadoaweras,
        id_tipo_movimiento: '1',
        reciboImgUrl: this.new_url_image
      }
    }

    console.log('data a guardar', dataagregarmovimiento);

    this.variosservicios.variasfunciones(dataagregarmovimiento).subscribe(async( res: any ) =>{
      console.log('respuesta de werathoncrearmovimiento', res);
      this.AgradecerConAlerta();
      this.dismissyactualiza();
      });


  }


  
}
