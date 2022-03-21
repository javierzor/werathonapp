import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {Router} from '@angular/router';
import { MenuController } from '@ionic/angular';
import { VariosService } from '../service/varios.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  secretKey = "123456&Descryption";
  verificarloginemail: any;
  menuderechosuperior:boolean=false;
  bitcoinlogo = "/assets/criptologos/Bitcoin.svg";
  bitcoinactual: number;
  bitcoinanterior: number;
  bitcoinaumento: number = 0;
  bitcoinreduccion: number = 0;
  bitcoinporcentajedeincremento: number;
  bitcoinporcentajededisminucion: number;
  trxlogo = "/assets/criptologos/trx.svg";
  trxactual: number;
  trxanterior: number;
  trxaumento: number = 0;
  trxreduccion: number = 0;
  trxporcentajedeincremento: number;
  trxporcentajededisminucion: number;
  dotlogo = "/assets/criptologos/dot.svg";
  dotactual: number;
  dotanterior: number;
  dotaumento: number = 0;
  dotreduccion: number = 0;
  dotporcentajedeincremento: number;
  dotporcentajededisminucion: number;
  adalogo = "/assets/criptologos/ada.svg";
  adaactual: number;
  adaanterior: number;
  adaaumento: number = 0;
  adareduccion: number = 0;
  adaporcentajedeincremento: number;
  adaporcentajededisminucion: number;

  constructor(
    private variosservicios: VariosService,
    private router: Router,
    private menu: MenuController,

  ) 
  {
    this.funcionverificarlogin();
    this.reverificarpreciosde4criptos();
    // this.conrealtime();
  }

  ionViewWillEnter(){
    this.menu.enable(true);
    this.reverificarpreciosde4criptos();
  }

  async ngOnInit() {
    this.funcionverificarlogin();
    this.reverificarpreciosde4criptos();
 }

 //EMPIEZA los menu superior y sus ONCHANGE

  funcionverificarlogin(){
    this.verificarloginemail=localStorage.getItem('email');
    this.verificarloginemail= this.decrypt(this.verificarloginemail);
    console.log('this.verificarlogin', this.verificarloginemail);
    if(this.verificarloginemail!=null||this.verificarloginemail!='false')
     {
      console.log('Bienvenido:',this.verificarloginemail);
    }
  }

  ONCHANGEmenuderechosuperior(){
    if(this.menuderechosuperior==false){
      this.menuderechosuperior=true;
    }
    else{
      this.menuderechosuperior=false;
    }
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

reverificarpreciosde4criptos(){
  // sin realtime
  this.verificarbitcoin();
  this.verificartrx();
  this.verificardot();
  this.verificarada();
}   

conrealtime(){
  setTimeout(() => 
  {
    this.verificarbitcoin();
    this.verificartrx();
    this.verificardot();
    this.verificarada();
    //de nuevo
    this.conrealtime();
  },
  10000);
}

verificarbitcoin(){
  var precioscryptobitcoin = {
    fsym:'BTC', tsym:'USD', limit:'2',
    api_key: 'ee1d5581294daeb7bb810c123850da6843eb3d02cf9733c2a0473e8dd35d79c4'
  }    
  this.variosservicios.precioscrypto(precioscryptobitcoin).subscribe(async( res: any ) =>{
    console.log('respuesta de precioscryptobitcoin',res.Data.Data);
    this.bitcoinactual=parseFloat(res.Data.Data[2].close);
    this.bitcoinanterior=parseFloat(res.Data.Data[0].close);
    console.log('anterior',this.bitcoinanterior);
    console.log('actual',this.bitcoinactual);
    if(this.bitcoinactual>this.bitcoinanterior){
      this.bitcoinaumento=this.bitcoinactual-this.bitcoinanterior;
      console.log('aumento',this.bitcoinaumento);
      this.bitcoinporcentajedeincremento=((this.bitcoinactual-this.bitcoinanterior) / (this.bitcoinanterior) ) * (100);
    }
    else{
      this.bitcoinreduccion=this.bitcoinanterior - this.bitcoinactual;
      console.log('disminucion',this.bitcoinreduccion);
      this.bitcoinporcentajededisminucion=((this.bitcoinanterior-this.bitcoinactual) / (this.bitcoinanterior) ) * (100);
    }
  });
}
verificartrx(){
  var precioscryptotrx = {
    fsym:'TRX', tsym:'USD', limit:'2',
    api_key: 'ee1d5581294daeb7bb810c123850da6843eb3d02cf9733c2a0473e8dd35d79c4'
  }    
  this.variosservicios.precioscrypto(precioscryptotrx).subscribe(async( res: any ) =>{
    console.log('respuesta de precioscryptotrx',res.Data.Data);
    this.trxactual=parseFloat(res.Data.Data[2].close);
    this.trxanterior=parseFloat(res.Data.Data[0].close);
    console.log('anterior',this.trxanterior);
    console.log('actual',this.trxactual);
    if(this.trxactual>this.trxanterior){
      this.trxaumento=this.trxactual-this.trxanterior;
      console.log('aumento',this.trxaumento);
      this.trxporcentajedeincremento=((this.trxactual-this.trxanterior) / (this.trxanterior) ) * (100);
      console.log('porcentaje de incremento',this.trxporcentajedeincremento);
    }
    else{
      this.trxreduccion=this.trxanterior - this.trxactual;
      console.log('disminucion',this.trxreduccion);
      this.trxporcentajededisminucion=((this.trxanterior-this.trxactual) / (this.trxanterior) ) * (100);
    }
  });
}

verificardot(){
  var precioscryptodot = {
    fsym:'DOT', tsym:'USD', limit:'2',
    api_key: 'ee1d5581294daeb7bb810c123850da6843eb3d02cf9733c2a0473e8dd35d79c4'
  }    
  this.variosservicios.precioscrypto(precioscryptodot).subscribe(async( res: any ) =>{
    console.log('respuesta de precioscryptodot',res.Data.Data);
    this.dotactual=parseFloat(res.Data.Data[2].close);
    this.dotanterior=parseFloat(res.Data.Data[0].close);
    console.log('anterior',this.dotanterior);
    console.log('actual',this.dotactual);
    if(this.dotactual>this.dotanterior){
      this.dotaumento=this.dotactual-this.dotanterior;
      console.log('aumento',this.dotaumento);
      this.dotporcentajedeincremento=((this.dotactual-this.dotanterior) / (this.dotanterior) ) * (100);
      console.log('porcentaje de incremento',this.dotporcentajedeincremento);
    }
    else{
      this.dotreduccion=this.dotanterior - this.dotactual;
      console.log('disminucion',this.dotreduccion);
      this.dotporcentajededisminucion=((this.dotanterior-this.dotactual) / (this.dotanterior) ) * (100);
    }
  });
}

verificarada(){
  var precioscryptoada = {
    fsym:'ADA', tsym:'USD', limit:'2',
    api_key: 'ee1d5581294daeb7bb810c123850da6843eb3d02cf9733c2a0473e8dd35d79c4'
  }    
  this.variosservicios.precioscrypto(precioscryptoada).subscribe(async( res: any ) =>{
    console.log('respuesta de precioscryptoada',res.Data.Data);
    this.adaactual=parseFloat(res.Data.Data[2].close);
    this.adaanterior=parseFloat(res.Data.Data[0].close);
    console.log('anterior',this.adaanterior);
    console.log('actual',this.adaactual);
    if(this.adaactual>this.adaanterior){
      this.adaaumento=this.adaactual-this.adaanterior;
      console.log('aumento',this.adaaumento);
      this.adaporcentajedeincremento=((this.adaactual-this.adaanterior) / (this.adaanterior) ) * (100);
      console.log('porcentaje de incremento',this.adaporcentajedeincremento);
    }
    else{
      this.adareduccion=this.adaanterior - this.adaactual;
      console.log('disminucion',this.adareduccion);
      this.adaporcentajededisminucion=((this.adaanterior-this.adaactual) / (this.adaanterior) ) * (100);
    }
  });
}



}
