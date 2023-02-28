import { Component, OnInit } from '@angular/core';
import { RestApi } from 'src/provider/RestApi';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  email:any;
  password:any;
  constructor(
    private api:RestApi,
    private storage: Storage,
    private router : Router,
    private toast : ToastController,
    private alert : AlertController
    ) { }

  ngOnInit() {
  }

  cekLogin(){
    let body ={
      email:this.email,
      password:this.password
    }
    this.api.post(body,'login').subscribe((res:any)=>{
      if(res){
        this.notif('Login Succes')
        this.storage.set('token',res.token);
        console.log(this.storage);
        
        this.router.navigate(['/home']);
      }else{
        this.notif('Login Gagal')
      }  
    })
  }

  

  isModalOpen = false;
  daftarMember(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  simpan(isOpen: boolean) {
    let body = {
      email : this.email,
      password:this.password
    }
    this.api.post(body,'register').subscribe((res:any)=>{
      if(res.error!=""){
        this.popup('Login Succes')
        this.isModalOpen = false;
      }else{
        this.notif('Login Gagal')
      }  
    })
    
  }

  async notif(pesan:any){
    const toast = await this.toast.create({
      message: pesan,
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();
  }

  async popup(pesan:any){
    const alert = await this.alert.create({
      header: 'Infp',
      subHeader: 'Deskripsi',
      message: pesan,
      buttons: ['OK'],
    });

    await alert.present();
  }

}
