import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { PaisesService } from '../service/paises.service';
import { VariosService } from '../service/varios.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-misgananciasdeafiliado',
  templateUrl: './misgananciasdeafiliado.page.html',
  styleUrls: ['./misgananciasdeafiliado.page.scss'],
})
export class MisgananciasdeafiliadoPage implements OnInit {
  verificarloginemail: any;
  informacion_perfil: any;
  menuderechosuperior:boolean=false;
  secretKey = "123456&Descryption";
  gananciasdeafiliado: any;

  constructor(
    private variosservicios: VariosService,
    private router: Router,
    private menu: MenuController,
      private paises: PaisesService,

  ) 

  {
    this.ObtenerProfileInfo();
    this.obtenergananciasdeafiliado();

  }

ionViewWillEnter(){
  this.menu.enable(true);
  this.ObtenerProfileInfo();
    this.obtenergananciasdeafiliado();

}
async ngOnInit() {
  this.funcionverificarlogin();
  this.ObtenerProfileInfo();
  this.obtenergananciasdeafiliado();

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

logout(){
  localStorage.clear();
  this.router.navigate(['login']);
}

encrypt(value : string) : string{
  return CryptoJS.AES.encrypt(value, this.secretKey.trim()).toString();
}

decrypt(textToDecrypt : string){
  return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
}

//Termina menu superior y sus ONCHANGE

// empieza ganancias de afiliado

obtenergananciasdeafiliado(){
  this.informacion_perfil=localStorage.getItem('profileInfo');
  this.informacion_perfil=this.decrypt(this.informacion_perfil);
  this.informacion_perfil=JSON.parse(this.informacion_perfil);
  var datawerathonobtenergananciasdeafiliado = {
    nombre_solicitud: 'werathonobtenergananciasdeafiliado',
    id_referidor: this.informacion_perfil.id_publico
  }
   this.variosservicios.variasfunciones(datawerathonobtenergananciasdeafiliado).subscribe(async( res: any ) =>{
     console.log('respuesta de werathonobtenergananciasdeafiliado', res);
     this.gananciasdeafiliado=res;
   });

  }

}