import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { VariosService } from '../service/varios.service';
import { PaisesService } from '../service/paises.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  secretKey = "123456&Descryption";
  email:any;
  quesera:any;
  step: any;
  loginuser: any;
  loginpassword:any;
  registercorreo: any;
  registropassword: any;
  isLoggedIn: boolean;
  usuario:any;
  registropasswordrepetida:any;
  countrySelected:any;
  countryData: any;
  nombre: any;
  apellido: any;

  constructor(
    private router: Router,
    private variosservicios: VariosService,
    private paises: PaisesService,

  ) 
  
  {
    console.log('Bienvenido');
    this.step='login';      
    // this.email='javier20450@gmail.com';
    // console.log('email original', this.email);
    // this.email= this.encrypt(this.email);
    // console.log('email encriptado',this.email);
    // this.email= this.decrypt(this.email);
    // console.log('email desencriptado', this.email);
    // this.variosservicios.loading2segundos("Porfavor Espere");
    // this.variosservicios.presentToast("..::En desarrollo::..");
    // this.variosservicios.loading18segundos("Verificando Información...");
    // this.variosservicios.quitarloading();
    
     this.countryData=this.paises.countryData    

  }

    gotohome(){
    this.router.navigate([`tabs/home`]);
  }

  // goBack(){
  //   this.location.back();
  // }

  ngOnInit() {

  }

  iraregistrarse(){
    this.variosservicios.loading2segundos("Porfavor Espere");
    this.step="registro";
  }


 async logear(){

      var dataoptimaconsultaruser = {
        nombre_solicitud:'optimaconsultaruser',
        username: this.loginuser,
        password: this.loginpassword
      }
    this.variosservicios.loading18segundos("Verificando...");

    console.log('el usuario intenta logear con esta data,',dataoptimaconsultaruser);

          this.variosservicios.variasfunciones(dataoptimaconsultaruser).subscribe(async( res: any ) =>{
            console.log(' respuesta optimaconsultaruser ',res);
            if(res!='credencialesincorrectas'){
              // this.json.isloggedin='si';
              // this.json.username=res.username;
              // this.json.tipo_cuenta=res.tipo_cuenta;
              this.variosservicios.loading2segundos("Verificacíon exitosa...");
              this.variosservicios.quitarloading();
              // this.menu.enable(true);
              // this.router.navigateByUrl('/app/tabs/schedule');
            }
            else{
              this.variosservicios.quitarloading();
              this.variosservicios.loading2segundos("Verifique sus credenciales.");
            }
            

      });

    }



    

    registrarsecorreo(){
    var data = {

    }
    console.log('el usuario intenta registrarse con esta data,',data);
    }
  

  encrypt(value : string) : string{
    return CryptoJS.AES.encrypt(value, this.secretKey.trim()).toString();
  }

  decrypt(textToDecrypt : string){
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(CryptoJS.enc.Utf8);
  }

  iralogin(){
    this.variosservicios.loading2segundos("Porfavor Espere");
    this.step="login";

  }


}
