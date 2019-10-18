import { Component } from '@angular/core';

import { NavController } from '@ionic/angular';

import { FormBuilder } from '@angular/forms';

import { UsuarioService } from '../services/usuario/usuario.service';

import { LoadingController } from '@ionic/angular';

import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-cadastrar-usuario',
  templateUrl: './cadastrar-usuario.page.html',
  styleUrls: ['./cadastrar-usuario.page.scss'],
})
export class CadastrarUsuarioPage {

  formularioCadastrar: any;
  loading: any = null;


  constructor(private toastController: ToastController, public loadingController: LoadingController,private navCtrl: NavController, private formBuilder: FormBuilder, private usuarioService: UsuarioService) { 
    this.formularioCadastrar = this.formBuilder.group({
      email: "",
      senha: "",
      nome: ""
    });
  }
 
   

  async cadastrar(dadosCadastro: any) {
    await this.mostraCarregando();
    const formData = new FormData();
    formData.append("email", dadosCadastro.email);
    formData.append("senha", dadosCadastro.senha);
    formData.append("nome", dadosCadastro.nome);

    this.usuarioService.cadastrar(formData).subscribe((dados: any) => {
      console.log(dados);

      if (dados.sucesso) {
        //this.navCtrl.navigateForward("/");

        this.ocultaCarregando();
        
        this.navCtrl.navigateRoot("/");
      } else {
        alert("Erro ao cadastrar o usuário!");
        

        this.ocultaCarregando();
      }
    },error => {
      this.ocultaCarregando();

    });
  
  }
 
  async mostraCarregando(){
    this.loading = await this.loadingController.create({
    message: 'Cadastrando',
    spinner:'bubbles'
    //duration: 3000
  });
    await this.loading.present();

}

    async ocultaCarregando() {
    await this.loading.dismiss();
  }

}
