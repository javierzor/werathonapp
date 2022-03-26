import { Component, OnInit } from '@angular/core';
import { ToastController, LoadingController } from "@ionic/angular";

@Component({
  selector: 'app-preguntas',
  templateUrl: './preguntas.page.html',
  styleUrls: ['./preguntas.page.scss'],
})
export class PreguntasPage implements OnInit {
  step: any;
  segmentModel: any;

  constructor(
    private loadingController: LoadingController,
  ) { }

  ngOnInit() {
  }

  async segmentChanged(event){

      this.step='1';
      const actualizando = await this.loadingController.create({
      message: 'Actualizando...',spinner: 'bubbles',duration: 15000,
      });
      console.log(this.segmentModel);
      actualizando.dismiss();

  }

    



}
