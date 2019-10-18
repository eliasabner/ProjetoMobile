import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

import { FormBuilder } from '@angular/forms';

import { UsuarioService } from '../services/usuario/usuario.service';

import { Storage } from '@ionic/storage';

import { ToastController } from '@ionic/angular';

import { LoadingController } from '@ionic/angular';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  formularioLogin;
  loading: any = null;

  constructor(public loadingController: LoadingController, private toastController: ToastController, private navCtrl: NavController, private formBuilder: FormBuilder, private usuarioService: UsuarioService, private storage: Storage) { 
    this.formularioLogin = this.formBuilder.group({
      email: "",
      password: ""
    });
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Usuario não encontrado',
      duration: 10000,
      position: 'top',
      color: 'danger',
      
      
    });
    toast.present();
  }

  async login(dadosLogin: any) {
    await this.mostraCarregando();

    const formData = new FormData();
    formData.append("email", dadosLogin.email);
    formData.append("senha", dadosLogin.password);

    this.usuarioService.login(formData).subscribe((data: any) => {
      console.log(data);

      if (data.sucesso) {
        this.storage.set("usuario", data.usuario).then(() => {
          this.navCtrl.navigateRoot("/home");
        });
      } else {
        this.presentToast();

        this.ocultaCarregando();
      }
    }, error => {
      this.ocultaCarregando();

    });

    await this.ocultaCarregando();

    //alert("Click");
    //this.navCtrl.navigateForward("/tabs");
  }

  cadastrar() {
    this.navCtrl.navigateForward("/cadastrar-usuario");
  }   

  plugin(){
    this.navCtrl.navigateForward("/plugin");    
  }

  async mostraCarregando(){
      this.loading = await this.loadingController.create({
      message: 'Carregando',
      spinner:'bubbles'
      //duration: 3000
    });
    await this.loading.present();

    //const { role, data } = await this.loading.onDidDismiss();

    //console.log('Loading dismissed!');
  }

  async ocultaCarregando() {
    await this.loading.dismiss();
  }
}
