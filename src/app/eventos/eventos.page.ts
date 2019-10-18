import { Component, OnInit } from '@angular/core';
import { EventoService } from '../services/evento/evento.service';

import { LoadingController } from '@ionic/angular';



@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {

  dados=[];
  loading: any = null;

  constructor(public loadingController: LoadingController,private eventoService:EventoService) { }

  async ngOnInit() {
    await this.mostraCarregando();

    this.eventoService.eventos().subscribe((dados: any)=>{
      this.dados = dados;
      this.ocultaCarregando();
    },error => {
      this.ocultaCarregando();

    });


  }

  async mostraCarregando(){
    this.loading = await this.loadingController.create({
    message: 'Carregando',
    spinner:'bubbles'
    //duration: 3000
  });
    await this.loading.present();

}

    async ocultaCarregando() {
    await this.loading.dismiss();
  }


}
