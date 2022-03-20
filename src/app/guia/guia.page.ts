import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {Router} from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-guia',
  templateUrl: './guia.page.html',
  styleUrls: ['./guia.page.scss'],
})
export class GuiaPage implements OnInit {

  constructor(
    private router: Router,
    private menu: MenuController,

  ) 
  {
  }

  ionViewWillEnter(){
    this.menu.enable(true);
  }


    async ngOnInit() {
  }


}
