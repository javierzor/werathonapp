import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  iconohambuergesa: boolean = false;
  secretKey = "123456&Descryption";
  verificarloginemail: any;
  tipo_cuenta: any;
  estadodelmenu: Promise<boolean>;
  constructor(
    private menu: MenuController
  ) 
  
  {

  }
  
  ocultarhamburgesa(){
    this.iconohambuergesa=true;

  }

  mostraramburgesa(){
    this.iconohambuergesa=false;

  }

  CloseMenuFlechaBoton(){
    this.menu.close();
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

  funcionverificartipocuenta(){
    this.tipo_cuenta=localStorage.getItem('email');
    this.tipo_cuenta= this.decrypt(this.tipo_cuenta);
    console.log('this.verificarlogin', this.tipo_cuenta);
    if(this.tipo_cuenta)
     {
      console.log('Bienvenido:',this.tipo_cuenta);
    }
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }


  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  decrypt(textToDecrypt : string){
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }


}
