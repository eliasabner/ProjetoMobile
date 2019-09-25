import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';



@Component({
  selector: 'app-plugin',
  templateUrl: './plugin.page.html',
  styleUrls: ['./plugin.page.scss'],
})
export class PluginPage implements OnInit {
  base64Image: string [];
  localiza = {longitude:0,latitude:0};
  constructor(private camera: Camera, private geolocation:Geolocation) { }

  ngOnInit() {
   //this.localizacao()
  }
  
  tirarFoto(){
    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
        this.camera.getPicture(options).then((imageData) => 
        {
          // imageData is either a base64 encoded string or a file URI
          // If it's base64 (DATA_URL):
          this.base64Image.push("data:image/jpeg;base64," + imageData);
        }, (err) => 
        {
     // Handle error
    });
  }
  localizacao(){
    this.geolocation.getCurrentPosition().then((resp) => {
      //alert("Lat "+resp.coords.latitude);
      //alert("Lon "+resp.coords.longitude);
      // resp.coords.latitude
      // resp.coords.longitude
    this.localiza.latitude=resp.coords.latitude;
    this.localiza.longitude=resp.coords.longitude;

     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }


}
