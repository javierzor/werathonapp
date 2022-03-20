import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { VariosService } from '../service/varios.service';
import { PaisesService } from '../service/paises.service';
import {Router} from '@angular/router';
import { MenuController } from '@ionic/angular';

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
  usuarioderegistro:any;
  registropasswordrepetida:any;
  countrySelected:any;
  countryData: any;
  nombre: any;
  apellido: any;
  aceptaterminos: boolean = false;
  paisdataseleccionado: any;
  colocouncorreoperonoelpunto:any;
  registrandoseconarrobaenelusuario: boolean = false;
  constructor(
    private router: Router,
    private variosservicios: VariosService,
    private paises: PaisesService,
    private menu: MenuController

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
    
     this.countryData=this.paises.countryData;    

  }

  ionViewWillEnter(){
    this.menu.enable(false);
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

  CHANGEusuarioderegistro(){
      if(this.usuarioderegistro.includes('@')==true){
          this.registrandoseconarrobaenelusuario=true;
      }
      else{
        this.registrandoseconarrobaenelusuario=false;

      }
  }

  CHANGEusuarioocorreo(){
    // console.log('contiene arrobas, true y false: ',this.loginuser.includes('@'));
    if(this.loginuser.includes('@')==true){
      this.colocouncorreoperonoelpunto=true;
          if(this.loginuser.includes('.')==true){
            this.colocouncorreoperonoelpunto=false;
          }
    }
    else{
      this.colocouncorreoperonoelpunto=false;
    }
  }

 async logear(){

   console.log('contiene arrobas, true y false: ',this.loginuser.includes('@'));
   if(this.loginuser.includes('@')==true){
      console.log('contiene arrobas la cadena de texto para logear');
      this.colocouncorreoperonoelpunto=true;
          if(this.loginuser.includes('.')==true){
            this.colocouncorreoperonoelpunto=false;
            console.log('Aparte de arrobas tambien tiene su PUNTO (.)');
            this.variosservicios.loading2segundos("El inicio de sección por correo electronico esta desabilitada");
            this.variosservicios.presentToast("..::Porfavor ingrese su nombre de usuario::..");
          }
          else{
            this.colocouncorreoperonoelpunto=false;
            this.variosservicios.presentToast("..::Ingrese un correo valido.::..");
          }

   }

   else {
      this.colocouncorreoperonoelpunto=false;
      console.log('Cadena de texto SIN ARROBAS!.');
      var dataoptimaconsultaruser = {
        nombre_solicitud:'werathonappinicio',
        username: this.loginuser,
        password: this.loginpassword
      }
      this.variosservicios.loading18segundos("Verificando...");
      console.log('el usuario intenta logear con esta data,',dataoptimaconsultaruser);
            this.variosservicios.variasfunciones(dataoptimaconsultaruser).subscribe(async( res: any ) =>{
              console.log(' respuesta optimaconsultaruser ',res);
              if(res!='credencialesincorrectas'&&res!=null){
                this.variosservicios.loading2segundos("Verificacíon exitosa...");
                this.variosservicios.quitarloading();
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('tipo_cuenta', this.encrypt(res.tipo_cuenta));
                localStorage.setItem('email', this.encrypt(res.email));
                localStorage.setItem('username', this.encrypt(res.username));
                this.router.navigate(['home']);
                // this.menu.enable(true);
              }
              else{
                this.variosservicios.quitarloading();
                this.variosservicios.loading2segundos("Verifique sus credenciales.");
              }

        });

   }



    }


    ONCHANGEPAIS(event){
      console.log('index', event.target.value);
      this.paisdataseleccionado= this.countryData[event.target.value];
      console.log('paisData',this.paisdataseleccionado);
    }
    

  async  registrarsecorreo(){
      var datawerathoncreateuser = {
        create_date: new Date(),
        nombre_solicitud:'werathoncreateuser',
        username:this.usuarioderegistro,
        password:this.registropassword,
        tipo_cuenta:'0',
        email:this.registercorreo,
        name:this.nombre,
        lastname:this.apellido,
        paisnombre:this.paisdataseleccionado.name,
        paisID:this.paisdataseleccionado.id
      }
    console.log('el usuario intenta registrarse con esta data,',datawerathoncreateuser);
    this.variosservicios.loading18segundos("Espere, Se esta registrando su cuenta de usuario...");
    this.variosservicios.variasfunciones(datawerathoncreateuser).subscribe(async (res: any ) =>{
      console.log(' respuesta werathoncreateuser ',res);
      if(res.id>0){
        this.variosservicios.quitarloading();
        this.variosservicios.loading2segundos("Registro exitoso, Regirigiendo...");
        this.variosservicios.presentToast("..::Usuario Registrado correctamente::..");
        this.router.navigate(['home']);
      }
     },
     error=>{
      console.log('Errores',error);
      if(error){
        this.variosservicios.quitarloading();
        this.variosservicios.loading2segundos("El usuario o su correo ya fue registrado intente con otro.");
        this.variosservicios.presentToast("..::intente con otro Usuario/Correo::..");

      }
     }
     );
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

  cambioterminos(){
    console.log('terminos esta:,',this.aceptaterminos);
  }

}
