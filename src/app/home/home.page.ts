import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NavController } from '@ionic/angular';
import { RestApi } from 'src/provider/RestApi';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private db:RestApi,
    private nav: NavController,
    private router: Router,
    private storage : Storage,
    private route: ActivatedRoute) {}
  user:any=[];
  name:any;
  job:any;
  
 ionViewWillEnter(){
    this.tampil()
 }

  tampil(){
    this.db.get('users').subscribe((res:any)=>{
        console.log(res.data);
        for (let user of res.data) {
          this.user.push(user);
        }
        
    });
    
   }

   tambah(){
    let body = {
      name: this.name,
      job: this.job
    }
    this.db.post(body,'users').subscribe((data)=>{
      console.log(data);
      
    });
   }

   isModalOpen = false;

   edit(isOpen: boolean,id:any) {
     
     let params: any = {
          id: id
         }
    this.nav.navigateForward('/home', { state: params });
    this.isModalOpen = isOpen;
   }

   tutup(isOpen: boolean) {
    this.isModalOpen = false;
  }

  update(){
    this.route.queryParams.subscribe((params) => {  
      // let navParams = this.nav.getCurrentNavigation().extras.state;
      // console.log(navParams);
    });
  }

  logout(){
    this.storage.clear();
    this.router.navigate(['/login']);
  }

}
