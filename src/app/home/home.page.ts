import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private actRouter: ActivatedRoute) {}
  
    users:any=[];
    userEdit:any="";
    id: any = "";
    email: any ;
    first_name: any ;
    last_name:any;
    avatar: any ;
    name: any = "";
    job: any = "";
    
  
    ngOnInit() {
      this.actRouter.params.subscribe((data: any) => {
        this.id = data.id;
        this.email = data.email;
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.avatar = data.avatar;
      });
    }
  
 ionViewWillEnter(){
    this.tampil()
 }

  tampil(){
    this.db.get('users').subscribe((res:any)=>{
        console.log(res.data);
        for (let user of res.data) {
          this.users.push(user);
        }    
    }); 
   }

   tambah(){
    let body = {
      name: this.name,
      job: this.job
    }
    this.db.post(body,'users').subscribe((res:any)=>{
      this.users = res.data; 
    });
   }

   isModalOpen = false;

   openForm(id:any) {
    console.log('idnya adalah : '+id);
    if(id==null){
      this.isModalOpen = true;
    }else{
      this.isModalOpen = true;
      this.db.get('users/'+id).subscribe((res:any)=>{
      this.userEdit=res.data;
      console.log(this.userEdit);
    });
    }
    
   }

   tutup(isOpen: boolean) {
    this.isModalOpen = false;
  }

  update(){
    
  }

  logout(){
    this.storage.clear();
    this.router.navigate(['/login']);
  }

}
