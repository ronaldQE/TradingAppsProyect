import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { serviceDataBase } from '../services/services-database';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.page.html',
  styleUrls: ['./home-page.page.scss'],
})
export class HomePagePage implements OnInit {
  idEstim:string = "";
  constructor(
    private router: Router,
    public db: serviceDataBase
  ) {}

  ngOnInit() {
    this.idEstim = this.getId();
    localStorage.setItem('title','Estimación');
    localStorage.setItem('idEstim','estimicion-1');


  }

  navigateTo(path: String) {
    localStorage.setItem('title','Estimación-nueva');
    localStorage.setItem('idEstim',this.idEstim);
    this.router.navigate([path]);
    //para navegacion
  }

  goCompanyInformation(){
    this.navigateTo('information');
  }

  goLastEstimate(){
    this.navigateTo('business-plan');
  }

  goHistorial(){
    this.navigateTo('estimate-history');
  }

  newEstimation(){
    console.log("holaaa");
  }

  getId(){
    return this.db.generateId();
  }
}
