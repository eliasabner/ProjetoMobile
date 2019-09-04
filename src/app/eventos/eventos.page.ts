import { Component, OnInit } from '@angular/core';
import { EventoService } from '../services/evento/evento.service';



@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.page.html',
  styleUrls: ['./eventos.page.scss'],
})
export class EventosPage implements OnInit {

  dados=[
    {nome:"Git",descricao:"Git Hub no mercado"},
    {nome:"Git",descricao:"Git Hub no mercado 2"},
    {nome:"Git",descricao:"Git Hub no mercado 3"}
  ];

  constructor(private eventoService:EventoService) { }

  ngOnInit() {
    this.eventoService.eventos().subscribe((dados: any)=>{
      this.dados = dados;
    });
  }

}
