import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from "@ionic/angular";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VariosService {

  isLoading = false;
  tipo_cuenta:any;
  activar_real_time_soporte:boolean=false;
  activar_real_time_home:boolean=false;
  activar_real_time_admin_listas_de_chat:boolean=false;
  activar_real_time_admin_ver_chat:boolean=false;


  constructor(
    public toastController: ToastController,
    private loadingController: LoadingController,
    private http: HttpClient
  ) 
  {

  }

  variasfunciones(data: any)
  {
  var url = 'https://app.werathon.com/laravel/public/api/variasfunciones';
  return this.http.post(url,data,
  {headers:new HttpHeaders({"Content-Type":'application/json'})});
  }

  
  
  precioscrypto(data){
    var url = 'https://min-api.cryptocompare.com/data/v2/histominute';
    return this.http.post(url,data,
    {headers:new HttpHeaders({"Content-Type":'application/json'})});

    
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  async loading2segundos(mensaje) {
    const actualizando = await this.loadingController.create({
      message: mensaje,
      duration: 1500,
      spinner: "lines",
      cssClass:'custom-loader-class'
      });
      actualizando.present();
    
  }

  async loading1segundos(mensaje) {
    const loadingunsegundo = await this.loadingController.create({message: mensaje,duration: 1000,spinner: "lines",
      cssClass:'custom-loader-class'
      });
      loadingunsegundo.present();
    
  }

  async quitarloading(){
    this.isLoading = false;
    return await this.loadingController.dismiss();
  }

  async loading18segundos(mensaje) {
    this.isLoading = true;
    return await this.loadingController
      .create({
        duration: 18000,
        spinner: "lines",
        message: mensaje,
        cssClass:'custom-loader-class'
      })
      .then(a => {
        a.present().then(() => {
          if (!this.isLoading) {
            a.dismiss().then(() => {});
          }
        });
      });
  }
  


}
