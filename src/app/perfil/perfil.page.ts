import { Component } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {Router} from '@angular/router';
import { MenuController } from '@ionic/angular';
import { VariosService } from '../service/varios.service';
import { ImageService } from '../service/image.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Image } from './../models/image.model';
import { PaisesService } from '../service/paises.service';

declare var google;

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {
  secretKey = "123456&Descryption";
  verificarloginemail: any;
  menuderechosuperior:boolean=false;
  imageProfile: any = null;
  public registerUserForm: FormGroup;
  formErrors = {
    'name': '',
    'lastName': '',
    'phone': '',
    'genderId': '',
    'countryId': '', 
    'address': '', 
    'birthDate': '',
    'lenguages1': '',
    'description': ''
  };
  tieneperfil: any;
  generos: any;
  // paises: any;
  crear_nombre: any;
  crear_apellido: any;
  crear_sexo: any;
  crear_pais: any;
  crear_nacimiento: any;
  uid: string;
  crear_id_imagen: any;
  logincon: any;
  loginvalor: any;
  inputparaescribirnumero: any;
  crear_celular: any;
  infoperfiltoview: any;
  languages: any;
  countryData: { id: number; name: string; }[];


  constructor(
    private variosservicios: VariosService,
    private router: Router,
    private menu: MenuController,
    private imageService: ImageService,
      private builder: FormBuilder,
      private paises: PaisesService,

  ) 
  {
    this.countryData=this.paises.countryData;    
    this.funcionverificarlogin();
    // this.conrealtime();

    this.registerUserForm = this.builder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      genderId: ['', [Validators.required]],
      countryId: ['', [Validators.required]],
      description: ['']
    });

  }

  ionViewWillEnter(){
    this.menu.enable(true);
  }

  async ngOnInit() {
    this.funcionverificarlogin();
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
    let image = new Image();
    image.urlImage = x.data.url;

    this.imageService.create(image.urlImage).subscribe(i => {
      let idImage = i.value;
      console.log(idImage);
      this.registerUserForm.patchValue({imageId: idImage});
    }, error => {
      // this.util.presentToast(error.error.value);
    }); 
  }, error => {
    // this.util.presentToast(error.error.value);
  }); 
}

actualziarperfil(){
  console.log('actualziar perfil',this.registerUserForm.value);
}


}